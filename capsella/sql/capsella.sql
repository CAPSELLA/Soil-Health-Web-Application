--
-- PostgreSQL database dump
--

-- Dumped from database version 9.3.15
-- Dumped by pg_dump version 9.3.15
-- Started on 2017-07-01 11:37:53 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

SET default_with_oids = false;

--
-- TOC entry 190 (class 1259 OID 484122)
-- Name: caps_kb; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE caps_kb (
    id_caps_kb integer NOT NULL,
    caps_path character varying NOT NULL,
    caps_title character varying NOT NULL,
    id_caps_topic integer,
    caps_description text
);


--
-- TOC entry 189 (class 1259 OID 484120)
-- Name: caps_kb_id_caps_kb_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE caps_kb_id_caps_kb_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3223 (class 0 OID 0)
-- Dependencies: 189
-- Name: caps_kb_id_caps_kb_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE caps_kb_id_caps_kb_seq OWNED BY caps_kb.id_caps_kb;


--
-- TOC entry 188 (class 1259 OID 484075)
-- Name: caps_spade; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE caps_spade (
    id_caps_spade integer NOT NULL,
    date_mon date,
    lat double precision,
    lon double precision,
    json json,
    guid character varying,
    flag integer DEFAULT 0,
    email character varying,
    user_id character varying,
    time_ref timestamp without time zone DEFAULT now()
);


--
-- TOC entry 187 (class 1259 OID 484073)
-- Name: caps_spade_id_caps_spade_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE caps_spade_id_caps_spade_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3224 (class 0 OID 0)
-- Dependencies: 187
-- Name: caps_spade_id_caps_spade_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE caps_spade_id_caps_spade_seq OWNED BY caps_spade.id_caps_spade;


--
-- TOC entry 186 (class 1259 OID 424574)
-- Name: caps_themes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE caps_themes (
    id_caps_themes integer NOT NULL,
    theme_name character varying(250) NOT NULL,
    raster_theme character varying(250) NOT NULL,
    theme_order integer
);


--
-- TOC entry 185 (class 1259 OID 424572)
-- Name: caps_themes_id_caps_themes_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE caps_themes_id_caps_themes_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3225 (class 0 OID 0)
-- Dependencies: 185
-- Name: caps_themes_id_caps_themes_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE caps_themes_id_caps_themes_seq OWNED BY caps_themes.id_caps_themes;


--
-- TOC entry 192 (class 1259 OID 484133)
-- Name: caps_topic; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE caps_topic (
    id_caps_topic integer NOT NULL,
    caps_path character varying,
    title character varying,
    topic_order integer DEFAULT 0
);


--
-- TOC entry 191 (class 1259 OID 484131)
-- Name: caps_topic_id_caps_topic_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE caps_topic_id_caps_topic_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3226 (class 0 OID 0)
-- Dependencies: 191
-- Name: caps_topic_id_caps_topic_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE caps_topic_id_caps_topic_seq OWNED BY caps_topic.id_caps_topic;


--
-- TOC entry 3092 (class 2604 OID 484125)
-- Name: id_caps_kb; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY caps_kb ALTER COLUMN id_caps_kb SET DEFAULT nextval('caps_kb_id_caps_kb_seq'::regclass);


--
-- TOC entry 3089 (class 2604 OID 484078)
-- Name: id_caps_spade; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY caps_spade ALTER COLUMN id_caps_spade SET DEFAULT nextval('caps_spade_id_caps_spade_seq'::regclass);


--
-- TOC entry 3088 (class 2604 OID 424577)
-- Name: id_caps_themes; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY caps_themes ALTER COLUMN id_caps_themes SET DEFAULT nextval('caps_themes_id_caps_themes_seq'::regclass);


--
-- TOC entry 3093 (class 2604 OID 484136)
-- Name: id_caps_topic; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY caps_topic ALTER COLUMN id_caps_topic SET DEFAULT nextval('caps_topic_id_caps_topic_seq'::regclass);


--
-- TOC entry 3102 (class 2606 OID 484130)
-- Name: caps_kb_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY caps_kb
    ADD CONSTRAINT caps_kb_pkey PRIMARY KEY (id_caps_kb);


--
-- TOC entry 3098 (class 2606 OID 484085)
-- Name: caps_spade_guid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY caps_spade
    ADD CONSTRAINT caps_spade_guid_key UNIQUE (guid);


--
-- TOC entry 3104 (class 2606 OID 484141)
-- Name: caps_topic_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY caps_topic
    ADD CONSTRAINT caps_topic_pkey PRIMARY KEY (id_caps_topic);


--
-- TOC entry 3100 (class 2606 OID 484083)
-- Name: id_caps_spade_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY caps_spade
    ADD CONSTRAINT id_caps_spade_pk PRIMARY KEY (id_caps_spade);


--
-- TOC entry 3096 (class 2606 OID 424582)
-- Name: id_caps_themes_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY caps_themes
    ADD CONSTRAINT id_caps_themes_pk PRIMARY KEY (id_caps_themes);


-- Completed on 2017-07-01 11:37:53 CEST

--
-- PostgreSQL database dump complete
--
