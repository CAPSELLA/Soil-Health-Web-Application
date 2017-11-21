var spade_question;

function init_spade_question(){
  spade_question=[
	{
      "code": "FSlo",
      "Title": "Field  slope",
      "question": "What is the slope of the field?",
      "data_type": "select",
      "help": "spade_test_info_start",
      "how_many": "once",
      "Importance": "medium",
      "condition": "",
      "order": 5,
      "answers":[
        {
           //"answer": "Flat",
           "answer_code": "flat",
           "score": 0,
           "image": "graphyc_design",
           "link": "no",
           "question_code": "FSlo"
         },
        {
           //"answer": "Low slope (<5%)",
           "answer_code": "low",
           "score": 0,
           "image": "graphyc_design",
           "link": "no",
           "question_code": "FSlo"
         },
         {
           //"answer": "Medium slope (6-20%)",
           "answer_code": "medium",
		   "score": 0,
           "image": "graphyc_design",
           "link": "no",
           "question_code": "FSlo"
         },
         {
           //"answer": "High slope (21-60%)",
		   "answer_code": "high",
           "score": 0,
           "image": "graphyc_design",
           "link": "no",
           "question_code": "FSlo"
         },
         {
           //"answer": "Very high slope (>60%)",
		   		   "answer_code": "very_high",
           "score": 0,
           "image": "graphyc_design",
           "link": "no",
           "question_code": "FSlo"
         }
      ]
    },
	{
      "code": "FCov",
      "question": "What is the field cover for the most part?",
      "data_type": "select",
      "help":"no" ,
      "how_many": "once",
      "answers":[
        {
          // "answer": "Bare soil",
          "answer_code": "bare_soil",
          "score": 0
        },
        {
          // "answer": "Arable crop",
          "answer_code": "arable",
          "score": 0
        },
        {
          // "answer": "Horticoltural crop",
          "answer_code": "horticolture",
          "score": 0,
        },
        {
          //"answer": "Tree crop",
          "answer_code": "tree_crop",
          "score": 0,
        },
        {
          //"answer": "Forest",
          "answer_code": "forest",
          "score": 0,
          "image": "Easy",
          "link": "no",
          "question_code": "FCov"
        },
        {
          //"answer": "Grassland",
		  "answer_code": "grassland",
          "score": 0,
          "image": "Easy",
          "link": "no",
          "question_code": "FCov"
        }
      ]
    },
    {
      "code": "PCov",
      "Title": "Point cover",
      "question": "What does your sample area contain?",
      "data_type": "select",
      "help": "no",
      "how_many": "once",
      "Importance": "medium",
      "condition": "",
      "order": 6,
      "answers":[
        {
          //"answer": "Mostly the crop",
		  "answer_code": "crop",
          "score": 0,
          "image": "Easy",
          "link": "no",
          "question_code": "PCov"
        },
        {
          //"answer": "Mostly wild vegetation (weeds)",
		  "answer_code": "weeds",
          "score": 0,
          "image": "Easy",
          "link": "no",
          "question_code": "PCov"
        },
        {
          //"answer": "Mostly bare soil",
		  "answer_code": "soil",
          "score": 0,
          "image": "Easy",
          "link": "no",
          "question_code": "PCov"
        }
      ]
    },
    {
      "code": "Leg",
      "Title": "Legume presence",
      "question": "Are you sampling a soil with a legume?",
      "data_type": "boolean",
      "help": "no",
      "how_many": "once",
      "Importance": "medium",
      "condition": "",
      "order": 7
    },
    {
      "code": "SOIS",
      "Title": "Soil surface",
      "question": "What do you see on the soil surface?",
      "data_type": "select_multi",
      "help": "sois_info",
      "how_many": "once",
      "Importance": "mandatory",
      "condition": "",
      "images": true,
      "mandatory": false,
      "order": 8,
      "answers":[
        {
          //"answer": "Superficial crust",
		  "answer_code": "crust",
          "score": 0.8,
          "image": "/SOIS/15.jpeg",
          "link": "http://soilhealth.capsella.eu/sois/superficial_crust/",
          "question_code": "SOIS"
        },
        {
          //"answer": "Evidence of water logging",
		  "answer_code": "logging",
          "score": -1,
          "image": "/SOIS/16.jpeg",
          "link": "http://soilhealth.capsella.eu/sois/water_logging/",
          "question_code": "SOIS"
        },
        {
          //"answer": "Evidence of erosion",
		"answer_code": "erosion",
          "score": -2,
          "image": "/SOIS/17.jpeg",
          "link": "http://soilhealth.capsella.eu/sois/erosion/",
          "question_code": "SOIS"
        },
        {
          //"answer": "Evidence of soil compaction",
		  "answer_code": "compaction",
          "score": -1,
          "image": "/SOIS/18.jpeg",
          "link": "http://soilhealth.capsella.eu/sois/compaction/",
          "question_code": "SOIS"
        },
        {
          //"answer": "Growth of algae",
		  "answer_code": "algae",
          "score": -0.5,
          "image": "/SOIS/19.jpeg",
          "link": "http://soilhealth.capsella.eu/sois/algae/",
          "question_code": "SOIS"
        },
        {
          //"answer": "Cracks",
		  "answer_code": "cracks",
          "score": -1,
          "image": "/SOIS/20.jpeg",
          "link": "link- Presence of cracks on soil surface",
          "question_code": "SOIS"
        }
      ]
    },
    {
      "code": "WILPLA",
      "Title": "Wild plants",
      "question": "Do you see plenty of these wildplants at the sampling point?",
      "data_type": "select_multi",
      "help": "wilpla_info",
      "how_many": "once",
      "images": true,
      "Importance": "low",
      "mandatory": false,
      "condition": "",
      "order": 9,
      "answers":[
        {
          //"answer": "URTICA SPP.",
		  "answer_code": "urtica",
          "score": 0.3,
          "image": "/WILPLA/ortica.JPG",
          "link": "link- N availability",
          "question_code": "WILPLA"
        },
        {
          //"answer": "STELLARIA MEDIA",
		  "answer_code": "stellaria",
          "score": 0.3,
          "image": "/WILPLA/stellaria.JPG",
          "link": "link- Good soil structure",
          "question_code": "WILPLA"
        },
        {
          //"answer": "VERONICA SPP.",
		  "answer_code": "veronica",
          "score": 0.3,
          "image": "/WILPLA/veronica.JPG",
          "link": "link- Good soil structure",
          "question_code": "WILPLA"
        },
        {
          //"answer": "GALINSOGA PARVIFLORA",
		  "answer_code": "galinsoga",
          "score": 0.3,
          "image": "/WILPLA/galisoga.JPG",
          "link": "link- Good soil structure",
          "question_code": "WILPLA"
        },
        {
          //"answer": "POA ANNUA",
		  "answer_code": "poa",
          "score": -0.3,
          "image": "/WILPLA/poa_annua.JPG",
          "link": "link- Superficial crust and/or soil compaction",
          "question_code": "WILPLA"
        },
        {
          //"answer": "ACALYPHA VIRGINICA",
		  "answer_code": "acalypha",
          "score": -0.3,
          "image": "/WILPLA/acalifa.JPG",
          "link": "link- Superficial crust and/or soil compaction",
          "question_code": "WILPLA"
        },
        {
          //"answer": "ECHINOCHLOA CRUS-GALLI",
		  "answer_code": "echinochloa",
          "score": -0.3,
          "image": "/WILPLA/giavone.JPG",
          "link": "link- crust, compaction, water logging",
          "question_code": "WILPLA"
        },
        {
          //"answer": "POLYGONUM AVICULARE",
		  "answer_code": "polygonum",
          "score": -0.3,
          "image": "/WILPLA/polygonum_aviculare.JPG",
          "link": "link- Superficial crust and/or soil compaction",
          "question_code": "WILPLA"
        },
        {
          //"answer": "MATRICARIA CHAMOMILLA",
		  "answer_code": "matricaria",
          "score": -0.3,
          "image": "/WILPLA/camomilla.JPG",
          "link": "link- Superficial crust and/or soil compaction",
          "question_code": "WILPLA"
        },
        {
          //"answer": "CAPSELLA BURSA-PASTORIS",
		  "answer_code": "capsella",
          "score": 0.3,
          "image": "/WILPLA/capsella.JPG",
          "link": "link- N availability",
          "question_code": "WILPLA"
        },
        {
          //"answer": "PLANTAGO SPP.",
		  "answer_code": "plantago",
          "score": -0.3,
          "image": "/WILPLA/piantaggine.JPG",
          "link": "link- Soil compaction",
          "question_code": "WILPLA"
        },
        {
          //"answer": "TARAXACUM OFFICINALE",
		  "answer_code": "taraxacum",
          "score": -0.3,
          "image": "/WILPLA/tarassaco.JPG",
          "link": "link- Soil compaction",
          "question_code": "WILPLA"
        }
      ]
    },
    {
      "code": "INFO_SAMPLE",
      "Title": "How to take a sample",
      "question": "How to take a sample",
      "data_type": "info",
      "help": "info_sample_help",
      "how_many": "",
      "Importance": "",
      "condition": "",
      "order": 10
    },
    {
      "code": "RESSLI",
      "Title": "Soil cut",
      "question": "How does the soil resist to the spade cut?",
      "data_type": "select",
      "help": "ressli_info",
      "how_many": "once",
      "Importance": "medium",
      "condition": "",
      "order": 11,
      "answers":[
        {
          //"answer": "Easy to cut the soil up to the spade depth",
          "answer_code": "easy",
		  "score": 1,
          "image": "/RESSLI/low_res.jpeg",
          "link": "link- Good soil structure",
          "question_code": "RESSLI"
        },
        {
          //"answer": "Uniformely hard to cut the soil",
          "answer_code": "hard_uniform",
		  "score": -1,
          "image": "graphyc_design",
          "link": "link- Soil compaction",
          "question_code": "RESSLI"
        },
        {
          //"answer": "Alternation of easy and hards parts to cut",
          "answer_code": "hard_alternation",
		  "score": -1,
          "image": "graphyc_design",
          "link": "link- Soil compaction",
          "question_code": "RESSLI"
        }
      ]
    },
    // {
    //   "code": "IMG",
    //   "Title": "Take a picture",
    //   "question": "Take a picture",
    //   "data_type": "image",
    //   "help": "Have you taken the samples? Please take a picture of the soil and update it?",
    //   "how_many": "once",
    //   "Importance": "high",
    //   "condition": "",
    //   "order": 12
    // },
    {
      "code": "SText",
      "Title": "Soil texture",
      "question": "How is the soil texture in the observation point?",
      "data_type": "select",
      "help": "no",
      "how_many": "once",
      "Importance": "medium",
      "condition": "",
      "order": 6,
      "answers":[
        {
		  "answer_code": "sand",
          "score": 0,
          "image": "Easy",
          "link": "no",
          "question_code": "SText"
        },
        {
		  "answer_code": "av_text",
          "score": 0,
          "image": "Easy",
          "link": "no",
          "question_code": "SText"
        },
        {
		  "answer_code": "clay",
          "score": 0,
          "image": "Easy",
          "link": "no",
          "question_code": "SText"
        }
      ]
    },
	{
      "code": "LAYNUM",
      "Title": "Layers number",
      "question": "Insert the layer number",
      "data_type": "integer",
      "help": "laynum_info",
      "placeholder": "Insert the layer number",
      "how_many": "once",
      "Importance": "mandatory",
      "condition": "",
      "order": 13
    },
    {
      "code": "LAYDEP",
      "Title": "Layers depth",
      "question": "How deep are the layers in cm?",
      "placeholder": "Average depth from soil surface",
      "data_type": "integer",
      "help": "laydep_info",
      "how_many": "by_layer",
      "Importance": "mandatory",
      "condition": "",
      "order": 14
    },
	{
      "code": "AGSHP",
      "Title": "Aggregates shape",
      "question": "What is the shape of the soil aggregates?",
      "data_type": "select",
      "help": "agshp_info",
      "how_many": "by_layer",
      "Importance": "mandatory",
      "condition": "",
      "images": true,
      "order": 16,
      "answers":[
        {
          //"answer": "Granular (rounded surfaces)",
          "answer_code": "granular",
		  "score": 2,
          "image": "/AGSHP/Granular.jpeg",
          "link": "link- Good soil structure",
          "question_code": "AGSHP"
        },
        {
          //"answer": "Crumb (rounded surfaces but larger than granular)",
          "answer_code": "crumb",
		  "score": 1,
          "image": "/AGSHP/Crumb.jpeg",
          "link": "link- Good soil structure",
          "question_code": "AGSHP"
        },
        {
          //"answer": "Blocky Small",
		  "answer_code": "blocky_small",
          "score": 0,
          "image": "/AGSHP/blocky_small.jpeg",
          "link": "link- Soil compaction",
          "question_code": "AGSHP"
        },
        {
          //"answer": "Blocky large",
		  "answer_code": "blocky_large",
          "score": 0,
          "image": "/AGSHP/blocky_large_ok.jpeg",
          "link": "link- Soil compaction",
          "question_code": "AGSHP"
        },
        {
          //"answer": "Subangular blocky small",
          "answer_code": "sub_blocky_small",
		  "score": 0.3,
          "image": "/AGSHP/sub_blocky_small.jpeg",
          "link": "link- Soil compaction",
          "question_code": "AGSHP"
        },
        {
          //"answer": "Subangular blocky large",
		  "answer_code": "sub_blocky_large",
          "score": 0.3,
          "image": "/AGSHP/sub_blocky_large.jpeg",
          "link": "link- Soil compaction",
          "question_code": "AGSHP"
        },
        {
          //"answer": "Platy",
		  "answer_code": "platy",
          "score": -2,
          "image": "/AGSHP/Platy.jpeg",
          "link": "link- Soil compaction",
          "question_code": "AGSHP"
        },
        {
          //"answer": "Structureless",
		  "answer_code": "structureless",
          "score": -2,
          "image": "/AGSHP/Structureless.jpeg",
          "link": "link- Lack of structure",
          "question_code": "AGSHP"
        }
      ]
    },
    {
      "code": "AGDIM",
      "Title": "Aggregates dimension",
      "question": "What is the most frequent dimension of the aggregate in mm?",
      "data_type": "integer",
      "placeholder": "average dimension in mm",
      "help": "agdim_info",
      "how_many": "by_layer",
      "Importance": "mandatory",
      "condition": "",
      "order": 15
    },
    {
      "code": "COMP",
      "Title": "Soil compaction",
      "question": "How compact is the soil layer?",
      "data_type": "select",
      "help": "comp_info",
      "how_many": "by_layer",
      "Importance": "mandatory",
      "condition": "",
      "order": 17,
      "answers":[
        {
          //"answer": "Loose",
		  "answer_code": "loose",
          "score": 2,
          "image": "graphyc_design",
          "link": "link- Good soil structure",
          "question_code": "COMP"
        },
        {
          //"answer": "Lightly Compacted",
		  "answer_code": "lightly_compacted",
          "score": -1,
          "image": "graphyc_design",
          "link": "link- Soil compaction",
          "question_code": "COMP"
        },
        {
          //"answer": "Very compacted",
          "answer_code": "very_compacted",
		  "score": -2,
          "image": "graphyc_design",
          "link": "link- Soil compaction",
          "question_code": "COMP"
        }
      ]
    },
    {
      "code": "MOIST2",
      "Title": "Soil moisture",
      "question": "How wet is the soil?",
      "data_type": "select",
      "help": "moist_info",
      "how_many": "by_layer",
      "Importance": "mandatory",
      "condition": "",
      "images": true,
      "order": 18,
      "answers":[
        {
          "answer_code": "sand_dry",
		  "score": -1,
          "image": "/MOIST2/sand_dry.jpg",
          "link": "link1- Info on soil operations (you cannot use machines on the soil); link2-Info on irrigation (you should consider the irrigation)",
          "question_code": "MOIST2"
        },
		 {
          //"answer": "You can easly break the sample into its aggregates",
          "answer_code": "sand_moist",
		  "score": 1,
          "image": "/MOIST2/sand_moist.jpg",
          "link": "link1 - Info on soil operations (you can  use machines on the soil); link2- Info on irrigation (Irrigation is  needed)",
          "question_code": "MOIST2"
        },
        {
          //"answer": "The sample does not break because it is plastic",
          "answer_code": "sand_wet",
		  "score": -0.5,
          "image": "/MOIST2/sand_wet.jpg",
          "link": "link1 - Info on soil operations (you cannot use machines on the soil); link2- Info on irrigation (Irrigation is not needed)",
          "question_code": "MOIST2"
        },
       
		{
          "answer_code": "av_text_dry",
		  "score": -1,
          "image": "/MOIST2/av_text_dry.jpg",
          "link": "link1- Info on soil operations (you cannot use machines on the soil); link2-Info on irrigation (you should consider the irrigation)",
          "question_code": "MOIST2"
        },
		{
          //"answer": "You can easly break the sample into its aggregates",
          "answer_code": "av_text_moist",
		  "score": 1,
          "image": "/MOIST2/sand_moist.jpg",
          "link": "link1 - Info on soil operations (you can  use machines on the soil); link2- Info on irrigation (Irrigation is  needed)",
          "question_code": "MOIST2"
        },
        {
          //"answer": "The sample does not break because it is plastic",
          "answer_code": "av_text_wet",
		  "score": -0.5,
          "image": "/MOIST3/av_text_wet.jpg",
          "link": "link1 - Info on soil operations (you cannot use machines on the soil); link2- Info on irrigation (Irrigation is not needed)",
          "question_code": "MOIST2"
        },
		{
          "answer_code": "clay_dry",
		  "score": -1,
          "image": "/MOIST2/clay_dry.jpg",
          "link": "link1- Info on soil operations (you cannot use machines on the soil); link2-Info on irrigation (you should consider the irrigation)",
          "question_code": "MOIST2"
        },
		{
          //"answer": "You can easly break the sample into its aggregates",
          "answer_code": "clay_moist",
		  "score": 1,
          "image": "/MOIST2/clay_moist.jpg",
          "link": "link1 - Info on soil operations (you can  use machines on the soil); link2- Info on irrigation (Irrigation is  needed)",
          "question_code": "MOIST2"
        },
        {
          //"answer": "The sample does not break because it is plastic",
          "answer_code": "clay_wet",
		  "score": -0.5,
          "image": "/MOIST2/clay_wet.jpg",
          "link": "link1 - Info on soil operations (you cannot use machines on the soil); link2- Info on irrigation (Irrigation is not needed)",
          "question_code": "MOIST2"
        },  
      ]
    },
    {
      "code": "COL",
      "Title": "Soil color",
      "question": "Looking at the soil color, do you see any of these signs?",
      "data_type": "select_multi",
      "help": "col_info",
      "how_many": "by_layer",
      "Importance": "medium",
      "images": true,
      "mandatory": false,
      "condition": "",
      "order": 19,
      "answers":[
        {
          //"answer": "Ocra-Rusty-Black-White spots",
          "answer_code": "ocra",
		  "score": -0.5,
          "image": "/COL/52.jpeg",
          "link": "link -  Water logging (periodic)",
          "question_code": "COL"
        },
        {
          //"answer": "Grey-Green-Blue",
		  "answer_code": "grey",
          "score": -1,
          "image": "/COL/53.JPG",
          "link": "link -  Water logging (sign of long period of water logging)",
          "question_code": "COL"
        },
      ]
    },
    {
      "code": "TYPOR",
      "Title": "Type of organic residues",
      "question": "What type of organic residues are present?",
      "data_type": "select_multi",
      "help": "no",
      "how_many": "by_layer",
      "Importance": "medium",
      "condition": "",
      "images":true,
      "mandatory":true,
      "order": 20,
      "answers":[
        {
         //"answer": "No residues",
		 "answer_code": "no_residues",
         "score": 0,
         "image": "/TYPOR/no_or.jpg",
         "link": "no",
         "question_code": "TYPOR"
       },
        {
         //"answer": "Manure or compost",
         "answer_code": "manure",
		 "score": 0,
         "image": "/TYPOR/55.JPG",
         "link": "no",
         "question_code": "TYPOR"
       },
       {
         //"answer": "Plant residues",
         "answer_code": "residues",
		 "score": 0,
         "image": "/TYPOR/56.JPG",
         "link": "no",
         "question_code": "TYPOR"
       },
       {
         //"answer": "Straw",
         "answer_code": "straw",
		 "score": 0,
         "image": "/TYPOR/stoppie.jpg",
         "link": "",
         "question_code": "TYPOR"
       },
       {
         //"answer": "Old roots",
         "answer_code": "roots",
		 "score": 0,
         "image": "/TYPOR/58.JPG",
         "link": "no",
         "question_code": "TYPOR"
       }
      ]
    },
    {
      "code": "DECOR",
      "Title": "Decay of organic residue",
      "question": "How much decomposed are the residues?",
      "data_type": "select",
      "check_question": true,
      "help": "no",
      "how_many": "by_layer",
      "Importance": "mandatory",
      "condition": "",
      "images": true,
      "order": 21,
      "answers":[
        {
          //"answer": "Intact material (no decomposition, you can easily recognize the original matter)",
          "answer_code": "intact",
		  "score": -1,
          "image": "/DECOR/intact.jpg",
          "link": "link- Organic matter decomposition in the soil",
          "question_code": "DECOR"
        },
        {
          //"answer": "Medium decomposed (you can hardly recognize the original matter)",
          "answer_code": "medium_decomposed",
		  "score": 0.5,
          "image": "/DECOR/average.jpg",
          "link": "link- Organic matter decomposition in the soil",
          "question_code": "DECOR"
        },
        {
          //"answer": "Well decomposed (you cannot recognize the original matter anymore)",
          "answer_code": "well_decomposed",
		  "score": 1,
          "image": "/DECOR/decomposed.jpg",
          "link": "link- Organic matter decomposition in the soil",
          "question_code": "DECOR"
        }
      ]
    },
    {
      "code": "SMELL",
      "Title": "Soil smell",
      "question": "How does the soil smell?",
      "data_type": "select",
      "help": "no",
      "how_many": "by_layer",
      "Importance": "mandatory",
      "condition": "",
      "order": 22,
      "answers":[
        {
         //"answer": "No smell",
         "answer_code": "no_smell",
		 "score": 0,
         "image": "NO",
         "link": "no",
         "question_code": "SMELL"
       },
       {
         //"answer": "Good (woody)",
         "answer_code": "good_smell",
		 "score": 1,
         "image": "NO",
         "link": "link-Soil smell",
         "question_code": "SMELL"
       },
       {
         //"answer": "Bad (rotten)",
         "answer_code": "bad_smell",
		 "score": -1,
         "image": "NO",
         "link": "link-Soil smell",
         "question_code": "SMELL"
       }
      ]
    },
    {
      "code": "ROOTP",
      "Title": "presence of roots",
      "question": "Do you see roots?",
      "data_type": "select",
      "help": "no",
      "how_many": "by_layer",
      "Importance": "mandatory",
      "images": true,
      "condition": "visible only if PCov ! from \"Mostly bare soil",
      "order": 23,
      "answers":[
        {
          //"answer": "No roots",
          "answer_code": "no_roots",
          "score": -1,
          "image": "/ROOTP/no_root.jpeg",
           "link": "link-Root growth",
           "question_code": "ROOTP"
         },
         {
           //"answer": "Very few roots",
           "answer_code": "few_roots",
	         "score": -0.5,
           "link": "link-Root growth",
           "question_code": "ROOTP",
           "image": "/ROOTP/few.jpeg",
         },
         {
           //"answer": "A lot of roots",
           "answer_code": "lot_roots",
           "score": 1,
           "image": "/ROOTP/lot.jpeg",
           "link": "link-Root growth",
           "question_code": "ROOTP"
         }
      ]
    },
    {
      "code": "ROOTT",
      "Title": "presence of tubercle",
      "question": "Do you see legume tubercles?",
      "data_type": "select",
      "check_question": true,
      "help": "roott_info",
      "how_many": "by_layer",
      "Importance": "medium",
      "condition": "visible only if Leg=yes",
      "order": 25,
      "answers":[
        {
         //"answer": "No",
         "answer_code": "no_nodules",
         "score": -1,
         "image": "NO",
         "link": "link- Soil oxigenation",
         "question_code": "ROOTT"
       },
       {
         //"answer": "yes, a few",
         "answer_code": "yes_few",
		 "score": -0.5,
         "image": "Todo",
         "link": "link- Soil oxigenation",
         "question_code": "ROOTT"
       },
       {
         //"answer": "yes, many",
         "answer_code": "yes_many",
		 "score": 1,
         "image": "Todo",
         "link": "link- Soil oxigenation",
         "question_code": "ROOTT"
       },
       {
         //"answer": "Yes, but not red if opened",
         "answer_code": "yes_not_red",
		 "score": 1,
         "image": "Todo",
         "link": "link- N availability",
         "question_code": "ROOTT"
       }
      ]
    },
    {
      "code": "EARTHW",
      "Title": "presence earthworms",
      "question": "Do you see signs of earthworms presence?",
      "data_type": "select_multi",
      "help": "earthw_info",
      "how_many": "once",
      "Importance": "medium",
	  "mandatory": false,
	  "images": true,
      "condition": "",
      "order": 26,
      "answers":[
        {
          "answer_code": "earthworm",
		  "score": 0,
          "image": "/EARTHW/earthworm.jpg",
          "link": "no",
          "question_code": "EARTHW"
        },
        {
         "answer_code": "hole",
		 "score": 0,
         "image": "/EARTHW/18.jpeg",
         "link": "no",
         "question_code": "EARTHW"
       },
	   {
         "answer_code": "cast",
		 "score": 0,
         "image": "/EARTHW/17.jpeg",
         "link": "no",
         "question_code": "EARTHW"
       }
      ]
    },
    {
      "code": "BIODIVOTH",
      "Title": "sign of other wild life",
      "question": "Do you see presense of other wild life?",
      "data_type": "text",
      "help": "biodivoth_info",
      "how_many": "once",
      "Importance": "low",
      "condition": "",
      "order": 27
    },
    {
      "code": "SQ",
      "Title": "Structure quality value",
      "question": "How do you evaluate overall this layer?",
      "data_type": "select",
      "help": "sq_info",
      "how_many": "by_layer",
      "Importance": "mandatory",
      "condition": "",
      "order": 28,
      "answers":[
        {
          //"answer": "1 (very good)",
          "answer_code": "1",
		  "score": 1,
          "image": "Todo",
          "link": "link- Info on structure quality index",
          "question_code": "SQ"
        },
        {
          //"answer": 2,
          "answer_code": "2",
		  "score": 0.8,
          "image": "Todo",
          "link": "link- Info on structure quality index",
          "question_code": "SQ"
        },
        {
          //"answer": 3,
          "answer_code": "3",
		  "score": 0.5,
          "image": "Todo",
          "link": "link- Info on structure quality index",
          "question_code": "SQ"
        },
        {
          //"answer": 4,
          "answer_code": "4",
		  "score": -0.5,
          "image": "Todo",
          "link": "link- Info on structure quality index",
          "question_code": "SQ"
        },
        {
          //"answer": "5 (very bad)",
          "answer_code": "5",
		  "score": -1,
          "image": "Todo",
          "link": "link- Info on structure quality index",
          "question_code": "SQ"
        }
      ]
    },
    {
      "code": "NOTE",
      "Title": "Notes",
      "question": "note_question",
      "help": "note_info",
      "data_type": "text",
      "how_many": "once",
      "Importance": "low",
      "condition": "",
      "order": 29
    }
  ];

}
