require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/routine', (req, res, next) => {
  const sql = `
  select "e"."name" as "exercise",
         "e"."description",
         "exerciseId",
         "b"."name" as "bodyPart"
  from "exercise" as "e"
  join "exerciseBodyPart" using ("exerciseId")
  join "bodyPart" as "b" using ("bodyPartId")
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/routine/day/:dayId', (req, res, next) => {
  const dayId = req.params.dayId;
  const sql = `
  select "d"."name" as "day",
         "c"."name" as "exercise",
         "c"."description",
         "c"."customExerciseId"
  from "day" as "d"
  join "dayExercise" using ("dayId")
  join "customExercise" as "c" using ("customExerciseId")
  where "dayId" = $1
  `;
  const params = [dayId];
  db.query(sql, params)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/routine/exercise/:customExerciseId', (req, res, next) => {
  const customExerciseId = parseInt(req.params.customExerciseId, 10);
  if (!Number.isInteger(customExerciseId) || customExerciseId <= 0) {
    return res.status(400).json({
      error: 'customExerciseId must be a positive integer'
    });
  }
  const sql = `
  select *
  from "customExercise"
  where "customExerciseId" = $1
  `;
  const params = [customExerciseId];
  db.query(sql, params)
    .then(result => {
      const exercise = result.rows[0];
      if (exercise) {
        res.json(exercise);
      } else {
        res.status(500).json({
          error: `Can't find exercise with customExerciseId ${customExerciseId}`
        });
      }
    })
    .catch(err => next(err));
});

app.post('/api/routine', (req, res, next) => {
  const name = req.body.name;
  const desc = req.body.desc;
  const dayId = parseInt(req.body.dayId, 10);
  if (!Number.isInteger(dayId) || dayId <= 0) {
    return res.status(400).json({
      error: 'dayId must be a positive integer'
    });
  }
  if (name && desc && dayId) {
    const sql = `
  insert into "customExercise" ("name", "description")
  values ($1, $2)
  returning "customExerciseId"
  `;
    const params = [name, desc];
    db.query(sql, params)
      .then(result1 => {
        const customExerciseId = result1.rows[0].customExerciseId;
        const sql2 = `
        insert into "dayExercise" ("dayId", "customExerciseId")
        values ($1, $2)
        returning *
        `;
        const params2 = [dayId, customExerciseId];
        return db.query(sql2, params2)
          .then(result2 => {
            res.json(result2.rows[0]);
          });
      })
      .catch(err => next(err));
  } else if (!name) {
    res.status(400).json({ error: 'need a name' });
  } else if (!desc) {
    res.status(400).json({
      error: 'need a description'
    });
  }
});

app.delete('/api/routine', (req, res, next) => {
  const customExerciseId = parseInt(req.body.customExerciseId, 10);
  const dayId = parseInt(req.body.dayId, 10);
  if (!Number.isInteger(customExerciseId) || customExerciseId <= 0) {
    return res.status(400).json({
      error: 'customExerciseId must be a positive integer'
    });
  }
  if (!Number.isInteger(dayId) || dayId <= 0) {
    return res.status(400).json({
      error: 'dayId must be a positive integer'
    });
  }
  const sql = `
  delete from "customExercise"
  where "customExerciseId" = $1
  returning *
  `;
  const params = [customExerciseId];
  db.query(sql, params)
    .then(result => {
      const exercise = result.rows[0];
      if (!exercise) {
        res.status(404).json({
          error: `Can't find exercise with customExerciseId ${customExerciseId}`
        });
      } else {
        const sql2 = `
        delete from "dayExercise"
        where "dayId" = $1 and "customExerciseId" = $2
        returning *
        `;
        const params2 = [dayId, customExerciseId];
        return db.query(sql2, params2)
          .then(result2 => {
            res.status(202).json(result2.rows[0]);
          });
      }
    })
    .catch(err => next(err));
});

app.get('/api/routine/calories', (req, res, next) => {
  const sql = `
  select *
  from "routine"
  `;
  db.query(sql)
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.put('/api/routine/calories', (req, res, next) => {
  const calories = parseInt(req.body.calories);
  if (!Number.isInteger(calories) || calories <= 0) {
    return res.status(400).json({
      error: 'calories must be a positive integer'
    });
  }
  const sql = `
  update "routine"
  set "recommendedCalories" = $1
  returning *
  `;
  const params = [calories];
  db.query(sql, params)
    .then(result => {
      const routine = result.rows[0];
      res.json(routine);
    });
});

app.put('/api/routine/:customExerciseId', (req, res, next) => {
  const customExerciseId = parseInt(req.params.customExerciseId);
  const name = req.body.name;
  const desc = req.body.desc;
  if (!Number.isInteger(customExerciseId) || customExerciseId <= 0) {
    return res.status(400).json({
      error: 'customExerciseId must be a positive integer'
    });
  }
  if (name && desc && customExerciseId) {
    const sql = `
  update "customExercise"
  set "name" = $1,
      "description" = $2
  where "customExerciseId" = $3
  returning *
  `;
    const params = [name, desc, customExerciseId];
    db.query(sql, params)
      .then(result => {
        res.json(result.rows[0]);
      })
      .catch(err => next(err));
  } else {
    res.status(500).json({
      error: 'invalid input'
    });
  }
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({
      error: err.message
    });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
