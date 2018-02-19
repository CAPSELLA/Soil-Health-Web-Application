
--

CREATE TABLE caps_spade (
    id_caps_spade serial NOT NULL,
    date_mon date,
    lat double precision,
    lon double precision,
    json json,
    guid character varying
);



INSERT INTO caps_spade VALUES (5, '2017-05-27', 43.6778045496729277, 10.608673095703125, '{"guid":"764a9662-41c1-05f4-cc3f-20b95cc74e9a","lat":"43.67780454967293","lon":"10.608673095703125","date":"2017-05-27","name":"Pontedera test","step_done":26,"note":"NO, Thanks","fcov":"Arable crop","fslo":"Low slope  (<5%)","pcov":"Mostly the crop","leg":"no","sois":["Superficial crust","Evidence of water logging","Evidence of soil compaction","Cracks"],"wilpla":["PLANTAGO SPP.","TARAXACUM OFFICINALE"],"ressli":"Alternation of easy and hards parts to cut","laynum":2,"laydep":[20,40],"agdim":[3,30],"agshp":["Blocky","Structureless"],"comp":["Medium","Very compact"],"moist":["You can easly break the sample into its aggregates","You cannot break it because the sample is too hard"],"col":[null,null],"typor":[["Manure or compost","Plant residues","Straw","Old roots"],["Old roots"]],"decor":["Intact material (no decomposition, you can easily recognize the original matter)","Intact material (no decomposition, you can easily recognize the original matter)"],"smell":["No smell","No smell"],"rootp":["A lot","Medium"],"rootf":["Medium","No roots"],"roott":"No","earthw":"No","biodivoth":"no","sq":["4","5 (very bad)"]}', '764a9662-41c1-05f4-cc3f-20b95cc74e9a');
INSERT INTO caps_spade VALUES (6, '2017-05-27', 43.6731797292232855, 10.5875641107559204, '{"guid":"e6463dd4-69ad-d4d2-2aef-b3c902b0ee87","lat":"43.673179729223286","lon":"10.58756411075592","date":"2017-05-27","name":"Fornacette - Home sweet home","step_done":26,"note":"","fcov":"Horticoltural crop","fslo":"Low slope  (<5%)","pcov":"Mostly the crop","leg":"no","sois":["Superficial crust","Evidence of soil compaction","Cracks"],"wilpla":["PLANTAGO SPP.","TARAXACUM OFFICINALE"],"ressli":"Alternation of easy and hards parts to cut","laynum":3,"laydep":[5,22,45],"agdim":[2,4,22],"agshp":["Granular (rounded surfaces)","Blocky","Platy"],"comp":["Loose","Compact","Very compact"],"moist":["You can easly break the sample into its aggregates","You can easly break the sample into its aggregates","You cannot break it because the sample is too hard"],"col":[null,null,null],"typor":[["Manure or compost","Plant residues","Old roots"],["Manure or compost","Old roots"],["Old roots"]],"decor":["Intact material (no decomposition, you can easily recognize the original matter)","Intact material (no decomposition, you can easily recognize the original matter)","Intact material (no decomposition, you can easily recognize the original matter)"],"smell":["No smell","No smell","No smell"],"rootp":["A lot","Medium","Medium"],"rootf":["Medium","Medium","No roots"],"roott":"No","earthw":"No","biodivoth":"","sq":["3","4","5 (very bad)"]}', 'e6463dd4-69ad-d4d2-2aef-b3c902b0ee87');
INSERT INTO caps_spade VALUES (16, '2017-05-28', 43.718512413231629, 10.7418823242187518, '{"guid":"b491053f-d84e-7fd8-08e5-fccd304ddc9f","lat":"43.71851241323163","lon":"10.741882324218752","date":"2017-05-28","name":"New","step_done":24,"fcov":"Arable crop","fslo":"Medium slope (6-20%)","pcov":"Mostly the crop","leg":"yes","sois":["Superficial crust","Evidence of water logging"],"wilpla":["STELLARIA MEDIA","VERONICA SPP."],"ressli":"Uniformely hard to cut the soil","laynum":3,"laydep":[13,22,44],"agdim":[3,12,3],"agshp":["Granular (rounded surfaces)","Granular (rounded surfaces)","Platy"],"comp":["Loose","Loose","Medium"],"moist":["You cannot break it because the sample is too hard","You cannot break it because the sample is too hard","You cannot break it because the sample is too hard"],"col":["Ocra-Rusty-Black-White spots","Layers darker than others","Layers darker than others"],"typor":[["Manure or compost"],["Manure or compost"],["Manure or compost"]],"decor":["Intact material (no decomposition, you can easily recognize the original matter)","Intact material (no decomposition, you can easily recognize the original matter)","Intact material (no decomposition, you can easily recognize the original matter)"],"smell":["No smell","Good (woody)","Good (woody)"],"rootp":["Very few","Very few","Medium"],"rootf":["No roots","No roots","No roots"],"roott":"No","earthw":"No","biodivoth":"","sq":["1 (very good)","2","3"]}', 'b491053f-d84e-7fd8-08e5-fccd304ddc9f');
INSERT INTO caps_spade VALUES (17, '2017-05-28', 43.8226382318049801, 10.7727813720703125, '{"guid":"c28e0688-ef62-172e-d0cf-edb024be5a34","lat":"43.82263823180498","lon":"10.772781372070312","date":"2017-05-28","name":"Lagonona","step_done":24,"fcov":"Bare soil","fslo":"Low slope  (<5%)","pcov":"Mostly wild vegetation (weeds)","leg":"no","sois":["Superficial crust"],"wilpla":["URTICA  SPP."],"ressli":"Easy to cut the soil up to the spade depth","laynum":4,"laydep":[10,20,30,45],"agdim":[3,3,3,3],"agshp":["Granular (rounded surfaces)","Crumb (rounded surfaces but larger than granular)","Blocky","Structureless"],"comp":["Loose","Loose","Loose","Loose"],"moist":["The sample does not break because it is plastic","The sample does not break because it is plastic","You can easly break the sample into its aggregates","You cannot break it because the sample is too hard"],"col":["Layers darker than others","Layers darker than others","Layers darker than others","Layers darker than others"],"typor":[["Straw"],["Straw"],["Straw"],["Manure or compost"]],"decor":["Intact material (no decomposition, you can easily recognize the original matter)","Intact material (no decomposition, you can easily recognize the original matter)","Intact material (no decomposition, you can easily recognize the original matter)","Intact material (no decomposition, you can easily recognize the original matter)"],"smell":["No smell","No smell","No smell","No smell"],"rootp":["No roots","No roots","No roots","No roots"],"rootf":["Medium","Medium","Very few","No roots"],"roott":"No","earthw":"No","biodivoth":"","sq":["2","2","3","5 (very bad)"]}', 'c28e0688-ef62-172e-d0cf-edb024be5a34');


SELECT pg_catalog.setval('caps_spade_id_caps_spade_seq', 17, true);


ALTER TABLE ONLY caps_spade
    ADD CONSTRAINT caps_spade_guid_key UNIQUE (guid);


ALTER TABLE ONLY caps_spade
    ADD CONSTRAINT id_caps_spade_pk PRIMARY KEY (id_caps_spade);


CREATE TABLE caps_image
(
  id_caps_image serial NOT NULL,
  guid character varying,
  base64 text,
  CONSTRAINT id_caps_image_pk PRIMARY KEY (id_caps_image),
  CONSTRAINT caps_image_guid_key UNIQUE (guid)
);



-- improve data management 2018-02-17

CREATE TABLE dbmng_users_register
(
  mail character varying(254),
  pass character varying(254),
  token character varying(254,
  time_ref timestamp without time zone DEFAULT now(),
  used integer DEFAULT 0,
  CONSTRAINT dbmng_users_register_mail UNIQUE (mail)
);



ALTER TABLE caps_spade ADD COLUMN uid integer;
ALTER TABLE caps_spade ALTER COLUMN uid SET DEFAULT 0;
