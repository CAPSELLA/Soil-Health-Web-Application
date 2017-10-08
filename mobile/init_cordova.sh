#!/bin/bash

cd src
mkdir lib
cd lib

wget https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js -O jquery.min.js
wget https://github.com/twbs/bootstrap/releases/download/v3.3.7/bootstrap-3.3.7-dist.zip -O bootstrap.zip
wget http://cdn.leafletjs.com/leaflet/v1.2.0/leaflet.zip -O leaflet.zip
# wget http://cdn.jsdelivr.net/npm/signature_pad@2.3.0/dist/signature_pad.min.js -O signature_pad.min.js
wget http://cdnjs.cloudflare.com/ajax/libs/jStorage/0.4.12/jstorage.min.js -O jstorage.min.js
# wget https://fonts.gstatic.com/s/materialicons/v29/2fcrYFNaTjcS6g4U3t-Y5StnKWgpfO2iSkLzTz-AABg.ttf -O icons.ttf
# wget https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css -O select2.min.css
# wget https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js -O select2.min.js

mkdir leaflet
mv leaflet.zip leaflet/
cd leaflet
unzip -o leaflet.zip
rm leaflet.zip
cd ..


unzip bootstrap.zip
rm bootstrap.zip
mv bootstrap-3.3.7-dist bootstrap
cd ..

# cd css
# wget https://github.com/google/material-design-icons/raw/master/iconfont/MaterialIcons-Regular.woff2 -O MaterialIcons-Regular.woff2
# wget https://github.com/google/material-design-icons/raw/master/iconfont/MaterialIcons-Regular.woff -O MaterialIcons-Regular.woff
# wget https://github.com/google/material-design-icons/raw/master/iconfont/MaterialIcons-Regular.ttf -O MaterialIcons-Regular.ttf
# wget https://github.com/google/material-design-icons/raw/master/iconfont/MaterialIcons-Regular.eot -O MaterialIcons-Regular.eot
# cd ../..

cd ..

cordova create app eu.capsella.soilhealth.spade_test "SoilHealth"
cd app
cordova platform add android

#INSTALLAZIONE EVENTUALI PLUGIN
cordova plugin add cordova-plugin-geolocation
cordova plugin add cordova-plugin-globalization
cordova plugin add cordova-plugin-camera



# cordova plugin add phonegap-plugin-barcodescanner --variable CAMERA_USAGE_DESCRIPTION="To scan barcodes"
# cordova plugin add https://github.com/esri/cordova-plugin-advanced-geolocation.git
# cordova plugin add cordova-plugin-statusbar

cd ..
