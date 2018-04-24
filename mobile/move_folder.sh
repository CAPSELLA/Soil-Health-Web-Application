cp config.xml app/config.xml
cd app
rm -rf www/*
cp -r ../src/* www/
cp -r ../../capsella/res www/
rm -r www/res/img/spade_test/
mv www/res/img/spade_test_low_res www/res/img/spade_test
cp -r ../../capsella/js www/
cp -r ../../capsella/css www/

#cordova run android
#cd ..
