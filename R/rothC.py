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

temp=[3.4,3.6,5.1,7.3,11,13.9,16,16,13.5,10.2,6.1,4.6]
precip=[74,59,62,51,52,57,34,55,58,56,75,71]
evap=[8,10,27,49,83,99,103,91,69,34,18,8]
bare=[True,True,True,True,True,True,True,True,True,True,True,True]
start_som=0.02
CInputs=0;
#bare= [True,True,True,True,True,True,False,False,False,False,False,False]


for c in range(1,12,1):
    #bulk=1+(c/10.);
    var={
        'clay':23.4,
        'soil_thick':23,
        'SOM':start_som,
        'bulk_density': 1.5,
        'num_years':20,
        'Cinputs':CInputs,
        'temp':temp,
        'precip':precip,
        'evap':evap,
        'bare':bare,
    };
    res=rothc(var)
    print(res['input']['carbonPool']);
    print(res['carbonPool']);
    print (str(c)+" "+str(res['SOC'])+" "+str(res['SOM'])+" "+str(res['input']['SOC']));
#ro.r.source('bisfabogno("a")');
