import rpy2.robjects as ro
import rpy2.interactive as r
import json
# from rpy2.robjects.functions import SignatureTranslatedFunction
# import rpy2.robjects.numpy2ri
# rpy2.robjects.numpy2ri.activate()

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
start_som=0.0353
CInputs=0; #1.3;
years=10;


var={
    'clay':13.7,
    'soil_thick':30,
    'SOM':start_som,
    'bulk_density': 1.027,
    'num_years':20,
    'Cinputs':CInputs,
    'temp':temp,
    'precip':precip,
    'evap':evap,
    'bare':bare,
};
res=rothc(var)
print( res['input']['carbonPool']);
print (res['carbonPool']);
print ("SOC: "+str(res['SOC'])+" SOM:"+str(res['SOM'])+" SOCInput"+str(res['input']['SOC']));
