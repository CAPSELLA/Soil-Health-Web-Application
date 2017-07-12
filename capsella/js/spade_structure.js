var spade_question;

function init_spade_question(){
  spade_question=[
    {
      "code": "FCov",
      "question": "What is the field cover for the most part?",
      "data_type": "select",
      "help": "spade_test_info_start",
      "how_many": "once",
      "answers":[
        {
          // "answer": "Naked soil",
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
          "answer": "Tree crop",
          "answer_code": "tree",
          "score": 0,
        },
        {
          "answer": "Forest",
          "answer_code": "forest",
          "score": 0,
          "image": "Easy",
          "link": "no",
          "question_code": "FCov"
        },
        {
          "answer": "Grassland",
          "score": 0,
          "image": "Easy",
          "link": "no",
          "question_code": "FCov"
        }
      ]
    },
    {
      "code": "FSlo",
      "Title": "Field slope",
      "question": "What is the slope of the field?",
      "data_type": "select",
      "help": "no",
      "how_many": "once",
      "Importance": "medium",
      "condition": "",
      "order": 5,
      "answers":[
        {
           "answer": "Flat",
           "answer_code": "flat",
           "score": 0,
           "image": "graphyc_design",
           "link": "no",
           "question_code": "FSlo"
         },
        {
           "answer": "Low slope (<5%)",
           "answer_code": "low",
           "score": 0,
           "image": "graphyc_design",
           "link": "no",
           "question_code": "FSlo"
         },
         {
           "answer": "Medium slope (6-20%)",
           "score": 0,
           "image": "graphyc_design",
           "link": "no",
           "question_code": "FSlo"
         },
         {
           "answer": "High slope (21-60%)",
           "score": 0,
           "image": "graphyc_design",
           "link": "no",
           "question_code": "FSlo"
         },
         {
           "answer": "Very high slope (>60%)",
           "score": 0,
           "image": "graphyc_design",
           "link": "no",
           "question_code": "FSlo"
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
          "answer": "Mostly the crop",
          "score": 0,
          "image": "Easy",
          "link": "no",
          "question_code": "PCov"
        },
        {
          "answer": "Mostly wild vegetation (weeds)",
          "score": 0,
          "image": "Easy",
          "link": "no",
          "question_code": "PCov"
        },
        {
          "answer": "Mostly bare soil",
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
          "answer": "Superficial crust",
          "score": 0.8,
          "image": "/SOIS/15.jpeg",
          "link": "http://soilhealth.capsella.eu/sois/superficial_crust/",
          "question_code": "SOIS"
        },
        {
          "answer": "Evidence of water logging",
          "score": -1,
          "image": "/SOIS/16.jpeg",
          "link": "http://soilhealth.capsella.eu/sois/water_logging/",
          "question_code": "SOIS"
        },
        {
          "answer": "Evidence of erosion",
          "score": -2,
          "image": "/SOIS/17.jpeg",
          "link": "http://soilhealth.capsella.eu/sois/erosion/",
          "question_code": "SOIS"
        },
        {
          "answer": "Evidence of soil compaction",
          "score": -1,
          "image": "/SOIS/18.jpeg",
          "link": "http://soilhealth.capsella.eu/sois/compaction/",
          "question_code": "SOIS"
        },
        {
          "answer": "Growth of algae",
          "score": -0.5,
          "image": "/SOIS/19.jpeg",
          "link": "http://soilhealth.capsella.eu/sois/algae/",
          "question_code": "SOIS"
        },
        {
          "answer": "Cracks",
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
      "help": "no",
      "how_many": "once",
      "images": true,
      "Importance": "low",
      "mandatory": false,
      "condition": "",
      "order": 9,
      "answers":[
        {
          "answer": "URTICA SPP.",
          "score": 0.3,
          "image": "/WILPLA/ortica.JPG",
          "link": "link- N availability",
          "question_code": "WILPLA"
        },
        {
          "answer": "STELLARIA MEDIA",
          "score": 0.3,
          "image": "/WILPLA/stellaria.JPG",
          "link": "link- Good soil structure",
          "question_code": "WILPLA"
        },
        {
          "answer": "VERONICA SPP.",
          "score": 0.3,
          "image": "/WILPLA/veronica.JPG",
          "link": "link- Good soil structure",
          "question_code": "WILPLA"
        },
        {
          "answer": "GALINSOGA PARVIFLORA",
          "score": 0.3,
          "image": "/WILPLA/galisoga.JPG",
          "link": "link- Good soil structure",
          "question_code": "WILPLA"
        },
        {
          "answer": "POA ANNUA",
          "score": -0.3,
          "image": "/WILPLA/poa_annua.JPG",
          "link": "link- Superficial crust and/or soil compaction",
          "question_code": "WILPLA"
        },
        {
          "answer": "ACALYPHA VIRGINICA",
          "score": -0.3,
          "image": "/WILPLA/acalifa.JPG",
          "link": "link- Superficial crust and/or soil compaction",
          "question_code": "WILPLA"
        },
        {
          "answer": "ECHINOCHLOA CRUS-GALLI",
          "score": -0.3,
          "image": "/WILPLA/giavone.JPG",
          "link": "link- crust, compaction, water logging",
          "question_code": "WILPLA"
        },
        {
          "answer": "POLYGONUM AVICULARE",
          "score": -0.3,
          "image": "/WILPLA/polygonum_aviculare.JPG",
          "link": "link- Superficial crust and/or soil compaction",
          "question_code": "WILPLA"
        },
        {
          "answer": "MATRICARIA CHAMOMILLA",
          "score": -0.3,
          "image": "/WILPLA/camomilla.JPG",
          "link": "link- Superficial crust and/or soil compaction",
          "question_code": "WILPLA"
        },
        {
          "answer": "CAPSELLA BURSA-PASTORIS",
          "score": 0.3,
          "image": "/WILPLA/capsella.JPG",
          "link": "link- N availability",
          "question_code": "WILPLA"
        },
        {
          "answer": "PLANTAGO SPP.",
          "score": -0.3,
          "image": "/WILPLA/piantaggine.JPG",
          "link": "link- Soil compaction",
          "question_code": "WILPLA"
        },
        {
          "answer": "TARAXACUM OFFICINALE",
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
          "answer": "Easy to cut the soil up to the spade depth",
          "score": 1,
          "image": "/RESSLI/low_res.jpeg",
          "link": "link- Good soil structure",
          "question_code": "RESSLI"
        },
        {
          "answer": "Uniformely hard to cut the soil",
          "score": -1,
          "image": "graphyc_design",
          "link": "link- Soil compaction",
          "question_code": "RESSLI"
        },
        {
          "answer": "Alternation of easy and hards parts to cut",
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
          "answer": "Granular (rounded surfaces)",
          "score": 2,
          "image": "/AGSHP/Granular.jpeg",
          "link": "link- Good soil structure",
          "question_code": "AGSHP"
        },
        {
          "answer": "Crumb (rounded surfaces but larger than granular)",
          "score": 1,
          "image": "/AGSHP/Crumb.jpeg",
          "link": "link- Good soil structure",
          "question_code": "AGSHP"
        },
        {
          "answer": "Blocky Small",
          "score": 0,
          "image": "/AGSHP/blocky_small.jpeg",
          "link": "link- Soil compaction",
          "question_code": "AGSHP"
        },
        {
          "answer": "Blocky large",
          "score": 0,
          "image": "/AGSHP/blocky_large_ok.jpeg",
          "link": "link- Soil compaction",
          "question_code": "AGSHP"
        },
        {
          "answer": "Subangular blocky small",
          "score": 0.3,
          "image": "/AGSHP/sub_blocky_small.jpeg",
          "link": "link- Soil compaction",
          "question_code": "AGSHP"
        },
        {
          "answer": "Subangular blocky large",
          "score": 0.3,
          "image": "/AGSHP/sub_blocky_large.jpeg",
          "link": "link- Soil compaction",
          "question_code": "AGSHP"
        },
        {
          "answer": "Platy",
          "score": -2,
          "image": "/AGSHP/Platy.jpeg",
          "link": "link- Soil compaction",
          "question_code": "AGSHP"
        },
        {
          "answer": "Structureless",
          "score": -2,
          "image": "/AGSHP/Structureless.jpeg",
          "link": "link- Lack of structure",
          "question_code": "AGSHP"
        }
      ]
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
          "answer": "Loose",
          "score": 2,
          "image": "graphyc_design",
          "link": "link- Good soil structure",
          "question_code": "COMP"
        },
        {
          "answer": "Lightly Compacted",
          "score": -1,
          "image": "graphyc_design",
          "link": "link- Soil compaction",
          "question_code": "COMP"
        },
        {
          "answer": "Very compacted",
          "score": -2,
          "image": "graphyc_design",
          "link": "link- Soil compaction",
          "question_code": "COMP"
        }
      ]
    },
    {
      "code": "MOIST",
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
          "answer": "You cannot break it because the sample is too hard",
          "score": -1,
          "image": "/MOIST/49.jpeg",
          "link": "link1- Info on soil operations (you cannot use machines on the soil); link2-Info on irrigation (you should consider the irrigation)",
          "question_code": "MOIST"
        },
        {
          "answer": "The sample does not break because it is plastic",
          "score": -0.5,
          "image": "/MOIST/51.jpeg",
          "link": "link1 - Info on soil operations (you cannot use machines on the soil); link2- Info on irrigation (Irrigation is not needed)",
          "question_code": "MOIST"
        },
        {
          "answer": "You can easly break the sample into its aggregates",
          "score": 1,
          "image": "/MOIST/50.jpeg",
          "link": "link1 - Info on soil operations (you can  use machines on the soil); link2- Info on irrigation (Irrigation is  needed)",
          "question_code": "MOIST"
        }
      ]
    },
    {
      "code": "COL",
      "Title": "Soil color",
      "question": "Looking at the soil color, do you see any of these signs?",
      "data_type": "select",
      "help": "col_info",
      "how_many": "by_layer",
      "Importance": "medium",
      "images": true,
      "mandatory": false,
      "condition": "",
      "order": 19,
      "answers":[
        {
          "answer": "Ocra-Rusty-Black-White spots",
          "score": -0.5,
          "image": "/COL/52.jpeg",
          "link": "link -  Water logging (periodic)",
          "question_code": "COL"
        },
        {
          "answer": "Grey-Green-Blue",
          "score": -1,
          "image": "/COL/53.JPG",
          "link": "link -  Water logging (sign of long period of water logging)",
          "question_code": "COL"
        },
        {
          "answer": "Layers darker than others",
          "score": 0,
          "image": "/COL/54.jpeg",
          "link": "link - Effects of humus content on soil color (due to different moisture or different content of humus)",
          "question_code": "COL"
        }
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
         "answer": "No residues",
         "score": 0,
         "image": "/TYPOR/no_or.jpg",
         "link": "no",
         "question_code": "TYPOR"
       },
        {
         "answer": "Manure or compost",
         "score": 0,
         "image": "/TYPOR/55.JPG",
         "link": "no",
         "question_code": "TYPOR"
       },
       {
         "answer": "Plant residues",
         "score": 0,
         "image": "/TYPOR/56.JPG",
         "link": "no",
         "question_code": "TYPOR"
       },
       {
         "answer": "Straw",
         "score": 0,
         "image": "/TYPOR/stoppie.jpg",
         "link": "",
         "question_code": "TYPOR"
       },
       {
         "answer": "Old roots",
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
          "answer": "Intact material (no decomposition, you can easily recognize the original matter)",
          "score": -1,
          "image": "/DECOR/intact.jpg",
          "link": "link- Organic matter decomposition in the soil",
          "question_code": "DECOR"
        },
        {
          "answer": "Medium decomposed (you can hardly recognize the original matter)",
          "score": 0.5,
          "image": "/DECOR/average.jpg",
          "link": "link- Organic matter decomposition in the soil",
          "question_code": "DECOR"
        },
        {
          "answer": "Well decomposed (you cannot recognize the original matter anymore)",
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
         "answer": "No smell",
         "score": 0,
         "image": "NO",
         "link": "no",
         "question_code": "SMELL"
       },
       {
         "answer": "Good (woody)",
         "score": 1,
         "image": "NO",
         "link": "link-Soil smell",
         "question_code": "SMELL"
       },
       {
         "answer": "Bad (rotten)",
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
           "answer": "No roots",
           "score": -1,
           "image": "Todo",
           "link": "link-Root growth",
           "question_code": "ROOTP"
         },
         {
           "answer": "Very few roots",
           "score": -0.5,
           "image": "Todo",
           "link": "link-Root growth",
           "question_code": "ROOTP"
         },
         {
           "answer": "A lot of roots",
           "score": 1,
           "image": "/ROOTP/lot.jpeg",
           "link": "link-Root growth",
           "question_code": "ROOTP"
         }
      ]
    },
    {
      "code": "ROOTF",
      "Title": "presence of fine root",
      "question": "How many fine roots (diameter < 1mm) do you see?",
      "data_type": "select",
      "help": "no",
      "how_many": "by_layer",
      "images": true,
      "Importance": "low",
      "condition": "visible only if PCov ! from Mostly bare soil",
      "order": 24,
      "answers":[
        {
          "answer": "No roots",
          "score": -1,
          "image": "Todo",
          "link": "link-Root growth",
          "question_code": "ROOTF"
        },
        {
          "answer": "Very few roots",
          "score": -0.5,
           "image": "/ROOTF/few.jpeg",
          "link": "link-Root growth",
          "question_code": "ROOTF"
        },
        {
          "answer": "A lot of roots",
          "score": 1,
          "image": "/ROOTF/lot.jpeg",
          "link": "link-Root growth",
          "question_code": "ROOTF"
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
         "answer": "No",
         "score": -1,
         "image": "NO",
         "link": "link- Soil oxigenation",
         "question_code": "ROOTT"
       },
       {
         "answer": "yes, a few",
         "score": -0.5,
         "image": "Todo",
         "link": "link- Soil oxigenation",
         "question_code": "ROOTT"
       },
       {
         "answer": "yes, many",
         "score": 1,
         "image": "Todo",
         "link": "link- Soil oxigenation",
         "question_code": "ROOTT"
       },
       {
         "answer": "Yes, but not red if opened",
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
      "question": "Do you see earthworms or clues of their presence (holes, channels, casts)?",
      "data_type": "boolean",
      "help": "earthw_info",
      "how_many": "once",
      "Importance": "medium",
      "condition": "",
      "order": 26,
      "answers":[
        {
          "answer": "yes",
          "score": 0,
          "image": "Todo",
          "link": "no",
          "question_code": "EARTHW"
        },
        {
         "answer": "No",
         "score": 0,
         "image": "Todo",
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
          "answer": "1 (very good)",
          "score": 1,
          "image": "Todo",
          "link": "link- Info on structure quality index",
          "question_code": "SQ"
        },
        {
          "answer": 2,
          "score": 0.8,
          "image": "Todo",
          "link": "link- Info on structure quality index",
          "question_code": "SQ"
        },
        {
          "answer": 3,
          "score": 0.5,
          "image": "Todo",
          "link": "link- Info on structure quality index",
          "question_code": "SQ"
        },
        {
          "answer": 4,
          "score": -0.5,
          "image": "Todo",
          "link": "link- Info on structure quality index",
          "question_code": "SQ"
        },
        {
          "answer": "5 (very bad)",
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
