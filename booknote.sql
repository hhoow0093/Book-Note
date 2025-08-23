--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2025-08-23 12:21:10

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16560)
-- Name: stories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stories (
    id integer NOT NULL,
    title character varying(20) NOT NULL,
    description text,
    theme_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.stories OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16559)
-- Name: stories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stories_id_seq OWNER TO postgres;

--
-- TOC entry 3337 (class 0 OID 0)
-- Dependencies: 216
-- Name: stories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stories_id_seq OWNED BY public.stories.id;


--
-- TOC entry 215 (class 1259 OID 16553)
-- Name: themes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.themes (
    id integer NOT NULL,
    title character varying(20) NOT NULL,
    description character varying(186)
);


ALTER TABLE public.themes OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16552)
-- Name: themes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.themes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.themes_id_seq OWNER TO postgres;

--
-- TOC entry 3338 (class 0 OID 0)
-- Dependencies: 214
-- Name: themes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.themes_id_seq OWNED BY public.themes.id;


--
-- TOC entry 3179 (class 2604 OID 16563)
-- Name: stories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stories ALTER COLUMN id SET DEFAULT nextval('public.stories_id_seq'::regclass);


--
-- TOC entry 3178 (class 2604 OID 16556)
-- Name: themes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.themes ALTER COLUMN id SET DEFAULT nextval('public.themes_id_seq'::regclass);


--
-- TOC entry 3331 (class 0 OID 16560)
-- Dependencies: 217
-- Data for Name: stories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stories (id, title, description, theme_id, created_at) FROM stdin;
15	Relational Keys	\N	17	2025-01-16 10:30:00
16	SQL Basics	\N	17	2025-01-17 14:00:00
17	Joins Practice	\N	17	2025-01-18 08:45:00
18	Normalization	\N	17	2025-01-19 13:20:00
19	Indexes Intro	\N	17	2025-01-20 15:10:00
20	Transactions	\N	17	2025-01-21 11:00:00
14	ER Models	# ER Models\n\n## Introduction\nEntity-Relationship (ER) modeling is a conceptual design technique used to represent the structure of a database. It helps visualize how data is connected and what constraints exist.\n\n---\n\n## Key Components\n- **Entity**: A real-world object or concept (e.g., Student, Course).\n- **Attributes**: Properties that describe an entity (e.g., student_id, name, age).\n- **Relationships**: Connections between entities (e.g., a Student *enrolls in* a Course).\n\n---\n\n## Types of Attributes\n- **Simple**: Cannot be divided further (e.g., age).\n- **Composite**: Can be divided into subparts (e.g., full_name → first_name, last_name).\n- **Derived**: Calculated from other attributes (e.g., age from date_of_birth).\n\n---\n\n## Cardinality\n- **One-to-One (1:1)** → Example: Each student has one ID card.\n- **One-to-Many (1:N)** → Example: A teacher teaches many courses.\n- **Many-to-Many (M:N)** → Example: Students enroll in many courses, and courses have many students.\n\n---	17	2025-01-15 09:00:00
\.


--
-- TOC entry 3329 (class 0 OID 16553)
-- Dependencies: 215
-- Data for Name: themes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.themes (id, title, description) FROM stdin;
16	Math	my math notes during primary school to senior highschool
17	Intro to DBMS	Learned about databases, difference between relational and non-relational, importance of primary keys, and how tables are structured.
18	Networking 101	Covered OSI model, especially physical, data link, and network layers. IP addressing basics introduced with IPv4 examples.
19	C Programming	Discussed variables, loops, and functions. Wrote simple programs like calculating factorials and Fibonacci sequence using recursion.
20	Web Basics	HTML structure explained. Practiced creating forms and links. CSS introduction with inline, internal, and external styles.
21	Cybersecurity	Explored phishing, malware, and brute force attacks. Learned about password hashing and importance of multi-factor authentication.
22	Data Structures	Focused on arrays, linked lists, and stacks. Implemented stack push/pop operations in C and discussed their time complexity.
\.


--
-- TOC entry 3339 (class 0 OID 0)
-- Dependencies: 216
-- Name: stories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stories_id_seq', 20, true);


--
-- TOC entry 3340 (class 0 OID 0)
-- Dependencies: 214
-- Name: themes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.themes_id_seq', 24, true);


--
-- TOC entry 3184 (class 2606 OID 16568)
-- Name: stories stories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stories
    ADD CONSTRAINT stories_pkey PRIMARY KEY (id);


--
-- TOC entry 3182 (class 2606 OID 16558)
-- Name: themes themes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.themes
    ADD CONSTRAINT themes_pkey PRIMARY KEY (id);


--
-- TOC entry 3185 (class 2606 OID 16569)
-- Name: stories stories_theme_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stories
    ADD CONSTRAINT stories_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.themes(id) ON DELETE CASCADE;


-- Completed on 2025-08-23 12:21:10

--
-- PostgreSQL database dump complete
--

