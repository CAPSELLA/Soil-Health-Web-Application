--
-- PostgreSQL database dump
--

-- Dumped from database version 9.3.15
-- Dumped by pg_dump version 9.3.15
-- Started on 2017-06-06 21:00:25 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 190 (class 1259 OID 484122)
-- Name: caps_kb; Type: TABLE; Schema: public; Owner: sfr; Tablespace: 
--

CREATE TABLE caps_kb (
    id_caps_kb integer NOT NULL,
    caps_path character varying NOT NULL,
    caps_title character varying NOT NULL,
    id_caps_topic integer,
    caps_description text
);


ALTER TABLE public.caps_kb OWNER TO sfr;

--
-- TOC entry 189 (class 1259 OID 484120)
-- Name: caps_kb_id_caps_kb_seq; Type: SEQUENCE; Schema: public; Owner: sfr
--

CREATE SEQUENCE caps_kb_id_caps_kb_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.caps_kb_id_caps_kb_seq OWNER TO sfr;

--
-- TOC entry 3229 (class 0 OID 0)
-- Dependencies: 189
-- Name: caps_kb_id_caps_kb_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sfr
--

ALTER SEQUENCE caps_kb_id_caps_kb_seq OWNED BY caps_kb.id_caps_kb;


--
-- TOC entry 188 (class 1259 OID 484075)
-- Name: caps_spade; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE caps_spade (
    id_caps_spade integer NOT NULL,
    date_mon date,
    lat double precision,
    lon double precision,
    json json,
    guid character varying
);


ALTER TABLE public.caps_spade OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 484073)
-- Name: caps_spade_id_caps_spade_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE caps_spade_id_caps_spade_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.caps_spade_id_caps_spade_seq OWNER TO postgres;

--
-- TOC entry 3230 (class 0 OID 0)
-- Dependencies: 187
-- Name: caps_spade_id_caps_spade_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE caps_spade_id_caps_spade_seq OWNED BY caps_spade.id_caps_spade;


--
-- TOC entry 186 (class 1259 OID 424574)
-- Name: caps_themes; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE caps_themes (
    id_caps_themes integer NOT NULL,
    theme_name character varying(250) NOT NULL,
    raster_theme character varying(250) NOT NULL,
    theme_order integer
);


ALTER TABLE public.caps_themes OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 424572)
-- Name: caps_themes_id_caps_themes_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE caps_themes_id_caps_themes_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.caps_themes_id_caps_themes_seq OWNER TO postgres;

--
-- TOC entry 3231 (class 0 OID 0)
-- Dependencies: 185
-- Name: caps_themes_id_caps_themes_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE caps_themes_id_caps_themes_seq OWNED BY caps_themes.id_caps_themes;


--
-- TOC entry 192 (class 1259 OID 484133)
-- Name: caps_topic; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE caps_topic (
    id_caps_topic integer NOT NULL,
    caps_path character varying,
    title character varying,
    topic_order integer DEFAULT 0
);


ALTER TABLE public.caps_topic OWNER TO postgres;

--
-- TOC entry 191 (class 1259 OID 484131)
-- Name: caps_topic_id_caps_topic_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE caps_topic_id_caps_topic_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.caps_topic_id_caps_topic_seq OWNER TO postgres;

--
-- TOC entry 3232 (class 0 OID 0)
-- Dependencies: 191
-- Name: caps_topic_id_caps_topic_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE caps_topic_id_caps_topic_seq OWNED BY caps_topic.id_caps_topic;


--
-- TOC entry 3090 (class 2604 OID 484125)
-- Name: id_caps_kb; Type: DEFAULT; Schema: public; Owner: sfr
--

ALTER TABLE ONLY caps_kb ALTER COLUMN id_caps_kb SET DEFAULT nextval('caps_kb_id_caps_kb_seq'::regclass);


--
-- TOC entry 3089 (class 2604 OID 484078)
-- Name: id_caps_spade; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY caps_spade ALTER COLUMN id_caps_spade SET DEFAULT nextval('caps_spade_id_caps_spade_seq'::regclass);


--
-- TOC entry 3088 (class 2604 OID 424577)
-- Name: id_caps_themes; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY caps_themes ALTER COLUMN id_caps_themes SET DEFAULT nextval('caps_themes_id_caps_themes_seq'::regclass);


--
-- TOC entry 3091 (class 2604 OID 484136)
-- Name: id_caps_topic; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY caps_topic ALTER COLUMN id_caps_topic SET DEFAULT nextval('caps_topic_id_caps_topic_seq'::regclass);


--
-- TOC entry 3222 (class 0 OID 484122)
-- Dependencies: 190
-- Data for Name: caps_kb; Type: TABLE DATA; Schema: public; Owner: sfr
--

INSERT INTO caps_kb VALUES (1, 'superficial_crust', 'Superficial Crust', 1, NULL);
INSERT INTO caps_kb VALUES (2, 'water_logging', 'Water Logging', 1, 'Logging is the cutting, skidding, on-site processing, and loading of trees or logs onto trucks[1] or skeleton cars.
In forestry, the term logging is sometimes used in a narrow sense concerning the logistics of moving wood from the stump to somewhere outside the forest, usually a sawmill or a lumber yard. However, in common usage, the term may be used to indicate a range of forestry or silviculture activities.
Illegal logging refers to what in forestry might be called timber theft by the timber mafia.[2][3] It can also refer to the harvesting, transportation, purchase, or sale of timber in violation of laws. The harvesting procedure itself may be illegal, including using corrupt means to gain access to forests; extraction without permission or from a protected area; the cutting of protected species; or the extraction of timber in excess of agreed limits.[4]
Clearcut logging is not necessarily considered a type of logging but a harvesting or silviculture method, and is simply called clearcutting or block cutting. In the forest products industry logging companies may be referred to as logging contractors, with the smaller, non-union crews referred to as "gyppo loggers."');
INSERT INTO caps_kb VALUES (3, 'compaction', 'Compaction', 2, 'aaaaa');


--
-- TOC entry 3233 (class 0 OID 0)
-- Dependencies: 189
-- Name: caps_kb_id_caps_kb_seq; Type: SEQUENCE SET; Schema: public; Owner: sfr
--

SELECT pg_catalog.setval('caps_kb_id_caps_kb_seq', 3, true);


--
-- TOC entry 3220 (class 0 OID 484075)
-- Dependencies: 188
-- Data for Name: caps_spade; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO caps_spade VALUES (5, '2017-05-27', 43.6778045496729277, 10.608673095703125, '{"guid":"764a9662-41c1-05f4-cc3f-20b95cc74e9a","lat":"43.67780454967293","lon":"10.608673095703125","date":"2017-05-27","name":"Pontedera test","step_done":26,"note":"NO, Thanks","fcov":"Arable crop","fslo":"Low slope  (<5%)","pcov":"Mostly the crop","leg":"no","sois":["Superficial crust","Evidence of water logging","Evidence of soil compaction","Cracks"],"wilpla":["PLANTAGO SPP.","TARAXACUM OFFICINALE"],"ressli":"Alternation of easy and hards parts to cut","laynum":2,"laydep":[20,40],"agdim":[3,30],"agshp":["Blocky","Structureless"],"comp":["Medium","Very compact"],"moist":["You can easly break the sample into its aggregates","You cannot break it because the sample is too hard"],"col":[null,null],"typor":[["Manure or compost","Plant residues","Straw","Old roots"],["Old roots"]],"decor":["Intact material (no decomposition, you can easily recognize the original matter)","Intact material (no decomposition, you can easily recognize the original matter)"],"smell":["No smell","No smell"],"rootp":["A lot","Medium"],"rootf":["Medium","No roots"],"roott":"No","earthw":"No","biodivoth":"no","sq":["4","5 (very bad)"]}', '764a9662-41c1-05f4-cc3f-20b95cc74e9a');
INSERT INTO caps_spade VALUES (6, '2017-05-27', 43.6731797292232855, 10.5875641107559204, '{"guid":"e6463dd4-69ad-d4d2-2aef-b3c902b0ee87","lat":"43.673179729223286","lon":"10.58756411075592","date":"2017-05-27","name":"Fornacette - Home sweet home","step_done":26,"note":"","fcov":"Horticoltural crop","fslo":"Low slope  (<5%)","pcov":"Mostly the crop","leg":"no","sois":["Superficial crust","Evidence of soil compaction","Cracks"],"wilpla":["PLANTAGO SPP.","TARAXACUM OFFICINALE"],"ressli":"Alternation of easy and hards parts to cut","laynum":3,"laydep":[5,22,45],"agdim":[2,4,22],"agshp":["Granular (rounded surfaces)","Blocky","Platy"],"comp":["Loose","Compact","Very compact"],"moist":["You can easly break the sample into its aggregates","You can easly break the sample into its aggregates","You cannot break it because the sample is too hard"],"col":[null,null,null],"typor":[["Manure or compost","Plant residues","Old roots"],["Manure or compost","Old roots"],["Old roots"]],"decor":["Intact material (no decomposition, you can easily recognize the original matter)","Intact material (no decomposition, you can easily recognize the original matter)","Intact material (no decomposition, you can easily recognize the original matter)"],"smell":["No smell","No smell","No smell"],"rootp":["A lot","Medium","Medium"],"rootf":["Medium","Medium","No roots"],"roott":"No","earthw":"No","biodivoth":"","sq":["3","4","5 (very bad)"]}', 'e6463dd4-69ad-d4d2-2aef-b3c902b0ee87');
INSERT INTO caps_spade VALUES (16, '2017-05-28', 43.718512413231629, 10.7418823242187518, '{"guid":"b491053f-d84e-7fd8-08e5-fccd304ddc9f","lat":"43.71851241323163","lon":"10.741882324218752","date":"2017-05-28","name":"New","step_done":24,"fcov":"Arable crop","fslo":"Medium slope (6-20%)","pcov":"Mostly the crop","leg":"yes","sois":["Superficial crust","Evidence of water logging"],"wilpla":["STELLARIA MEDIA","VERONICA SPP."],"ressli":"Uniformely hard to cut the soil","laynum":3,"laydep":[13,22,44],"agdim":[3,12,3],"agshp":["Granular (rounded surfaces)","Granular (rounded surfaces)","Platy"],"comp":["Loose","Loose","Medium"],"moist":["You cannot break it because the sample is too hard","You cannot break it because the sample is too hard","You cannot break it because the sample is too hard"],"col":["Ocra-Rusty-Black-White spots","Layers darker than others","Layers darker than others"],"typor":[["Manure or compost"],["Manure or compost"],["Manure or compost"]],"decor":["Intact material (no decomposition, you can easily recognize the original matter)","Intact material (no decomposition, you can easily recognize the original matter)","Intact material (no decomposition, you can easily recognize the original matter)"],"smell":["No smell","Good (woody)","Good (woody)"],"rootp":["Very few","Very few","Medium"],"rootf":["No roots","No roots","No roots"],"roott":"No","earthw":"No","biodivoth":"","sq":["1 (very good)","2","3"]}', 'b491053f-d84e-7fd8-08e5-fccd304ddc9f');
INSERT INTO caps_spade VALUES (17, '2017-05-28', 43.8226382318049801, 10.7727813720703125, '{"guid":"c28e0688-ef62-172e-d0cf-edb024be5a34","lat":"43.82263823180498","lon":"10.772781372070312","date":"2017-05-28","name":"Lagonona","step_done":24,"fcov":"Bare soil","fslo":"Low slope  (<5%)","pcov":"Mostly wild vegetation (weeds)","leg":"no","sois":["Superficial crust"],"wilpla":["URTICA  SPP."],"ressli":"Easy to cut the soil up to the spade depth","laynum":4,"laydep":[10,20,30,45],"agdim":[3,3,3,3],"agshp":["Granular (rounded surfaces)","Crumb (rounded surfaces but larger than granular)","Blocky","Structureless"],"comp":["Loose","Loose","Loose","Loose"],"moist":["The sample does not break because it is plastic","The sample does not break because it is plastic","You can easly break the sample into its aggregates","You cannot break it because the sample is too hard"],"col":["Layers darker than others","Layers darker than others","Layers darker than others","Layers darker than others"],"typor":[["Straw"],["Straw"],["Straw"],["Manure or compost"]],"decor":["Intact material (no decomposition, you can easily recognize the original matter)","Intact material (no decomposition, you can easily recognize the original matter)","Intact material (no decomposition, you can easily recognize the original matter)","Intact material (no decomposition, you can easily recognize the original matter)"],"smell":["No smell","No smell","No smell","No smell"],"rootp":["No roots","No roots","No roots","No roots"],"rootf":["Medium","Medium","Very few","No roots"],"roott":"No","earthw":"No","biodivoth":"","sq":["2","2","3","5 (very bad)"]}', 'c28e0688-ef62-172e-d0cf-edb024be5a34');
INSERT INTO caps_spade VALUES (18, '2017-06-06', 43.6291174376413977, 10.688323974609375, '{"guid":"7f3d2a9f-2313-d8fc-c2d8-27cfb464cf22","lat":"43.6291174376414","lon":"10.688323974609375","date":"2017-06-06","name":"AAA"}', '7f3d2a9f-2313-d8fc-c2d8-27cfb464cf22');
INSERT INTO caps_spade VALUES (19, '2017-06-06', 43.8236290347831527, 10.6951904296875018, '{"guid":"279793ba-c8fe-b784-3826-98dea90f0ec3","lat":"43.82362903478315","lon":"10.695190429687502","date":"2017-06-06","name":"A"}', '279793ba-c8fe-b784-3826-98dea90f0ec3');
INSERT INTO caps_spade VALUES (20, '2017-06-06', 43.7562169741805178, 10.5276489257812518, '{"guid":"8511a4bd-479f-93c4-f459-68f8d36b098a","lat":"43.75621697418052","lon":"10.527648925781252","date":"2017-06-06","name":"11"}', '8511a4bd-479f-93c4-f459-68f8d36b098a');
INSERT INTO caps_spade VALUES (21, '2017-06-06', 43.7829926289058093, 10.6210327148437518, '{"guid":"8e10716f-ca09-a979-9505-36a545d63423","lat":"43.78299262890581","lon":"10.621032714843752","date":"2017-06-06","name":"AA"}', '8e10716f-ca09-a979-9505-36a545d63423');
INSERT INTO caps_spade VALUES (22, '2017-06-06', 43.753241161520009, 10.6814575195312518, '{"guid":"d6c7728d-449d-7b3d-14e6-2e83fa91020b","lat":"43.75324116152001","lon":"10.681457519531252","date":"2017-06-06","name":"A"}', 'd6c7728d-449d-7b3d-14e6-2e83fa91020b');
INSERT INTO caps_spade VALUES (23, '2017-06-06', 43.7284369679607039, 10.7872009277343768, '{"guid":"b86dd285-a620-6036-44f8-68e7aaf746cb","lat":"43.728436967960704","lon":"10.787200927734377","date":"2017-06-06","name":"A"}', 'b86dd285-a620-6036-44f8-68e7aaf746cb');
INSERT INTO caps_spade VALUES (24, '2017-06-06', 43.7214899522858431, 10.7006835937500018, '{"guid":"c1f884e6-e383-de97-966c-512d4d8572aa","lat":"43.72148995228584","lon":"10.700683593750002","date":"2017-06-06","name":"AA"}', 'c1f884e6-e383-de97-966c-512d4d8572aa');
INSERT INTO caps_spade VALUES (25, '2017-06-06', 43.6380629275348326, 10.7947540283203143, '{"guid":"3cb4d4ea-f9a8-413b-5b1e-fdb69168db8d","lat":"43.63806292753483","lon":"10.794754028320314","date":"2017-06-06","name":"A"}', '3cb4d4ea-f9a8-413b-5b1e-fdb69168db8d');


--
-- TOC entry 3234 (class 0 OID 0)
-- Dependencies: 187
-- Name: caps_spade_id_caps_spade_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('caps_spade_id_caps_spade_seq', 25, true);


--
-- TOC entry 3218 (class 0 OID 424574)
-- Dependencies: 186
-- Data for Name: caps_themes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO caps_themes VALUES (4, 'Compaction
', 'compaction.tif', 3);
INSERT INTO caps_themes VALUES (5, 'Erosion
', 'erosion.tif', 4);
INSERT INTO caps_themes VALUES (7, 'Pollution', 'industrial_pollution.tif', 5);
INSERT INTO caps_themes VALUES (2, 'Organic matter decline
', 'organic_matter_decline.tif', 6);
INSERT INTO caps_themes VALUES (3, 'Salinisation
', 'salinity.tif', 7);


--
-- TOC entry 3235 (class 0 OID 0)
-- Dependencies: 185
-- Name: caps_themes_id_caps_themes_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('caps_themes_id_caps_themes_seq', 7, true);


--
-- TOC entry 3224 (class 0 OID 484133)
-- Dependencies: 192
-- Data for Name: caps_topic; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO caps_topic VALUES (1, 'surface', 'Soil surface observation', 0);
INSERT INTO caps_topic VALUES (2, 'structure', 'Soil structure observation', 0);
INSERT INTO caps_topic VALUES (3, 'fertility', 'Chemical, physical and biological fertility', 0);
INSERT INTO caps_topic VALUES (4, 'irrigation', 'Soil condition and irrigation', 0);
INSERT INTO caps_topic VALUES (5, 'lavoration', 'Soil condition and mechanical operations', 0);


--
-- TOC entry 3236 (class 0 OID 0)
-- Dependencies: 191
-- Name: caps_topic_id_caps_topic_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('caps_topic_id_caps_topic_seq', 5, true);


--
-- TOC entry 3100 (class 2606 OID 484130)
-- Name: caps_kb_pkey; Type: CONSTRAINT; Schema: public; Owner: sfr; Tablespace: 
--

ALTER TABLE ONLY caps_kb
    ADD CONSTRAINT caps_kb_pkey PRIMARY KEY (id_caps_kb);


--
-- TOC entry 3096 (class 2606 OID 484085)
-- Name: caps_spade_guid_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY caps_spade
    ADD CONSTRAINT caps_spade_guid_key UNIQUE (guid);


--
-- TOC entry 3102 (class 2606 OID 484141)
-- Name: caps_topic_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY caps_topic
    ADD CONSTRAINT caps_topic_pkey PRIMARY KEY (id_caps_topic);


--
-- TOC entry 3098 (class 2606 OID 484083)
-- Name: id_caps_spade_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY caps_spade
    ADD CONSTRAINT id_caps_spade_pk PRIMARY KEY (id_caps_spade);


--
-- TOC entry 3094 (class 2606 OID 424582)
-- Name: id_caps_themes_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY caps_themes
    ADD CONSTRAINT id_caps_themes_pk PRIMARY KEY (id_caps_themes);


-- Completed on 2017-06-06 21:00:25 CEST

--
-- PostgreSQL database dump complete
--

