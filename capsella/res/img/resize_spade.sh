cd spade_test_low_res
find . -name '*' -execdir mogrify -resize 640x {} \;
cd ..
