import rpy2.robjects as ro
import rpy2.interactive as r
import json

'''

 In the R Library we use 1 as PET Coefficent

'''

print "ciao";

ro.r.source('lib_rothc.R')
rothc_r=ro.r['rothc'];

def rothc(input):
    output=rothc_r(json.dumps(input));
    return json.loads(output[0]);


# temp=[-0.4, 0.3, 4.2, 8.3, 13.0, 15.9,18.0, 17.5, 13.4, 8.7, 3.9,  0.6]
# precip=[49, 39, 44, 41, 61, 58, 71, 58, 51,48, 50, 58]
# evap=[12, 18, 35, 58, 82, 90, 97, 84, 54, 31,14, 10]
#bare= [True,True,True,True,True,True,False,False,False,False,False,False]

#Ferrara:
precip=[38,36,44,52,48,55,47,66,60,68,63,46];
temp=[0.8, 4.8, 12, 16, 22 , 21.5 , 24.3 , 25.5 , 21 , 14.3 , 6 ,0.7];
evap=[17, 26, 54, 90, 126, 150, 160, 140, 90, 56, 25,  16];
# bare=[True,True,True,True,True,True,True,True,True,True,True,True]
bare= [False,False,False,False,False,False,False,False,False,False,False,False]


all_data=[
    {"capsella_code":"12_it","date":"02/22/2017","sand":490,"clay":157,"som_end":2.28,"year_start":1999,"som_start":1.76,"c_input":0.24},
    {"capsella_code":"10_it","date":"02/22/2017","sand":590,"clay":137,"som_end":6.24,"year_start":2010,"som_start":3.53,"c_input":8.66},
    {"capsella_code":"09_it","date":"02/22/2017","sand":597,"clay":237,"som_end":4.05,"year_start":2008,"som_start":1.66,"c_input":1.67},
    {"capsella_code":"02_it","date":"02/15/2017","sand":476,"clay":224,"som_end":2.39,"year_start":1996,"som_start":1.52,"c_input":1.9},
    {"capsella_code":"11_it","date":"02/16/2017","sand":396,"clay":190,"som_end":2.46,"year_start":2010,"som_start":2.1,"c_input":1.35},
    {"capsella_code":"05_it","date":"02/10/2017","sand":376,"clay":310,"som_end":2.48,"year_start":2003,"som_start":2.5,"c_input":1.31},
    {"capsella_code":"01_it","date":"02/08/2017","sand":656,"clay":150,"som_end":4.04,"year_start":1992,"som_start":1.21,"c_input":7.5},
    {"capsella_code":"07_it","date":"02/23/2017","sand":476,"clay":190,"som_end":2.1,"year_start":2009,"som_start":1.85,"c_input":1.55},
    {"capsella_code":"08_it","date":"02/17/2017","sand":496,"clay":190,"som_end":2.06,"year_start":1998,"som_start":1.76,"c_input":2.2},
    {"capsella_code":"06_it","date":"03/02/2017","sand":617,"clay":90,"som_end":1.83,"year_start":2009,"som_start":1,"c_input":2.9}
]

print "SOC;SOM;years;SOM_year"
for d in all_data:
    years=20;
    years=2017-d['year_start'];
    # start_som=0.0353
    # CInputs=8.66; #1.3;
    # clay=13.7;
    clay=d['clay']/10;
    start_som=d['som_start']/100;
    CInputs=5*d['c_input'];
    var={
        'clay':clay,
        'soil_thick':30,
        'SOM':start_som,
        'bulk_density': 1.027,
        'num_years':years,
        'Cinputs':CInputs,
        'temp':temp,
        'precip':precip,
        'evap':evap,
        'bare':bare,
    };
    res=rothc(var)
    #print( res['input']['carbonPool']);
    #print (res['carbonPool']);
    #+";"+str(res['input']['SOC'])
    print (d['capsella_code']+";"+str(res['SOC'])+";"+str(res['SOM'])+";"+str(years))+";"+str(res['SOM']/years);


for y in range(1,25):
    years=y;
    start_som=0.0121
    CInputs=40*0.6; #1.3;
    clay=15;
    var={
        'clay':clay,
        'soil_thick':30,
        'SOM':start_som,
        'bulk_density': 1.4,
        'num_years':years,
        'Cinputs':CInputs,
        'temp':temp,
        'precip':precip,
        'evap':evap,
        'bare':bare,
    };
    res=rothc(var)
    #print( res['input']['carbonPool']);
    #print (res['carbonPool']);
    #+";"+str(res['input']['SOC'])
    print (d['capsella_code']+";"+str(res['SOC'])+";"+str(res['SOM'])+";"+str(years))+";"+str(res['SOM']/years);
