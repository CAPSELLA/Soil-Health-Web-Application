#!/bin/bash

## CONFIG
ICON_SRC="logo.png"
SPLASH_SRC="splash.png"
BASE_DIR="android"
SPLASH_DIR="android"

## ANDROID
mkdir -p $BASE_DIR
mkdir -p "$BASE_DIR/drawable/"
mkdir -p "$BASE_DIR/drawable-ldpi/"
mkdir -p "$BASE_DIR/drawable-mdpi/"
mkdir -p "$BASE_DIR/drawable-hdpi/"
mkdir -p "$BASE_DIR/drawable-xhdpi/"
mkdir -p "$BASE_DIR/drawable-xxhdpi/"

mkdir -p "$BASE_DIR/mipmap-hdpi/" 
mkdir -p "$BASE_DIR/mipmap-ldpi/" 
mkdir -p "$BASE_DIR/mipmap-mdpi/" 
mkdir -p "$BASE_DIR/mipmap-xhdpi/" 
mkdir -p "$BASE_DIR/mipmap-xxhdpi/" 
mkdir -p "$BASE_DIR/mipmap-xxxhdpi/" 

convert $ICON_SRC -gravity center -extent 2048x2048 -resize 36x36 "${BASE_DIR}/drawable-ldpi/icon.png" 
convert $ICON_SRC -gravity center -extent 2048x2048 -resize 48x48 "${BASE_DIR}/drawable-mdpi/icon.png"
convert $ICON_SRC -gravity center -extent 2048x2048 -resize 72x72 "${BASE_DIR}/drawable-hdpi/icon.png"
convert $ICON_SRC -gravity center -extent 2048x2048 -resize 96x96 "${BASE_DIR}/drawable-xhdpi/icon.png"
convert $ICON_SRC -gravity center -extent 2048x2048 -resize 144x144 "${BASE_DIR}/drawable-xxhdpi/icon.png"
convert $ICON_SRC -gravity center -extent 2048x2048 -resize 96x96 "${BASE_DIR}/drawable/icon.png"


convert $ICON_SRC -gravity center -extent 2048x2048 -resize 72x72 "$BASE_DIR/mipmap-hdpi/icon.png" 
convert $ICON_SRC -gravity center -extent 2048x2048 -resize 36x36 "$BASE_DIR/mipmap-ldpi/icon.png" 
convert $ICON_SRC -gravity center -extent 2048x2048 -resize 48x48 "$BASE_DIR/mipmap-mdpi/icon.png" 
convert $ICON_SRC -gravity center -extent 2048x2048 -resize 96x96 "$BASE_DIR/mipmap-xhdpi/icon.png" 
convert $ICON_SRC -gravity center -extent 2048x2048 -resize 144x144 "$BASE_DIR/mipmap-xxhdpi/icon.png" 
convert $ICON_SRC -gravity center -extent 2048x2048 -resize 192x192 "$BASE_DIR/mipmap-xxxhdpi/icon.png" 

## ANDROID

SPLASH_BGD="#ffffff"

mkdir -p $BASE_DIR
mkdir -p  "${BASE_DIR}/drawable-land-ldpi"
mkdir -p  "${BASE_DIR}/drawable-port-ldpi"
mkdir -p  "${BASE_DIR}/drawable-land-mdpi"
mkdir -p  "${BASE_DIR}/drawable-port-mdpi"
mkdir -p  "${BASE_DIR}/drawable-land-hdpi"
mkdir -p  "${BASE_DIR}/drawable-port-hdpi"
mkdir -p  "${BASE_DIR}/drawable-land-xhdpi"
mkdir -p  "${BASE_DIR}/drawable-port-xhdpi"

mkdir -p  "${BASE_DIR}/drawable-land-xxhdpi"
mkdir -p  "${BASE_DIR}/drawable-land-xxxhdpi"
mkdir -p  "${BASE_DIR}/drawable-port-xxhdpi"
mkdir -p  "${BASE_DIR}/drawable-port-xxxhdpi"

convert $SPLASH_SRC -background $SPLASH_BGD -gravity center -extent 2208x1472 -resize 320x200  "${BASE_DIR}/drawable-land-ldpi/screen.png"
convert $SPLASH_SRC -background $SPLASH_BGD -gravity center -extent 1472x2208 -resize 200x320  "${BASE_DIR}/drawable-port-ldpi/screen.png"
convert $SPLASH_SRC -background $SPLASH_BGD -gravity center -extent 2208x1472 -resize 480x320  "${BASE_DIR}/drawable-land-mdpi/screen.png"
convert $SPLASH_SRC -background $SPLASH_BGD -gravity center -extent 1472x2208 -resize 320x480  "${BASE_DIR}/drawable-port-mdpi/screen.png"
convert $SPLASH_SRC -background $SPLASH_BGD -gravity center -extent 2208x1472 -resize 800x480  "${BASE_DIR}/drawable-land-hdpi/screen.png"
convert $SPLASH_SRC -background $SPLASH_BGD -gravity center -extent 1472x2208 -resize 480x800  "${BASE_DIR}/drawable-port-hdpi/screen.png"
convert $SPLASH_SRC -background $SPLASH_BGD -gravity center -extent 2208x1472 -resize 1280x720 "${BASE_DIR}/drawable-land-xhdpi/screen.png"
convert $SPLASH_SRC -background $SPLASH_BGD -gravity center -extent 1472x2208 -resize 720x1280 "${BASE_DIR}/drawable-port-xhdpi/screen.png"

convert $SPLASH_SRC -background $SPLASH_BGD -gravity center -extent 1472x2208 -resize 1600x960 "${BASE_DIR}/drawable-land-xxhdpi/screen.png"
convert $SPLASH_SRC -background $SPLASH_BGD -gravity center -extent 1472x2208 -resize 1920x1280 "${BASE_DIR}/drawable-land-xxxhdpi/screen.png"
convert $SPLASH_SRC -background $SPLASH_BGD -gravity center -extent 1472x2208 -resize 960x1600 "${BASE_DIR}/drawable-port-xxhdpi/screen.png"
convert $SPLASH_SRC -background $SPLASH_BGD -gravity center -extent 1472x2208 -resize 1280x1920 "${BASE_DIR}/drawable-port-xxxhdpi/screen.png"


cp -r $BASE_DIR/* ../app/platforms/android/res/
