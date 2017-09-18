import rpy2.robjects as ro
import rpy2.interactive as r
from rpy2.robjects.functions import SignatureTranslatedFunction

print "ciao";

var={'clay':12};

ro.r.source('lib_rothc.R')
rothc=ro.r['rothc'];
ret=rothc(['Diego','Pippo'])
print (ret);
#ro.r.source('bisfabogno("a")');
