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


temp=[-0.4, 0.3, 4.2, 8.3, 13.0, 15.9,18.0, 17.5, 13.4, 8.7, 3.9,  0.6]
precip=[49, 39, 44, 41, 61, 58, 71, 58, 51,48, 50, 58]
evap=[12, 18, 35, 58, 82, 90, 97, 84, 54, 31,14, 10]

for c in range(1,100,10):
    var={
        'clay':c,
        'soil_thick':25,
        'SOC':40,
        'num_years':20,
        'temp':temp,
        'precip':precip,
        'evap':evap,
    };
    print (str(c)+" "+str(rothc(var)['SOC']));
#ro.r.source('bisfabogno("a")');
