--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public."user" DROP CONSTRAINT IF EXISTS user_pkey;
ALTER TABLE IF EXISTS ONLY public.routine DROP CONSTRAINT IF EXISTS routine_pkey;
ALTER TABLE IF EXISTS ONLY public.exercise DROP CONSTRAINT IF EXISTS exercise_pkey;
ALTER TABLE IF EXISTS ONLY public.day DROP CONSTRAINT IF EXISTS day_pkey;
ALTER TABLE IF EXISTS ONLY public."customExercise" DROP CONSTRAINT IF EXISTS "customExercise_pkey";
ALTER TABLE IF EXISTS ONLY public."bodyPart" DROP CONSTRAINT IF EXISTS "bodyPart_pkey";
ALTER TABLE IF EXISTS public."user" ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.routine ALTER COLUMN "routineId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.exercise ALTER COLUMN "exerciseId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.day ALTER COLUMN "dayId" DROP DEFAULT;
ALTER TABLE IF EXISTS public."customExercise" ALTER COLUMN "customExerciseId" DROP DEFAULT;
ALTER TABLE IF EXISTS public."bodyPart" ALTER COLUMN "bodyPartId" DROP DEFAULT;
DROP SEQUENCE IF EXISTS public."user_userId_seq";
DROP TABLE IF EXISTS public."user";
DROP SEQUENCE IF EXISTS public."routine_routineId_seq";
DROP TABLE IF EXISTS public.routine;
DROP SEQUENCE IF EXISTS public."exercise_exerciseId_seq";
DROP TABLE IF EXISTS public."exerciseBodyPart";
DROP TABLE IF EXISTS public.exercise;
DROP SEQUENCE IF EXISTS public."day_dayId_seq";
DROP TABLE IF EXISTS public."dayExercise";
DROP TABLE IF EXISTS public.day;
DROP SEQUENCE IF EXISTS public."customExercise_customExerciseId_seq";
DROP TABLE IF EXISTS public."customExercise";
DROP SEQUENCE IF EXISTS public."bodyPart_bodyPartId_seq";
DROP TABLE IF EXISTS public."bodyPart";
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: bodyPart; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."bodyPart" (
    "bodyPartId" integer NOT NULL,
    name text NOT NULL
);


--
-- Name: bodyPart_bodyPartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."bodyPart_bodyPartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bodyPart_bodyPartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."bodyPart_bodyPartId_seq" OWNED BY public."bodyPart"."bodyPartId";


--
-- Name: customExercise; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."customExercise" (
    "customExerciseId" integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL
);


--
-- Name: customExercise_customExerciseId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."customExercise_customExerciseId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: customExercise_customExerciseId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."customExercise_customExerciseId_seq" OWNED BY public."customExercise"."customExerciseId";


--
-- Name: day; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.day (
    "dayId" integer NOT NULL,
    name text NOT NULL,
    "routineId" integer NOT NULL
);


--
-- Name: dayExercise; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."dayExercise" (
    "dayId" integer NOT NULL,
    "customExerciseId" integer NOT NULL
);


--
-- Name: day_dayId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."day_dayId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: day_dayId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."day_dayId_seq" OWNED BY public.day."dayId";


--
-- Name: exercise; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.exercise (
    "exerciseId" integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    "default" text DEFAULT 'false'::text
);


--
-- Name: exerciseBodyPart; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."exerciseBodyPart" (
    "bodyPartId" integer NOT NULL,
    "exerciseId" integer NOT NULL
);


--
-- Name: exercise_exerciseId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."exercise_exerciseId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: exercise_exerciseId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."exercise_exerciseId_seq" OWNED BY public.exercise."exerciseId";


--
-- Name: routine; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.routine (
    "routineId" integer NOT NULL,
    "userId" integer NOT NULL,
    "recommendedCalories" integer NOT NULL
);


--
-- Name: routine_routineId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."routine_routineId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: routine_routineId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."routine_routineId_seq" OWNED BY public.routine."routineId";


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    "userId" integer NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."user_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."user_userId_seq" OWNED BY public."user"."userId";


--
-- Name: bodyPart bodyPartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."bodyPart" ALTER COLUMN "bodyPartId" SET DEFAULT nextval('public."bodyPart_bodyPartId_seq"'::regclass);


--
-- Name: customExercise customExerciseId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."customExercise" ALTER COLUMN "customExerciseId" SET DEFAULT nextval('public."customExercise_customExerciseId_seq"'::regclass);


--
-- Name: day dayId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.day ALTER COLUMN "dayId" SET DEFAULT nextval('public."day_dayId_seq"'::regclass);


--
-- Name: exercise exerciseId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exercise ALTER COLUMN "exerciseId" SET DEFAULT nextval('public."exercise_exerciseId_seq"'::regclass);


--
-- Name: routine routineId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.routine ALTER COLUMN "routineId" SET DEFAULT nextval('public."routine_routineId_seq"'::regclass);


--
-- Name: user userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user" ALTER COLUMN "userId" SET DEFAULT nextval('public."user_userId_seq"'::regclass);


--
-- Data for Name: bodyPart; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."bodyPart" ("bodyPartId", name) FROM stdin;
1	Chest
2	Back
3	Shoulders
4	Biceps
5	Legs
6	Abs
7	Triceps
\.


--
-- Data for Name: customExercise; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."customExercise" ("customExerciseId", name, description) FROM stdin;
1	new mon exercise	mon description
2	newest mon exercise	newest mon description
3	sunday exercise	sunday description
5	Push Ups: Wide	Start in a plank position with hands wider than shoulders. Face fingers forward. Slowly bend elbows out to the side as you lower your body to the floor. Stop when your chest is near the floor. Extend your elbows to go back to plank position.
6	Superman	Lie face down on a mat, with your legs straight and your arms outstretched in front of you. Raise both your arms and legs at the same time, forming a bowl shape with your body.  Hold this position for a few seconds.
7	Shoulder Press	Sitting or standing, hold a dumbbell in each hand at shoulder height with your palms facing inwards or away from you. Keep your chest up and your core braced, and look straight forward throughout the move. Press the weights directly upwards until your arms are straight and the weights touch above your head.
8	Bicep Curls Forward	Stand holding a dumbbell in each hand with your arms hanging by your sides. Ensure your elbows are close to your torso and your palms facing forward. Keeping your upper arms stationary, exhale as you curl the weights up to shoulder level while contracting your biceps.
9	Air Squats	Keep your feet at shoulder width apart and pointed straight ahead. When squatting, your hips will move down and back. Your lumbar curve should be maintained, and your heels should stay flat on the floor the entire time. In air squats, your hips will descend lower than your knees.
18	Side-Tri Rises	Lie on your side with your legs straight or angled slightly at the hips. Place the hand of your lower arm on its opposite shoulder, and place your other hand firmly on the floor. With your elbow pointed towards your feet, press into the floor and extend your arm, lifting your upper body off the floor.
19	Air Squats	Keep your feet at shoulder width apart and pointed straight ahead. When squatting, your hips will move down and back. Your lumbar curve should be maintained, and your heels should stay flat on the floor the entire time. In air squats, your hips will descend lower than your knees.
20	Bicep Curls Forward	Stand holding a dumbbell in each hand with your arms hanging by your sides. Ensure your elbows are close to your torso and your palms facing forward. Keeping your upper arms stationary, exhale as you curl the weights up to shoulder level while contracting your biceps.
21	In & Outs	 Sit on the floor with your palms down at your sides. Utilizing your core muscles, bring both knees into your chest.
22	In & Outs	 Sit on the floor with your palms down at your sides. Utilizing your core muscles, bring both knees into your chest.
23	Superman	Lie face down on a mat, with your legs straight and your arms outstretched in front of you. Raise both your arms and legs at the same time, forming a bowl shape with your body.  Hold this position for a few seconds.
\.


--
-- Data for Name: day; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.day ("dayId", name, "routineId") FROM stdin;
1	Sunday	1
2	Monday	1
3	Tuesday	1
4	Wednesday	1
5	Thursday	1
6	Friday	1
7	Saturday	1
\.


--
-- Data for Name: dayExercise; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."dayExercise" ("dayId", "customExerciseId") FROM stdin;
2	1
2	2
1	3
1	5
1	6
1	7
1	8
1	9
1	18
1	19
1	20
1	21
1	22
1	23
\.


--
-- Data for Name: exercise; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.exercise ("exerciseId", name, description, "default") FROM stdin;
5	Push Ups: Wide	Start in a plank position with hands wider than shoulders. Face fingers forward. Slowly bend elbows out to the side as you lower your body to the floor. Stop when your chest is near the floor. Extend your elbows to go back to plank position.	true
7	Push Ups: Standard	Start in a plank position with hands roughly shoulder-width apart. Face fingers forward. Slowly bend elbows out to the side as you lower your body to the floor. Stop when your chest is near the floor. Extend your elbows to go back to plank position.	true
8	Push Ups: Close	Start in a plank position with hands further down the frame of the body. Face fingers forward. Slowly bend elbows out to the side as you lower your body to the floor. Stop when your chest is near the floor. Extend your elbows to go back to plank positio.n	true
9	Push Ups: Diamond	Start in a plank position with both hands close together under your chest. Position index fingers and thumbs so that they are touching, forming a diamond shape. Slowly bend elbows out to the side as you lower your body to the floor. Stop when your chest is near the floor. Extend your elbows to go back to plank position.	true
10	Push Ups: Decline	Start in a plank position with hands roughly shoulder-width apart. Put your feet on an elevated surface so that your body is at a downward angle. Face fingers forward. Slowly bend elbows out to the side as you lower your body to the floor. Stop when your chest is near the floor. Extend your elbows to go back to plank position.	true
11	Dive Bomber Push Ups	Start in a plank position with hands roughly shoulder-width apart with your hips raised so that your body forms an inverted V. Face fingers forward. Keeping your shoulder lowered away from your ears, bring your chest forward between your hands as you bend your arms. Keep gliding through as you straighten your arms and bring your chest up. Finish by reversing the glide, raising your hips back up.	true
12	Plange Push Ups	Start by lying on your stomach with arms extended alongside your body and palms facing down and hands by your hips. Rotate wrists to turn fingers to the side. Press your hands to lift your body in a pushup position. Move your weight forward into your chest and shoulders. Press legs together as you raise your feet and legs. As you bend elbows, lower chest to the ground. Keep lower body elevated. Straighten elbows to return to start position.	true
13	Bench Press with Bar	Lie on a bench with your eyes under the bar. Grab the bar with a medium grip-width (thumbs around bar). Unrack the bar by straightening your arms. Lower the bar to your chest. Press the bar back up until your arms are straight.	true
14	Bench Press with Dumbbell	Lie on the bench with a dumbbell in each hand just to the sides of your shoulders. Palms should be facing towards your feet in the starting position. Press weights above your chest by extending your elbows until your arms are straight. Slowly bring the weights back down.	true
15	Bench Flies	Lie on the bench with a dumbbell in each hand just to the sides of your shoulders. The dumbbells should be directly above your chest with palms facing each other. Lower the weights in an arc out to the sides as far as is comfortable. Reverse the movement back to the start while keeping a slight bend in your elbows throughout and don’t arch your back.	true
16	Incline Bench Flies	Lie on an inclined bench with a dumbbell in each hand just to the sides of your shoulders. The dumbbells should be directly above your chest with palms facing each other. Lower the weights in an arc out to the sides as far as is comfortable. Reverse the movement back to the start while keeping a slight bend in your elbows throughout and don’t arch your back.	true
17	Floor Flies	Lie on the ground with a dumbbell in each hand just to the sides of your shoulders. The dumbbells should be directly above your chest with palms facing each other. Lower the weights in an arc out to the sides as far as is comfortable. Reverse the movement back to the start while keeping a slight bend in your elbows throughout and don’t arch your back.	true
18	Dips	Grab the bars and jump up to straighten your arms. Lower body by bending your arms while leaning forward. Dip down until shoulders are below your elbows. Lift your body up by straightening your arms. Lock your elbows at the top.	true
19	Superman	Lie face down on a mat, with your legs straight and your arms outstretched in front of you. Raise both your arms and legs at the same time, forming a bowl shape with your body.  Hold this position for a few seconds.	true
20	Wide Grip Pull-Ups	Use a wide grip on the bar. If you want to make it even tougher, pause for a second each time you get to the top of the move.	true
61	Scissors	Lay on the floor flat on your back with your legs extended straight out. Lift one leg into the air, and keep it straight! As you lower the leg you lifted, raise your other leg in the same fashion. Continue this motion, alternating legs continuously like you’re a big pair of scissors.	true
62	Heels to Heaven	Position your arms out to the sides and your legs in the air at about 60 degrees. Lift your legs until they are perpendicular to the ground. Lift your pelvis off the ground and shoot your feet into the air. Bring your feet back to the starting position and repeat.	true
63	Hip Rock n Raise	Lie on your back with your hands on the floor next to your hips. Place your feet together with your knees out. Raise your legs up towards the ceiling and extend them straight at the top. Lower slowly and repeat.	true
64	V-Ups	Lie on your back and extend your arms behind your head. Keep feet together and toes pointed. Keep legs straight and lift them up as you simultaneously raise your upper body off of the floor. Keep your core tight as you reach for your toes with your hands. Slowly lower yourself back down to the starting position.	true
65	Kayak Twist	Sit on the floor with your legs straight out in front of you. Bend your knees and lift your feet off the floor. With or without a weight in your hands, begin alternatively touching the floor on either side of your body by your waist. 	true
66	Penguins	Lie on your back with knees bent and hands at your sides. Lift your upper back and shoulder blades off of the floor. Bend to the left bringing your left hand to touch your left heel, then switch sides bringing your right hand to your right heel. Repeat this motion.	true
67	Close Grip Push Ups	Lay on the floor with your face, palms and toes facing down. Keep your legs and back straight. Place your palms on the floor with your elbows touching your sides. Extend your arms straight to push your body up and back down again, keeping your arms close to your sides and your elbows pointing towards your feet.	true
21	Close Grip Pull-Ups	Using a pronated grip, grasp the pull bar with a shoulder width grip. Take a deep breath, squeeze your glutes and brace your abs. Depress the shoulder blades and then drive the elbows straight down to the floor while activating the lats. Pull your chin towards the bar until the lats are fully contracted, then slowly lower yourself back to the start position and repeat for the assigned number of repetitions.	true
22	Corn Cob Pull-Ups	Grab onto the bar with your hands a little bit wider than shoulder width apart. Pull yourself up to the bar so that your chin is above the bar. While your chin is still above the bar, pull yourself to the right, then to the left, back to center, and then push yourself outwards 3-6 inches.	true
23	Chin-Ups	Grasp a pull-up bar with an underhand grip, hands shoulder-width apart or slightly narrower. Straighten your arms, keep your knees bent and cross your lower legs. Retract your shoulder blades to reduce the stress on the shoulder joints. Keeping your body stable and core engaged, pull your body up until your chin becomes aligned with the bar.	true
24	Lawn Mowers	Stand with your legs slightly wider than shoulder width apart. Place your left hand on your left hip. Bring your hips back by bending at the waist. Bring your left leg forward. Move into an upright position and rotate your torso along with your arms to the right, transferring your weight onto the back foot and lifting a dumbbell with the opposite hand along your chest, keeping your elbow above your hand. Imagine you are starting a lawn mower. Squeeze your shoulder blades together and down as you rotate your torso.	true
25	Bench Back Flys	Moving only at the shoulders, raise your arms in a semi-circular motion out to your sides until your arms are parallel to the floor. Keep a slight bend in your elbows throughout the movement. Squeeze your shoulder blades together at the height of the movement and then begin slowly lowering the dumbbells back to the starting position.	true
26	Seated Cable Rows	Pull the handle and weight back toward the lower abdomen while trying not to use the momentum of the row too much by moving the torso backward with the arms. Target the middle to upper back by keeping your back straight and squeezing your shoulder blades together as you row, chest out.	true
27	Switch Grip Pull-ups	Hang from the bar, grip a bit more than shoulder width apart, palms facing out from your body. Squeeze your shoulder blades together and pull your body up with force. And the top of the pull up, let go of the bar and switch your grip so that your palm is facing towards you. Lower yourself back to a hanging position. Repeat, switching your grip at the top of each pull up.	true
28	Elbow-Out Lawnmowers	Stand with your legs slightly wider than shoulder width apart. Place your left hand on your left hip and elbows out. Bring your hips back by bending at the waist. Bring your left leg forward. Move into an upright position and rotate your torso along with your arms to the right, transferring your weight onto the back foot. Imagine you are starting a lawn mower. Squeeze your shoulder blades together and down as you rotate your torso.	true
29	Locomotives	Place one foot in front of the other and bend at the hip so your back is parallel to the ground. With a dumbbell in each hand, palms facing each other, pull one dumbbell up until your arm reaches a 90 degree angle. As you return your arm to its original position, pull the other dumbbell up. Repeat alternating arms until you have reached the desired number of reps.	true
30	Seated Bent Over Flys	Secure a flat bench and select the desired weight from the rack. Sit in an upright position and then hinge forward from the hips. Allow the arms to hang straight down from the shoulders with a neutral grip and dumbbells behind your calves. Take a deep breath and pull the dumbbells towards the ceiling using the rear deltoids. Slowly lower the dumbbells back to the starting position under control. Repeat for the desired number of repetitions.	true
31	Shoulder Press	Sitting or standing, hold a dumbbell in each hand at shoulder height with your palms facing inwards or away from you. Keep your chest up and your core braced, and look straight forward throughout the move. Press the weights directly upwards until your arms are straight and the weights touch above your head.	true
32	Alternating Shoulder Press	Sitting or standing, hold a dumbbell in each hand at shoulder height with your palms facing inwards or away from you. Keep your chest up and your core braced, and look straight forward throughout the move. Alternate pressing one weight directly upwards until your arm is straight.	true
33	Upright Rows	Standing up straight, hold a dumbbell in each hand with your arms relaxed in front of you, palms facing inwards. Keep your chest up and your core braced, and look straight forward throughout the move. Lift the dumbbells straight upwards to your collarbone.	true
34	Side Flies	Standing or sitting up straight, hold a dumbbell in each hand with your arms resting at your sides.Keep your chest up and your core braced, and look straight forward throughout the move. With your elbows slightly bent, raise the dumbbells until your arms are parallel with the floor.	true
35	Forward Flies	Standing up straight, hold a dumbbell in each hand with your arms relaxed in front of you, palms facing inwards. Keep your chest up and your core braced, and look straight forward throughout the move. Raise the dumbbells in front of you until your arms are parallel with the floor.	true
36	Shrugs	Standing or sitting up straight, hold a dumbbell in each hand with your arms relaxed at your sides, palms facing inward. Keep your chest up and your core braced, and look straight forward throughout the move.  Shrug your shoulders up as high as your can in a smooth motion.	true
37	Bicep Curls Forward	Stand holding a dumbbell in each hand with your arms hanging by your sides. Ensure your elbows are close to your torso and your palms facing forward. Keeping your upper arms stationary, exhale as you curl the weights up to shoulder level while contracting your biceps.	true
38	Bicep Curls Side	Stand holding a dumbbell in each hand with your arms hanging by your sides. Ensure your elbows are close to your torso and your palms facing away from your body. Keeping your upper arms stationary, exhale as you curl the weights up to shoulder level while contracting your biceps.	true
39	Static Curls	Stand holding a dumbbell in each hand with your arms hanging by your sides. Curl the left dumbbell up, pausing midway to your shoulder, and hold it there. Now curl the right dumbbell all the way to the top of the movement. Complete the curl with the left arm then switch.	true
40	Cross Body Curls	Stand holding a dumbbell in each hand with your arms hanging by your sides. Rotate your thumb towards the midline on the body, and bend your elbow to bring the dumbbell towards the opposite side of the body (the dumbbell should end up in front of your sternum, or opposite pec muscle). Hold the contraction hard at the end of the range of motion before slowly lowering back to the starting position, and repeating the exact sequence with the other arm.	true
41	One-Arm Concentration Curls	Grab a dumbbell with one hand. Sit on the edge of a bench and place your feet wider than shoulder-width. Place the back of your arm with the dumbbell on the inside of your thigh and place the opposite hand on top of the opposite knee for support. Slowly curl the dumbbell upward as far as possible. Pause at the top and slowly lower it back to the starting position.	true
42	Chin-Ups	Grasp a pull-up bar with an underhand grip, hands shoulder-width apart or slightly narrower. Straighten your arms, keep your knees bent and cross your lower legs. Retract your shoulder blades to reduce the stress on the shoulder joints. Keeping your body stable and core engaged, pull your body up until your chin becomes aligned with the bar. Pause for one to two seconds at the top, with the biceps under maximum tension. Slowly lower to the start position.	true
43	Curl-Up Hammer Downs	Stand holding a dumbbell in each hand with your arms hanging by your sides. Ensure your elbows are close to your torso and your palms facing forward. Keeping your upper arms stationary, exhale as you curl the weights up to shoulder level while contracting your biceps. At the top of the movement, twist your wrists 90 degrees and uncurl back to the starting position. Twist your wrists back to their original position and repeat the movement.	true
44	Hammer Curls	Stand holding a dumbbell in each hand with your arms hanging by your sides with your palms facing each other. Keeping your elbows tucked, your upper arms locked in place (only your hands and forearms should move), and your palms facing inward, curl the dumbbells as close to your shoulders as you can. Pause, and then slowly lower the weights back to the starting position.	true
45	Twisting Curls	Hold a dumbbell in each hand at your side with palms facing each other. Use your bicep to curl the dumbbells up to your shoulders, twisting your palms to face your chest as you lift them. Slowly lower the dumbbells back down to your side and repeat.	true
46	Air Squats	Keep your feet at shoulder width apart and pointed straight ahead. When squatting, your hips will move down and back. Your lumbar curve should be maintained, and your heels should stay flat on the floor the entire time. In air squats, your hips will descend lower than your knees.	true
47	Lunges	Stand tall with feet hip-width apart. Engage your core. Take a big step forward with your right leg. Start to shift your weight forward so your heel hits the floor first. Lower your body until your right thigh is parallel to the floor and your right shin is vertical. It’s OK if your knee shifts forward a little as long as it doesn’t go past your right toe. If mobility allows, lightly tap your left knee to the floor while keeping your weight on your right heel. Press into your right heel to drive back up to starting position. Repeat on the other side.	true
48	Backward Lunges	Take a step back with your right foot. Lower your hips until your left thigh is parallel to the floor and your right knee is close to (but not touching) the floor. Pause for two seconds, then press your left heel into the floor and contract your quads and hamstrings to return to start.	true
49	Side Lunges	Take a wide step out to the left. Bend your left knee as you push your hips back. Keep both feet flat on the floor throughout the lunge. Push off with your left leg to return to standing. Perform 10 to 12 lunges on the left side before switching to the right.	true
50	Three-Way Lunges	Step forward with your right foot and bend at your knees till they make a 90 degree angle and then step back in. Step to the side with your right foot and bend at the knee so that it makes a 90 degree angle. Keep your left leg straight. Step back in. Step backwards with your right leg so that your right knee is almost touching the ground and both knees are at a 90 degree angle. Step back, bringing your feet in together. Switch to your left leg and repeat all the steps. 3 total lunges for each side.	true
51	Toe-Roll Lunges	Take a big step forward so that your left foot is flat on the ground and you are balanced on the ball of your right foot. This is your starting position. Then, with your left knee bent, push forward with your right foot, lifting your left heel off the ground. Return to your starting position. Do this for the desired number of reps, then switch sides. 	true
52	Lunge Walk	Stand up straight with your feet shoulder-width apart. Your hands can stay by the side of your body or on your hips. Step forward with your right leg, putting the weight into your heel. Bend the right knee, lowering down so that it’s parallel to the floor in a lunge position. Pause for a beat. Without moving the right leg, move your left foot forward, repeating the same movement on the left leg. Pause as your left leg is parallel to the floor in a lunge position. Repeat this movement, “walking” forward as you lunge, alternating legs.	true
53	Air Chair	Reach up and bring the arms down to sides and touch the toes. Keeping arms by the ears move into a seated position.  	true
54	Calf Raises	Stand up straight, then push through the balls of your feet and raise your heel until you are standing on your toes. Then lower slowly back to the start.	true
55	Skaters	Start with your legs slightly wider than shoulder distance apart and arms at the sides. Bring one leg behind at a slight angle into a reverse lunge. The front knee will come to a 90-degree angle. Swing the arms in front of that bent knee and leap the back leg forward to switch sides in a skating motion. Arms alternate as you switch sides like a speed skater.	true
56	Wall Sits	Start with your back against a wall with your feet shoulder width and about 2 feet from the wall. Engage your abdominal muscles and slowly slide your back down the wall until your thighs are parallel to the ground. Adjust your feet so your knees are directly above your ankles (rather than over your toes). Keep your back flat against the wall. Hold the position for 20 to 60 seconds. Slide slowly back up the wall to a standing position. Rest 30 seconds and repeat the exercise.	true
57	In & Outs	 Sit on the floor with your palms down at your sides. Utilizing your core muscles, bring both knees into your chest.	true
58	Bicycles	Sitting on the floor, extend your legs out in front of you and lift your feet off the floor. Bring one foot in towards your body and extend the other leg out, and alternate kicking your feet out forward in the air like you’re riding a bike.	true
59	Alternate Seated Frogs	Start off lying on the ground, both legs out straight. Turn your toes out to the side at a 45 degree angle so your heels are touching. Bring both legs up about 45 degrees and then bring the knees all the way in, keeping the heels together, and then kicking out into the same position. Focus on squeezing the inner thighs together as you drive through those heels.	true
60	Sit-Ups	Lie down on your back. Bend your legs and place feet firmly on the ground to stabilize your lower body. Cross your hands to opposite shoulders or place them behind your ears, without pulling on your neck. Curl your upper body all the way up toward your knees. Exhale as you lift. Slowly, lower yourself down, returning to your starting point. Inhale as you lower.	true
68	Side-Tri Rises	Lie on your side with your legs straight or angled slightly at the hips. Place the hand of your lower arm on its opposite shoulder, and place your other hand firmly on the floor. With your elbow pointed towards your feet, press into the floor and extend your arm, lifting your upper body off the floor.	true
69	Tricep Kickbacks	In a standing position, bend forward slightly at the waist so your torso is almost parallel to the floor. Engage your core and keep your head, neck, and spine in one line. Hold a dumbbell in each hand close to your chest, with your elbows close to your body and your hands facing inwards. On an exhale, engage your triceps as you slowly extend your arms back as far as you can, keeping your arms close to your side.	true
70	Twist Kickbacks	In a standing position, bend forward slightly at the waist so your torso is almost parallel to the floor. Engage your core and keep your head, neck, and spine in one line. Hold a dumbbell in each hand close to your chest, with your elbows close to your body and your hands facing inwards. On an exhale, engage your triceps as you slowly extend your arms back as far as you can, twisting your arms throughout the movement until your palms face backward, keeping your arms close to your side.	true
71	Dips	Place your hands facing inward on either side of the dip bar, or facing forward on a chair behind you. Raise your body into the air. Lower your body, then push yourself back up.	true
72	Lawnmowers	Stand with your legs slightly wider than shoulder width apart. Place your left hand on your left hip. Bring your hips back by bending at the waist. Bring your left leg forward. Move into an upright position and rotate your torso along with your arms to the right, transferring your weight onto the back foot and lifting a dumbbell with the opposite hand along your chest, keeping your elbow above your hand. Imagine you are starting a lawn mower. Squeeze your shoulder blades together and down as you rotate your torso.	true
\.


--
-- Data for Name: exerciseBodyPart; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."exerciseBodyPart" ("bodyPartId", "exerciseId") FROM stdin;
1	5
1	7
1	8
1	9
1	10
1	11
1	12
1	13
1	14
1	15
1	16
1	17
1	18
2	19
2	20
2	21
2	22
2	23
2	24
2	25
2	26
2	27
2	28
2	29
2	30
3	31
3	32
3	33
3	34
3	35
3	36
4	37
4	38
4	39
4	40
4	41
4	42
4	43
4	44
4	45
5	46
5	47
5	48
5	49
5	50
5	51
5	52
5	53
5	54
5	55
5	56
6	57
6	58
6	59
6	60
6	61
6	62
6	63
6	64
6	65
6	66
7	67
7	68
7	69
7	70
7	71
7	72
\.


--
-- Data for Name: routine; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.routine ("routineId", "userId", "recommendedCalories") FROM stdin;
1	1	2355
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."user" ("userId", "firstName", "lastName", email, password, "createdAt") FROM stdin;
1	Michael	Poole	test@gmail.com	testpassword	2020-09-21 17:31:39.268283-05
\.


--
-- Name: bodyPart_bodyPartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."bodyPart_bodyPartId_seq"', 7, true);


--
-- Name: customExercise_customExerciseId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."customExercise_customExerciseId_seq"', 23, true);


--
-- Name: day_dayId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."day_dayId_seq"', 7, true);


--
-- Name: exercise_exerciseId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."exercise_exerciseId_seq"', 72, true);


--
-- Name: routine_routineId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."routine_routineId_seq"', 1, true);


--
-- Name: user_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."user_userId_seq"', 1, true);


--
-- Name: bodyPart bodyPart_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."bodyPart"
    ADD CONSTRAINT "bodyPart_pkey" PRIMARY KEY ("bodyPartId");


--
-- Name: customExercise customExercise_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."customExercise"
    ADD CONSTRAINT "customExercise_pkey" PRIMARY KEY ("customExerciseId");


--
-- Name: day day_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.day
    ADD CONSTRAINT day_pkey PRIMARY KEY ("dayId");


--
-- Name: exercise exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT exercise_pkey PRIMARY KEY ("exerciseId");


--
-- Name: routine routine_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.routine
    ADD CONSTRAINT routine_pkey PRIMARY KEY ("routineId");


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY ("userId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

