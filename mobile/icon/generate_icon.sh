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
convert $ICON_SRC -gravity center -extent 2048x2048 -resize 36x36 "${BASE_DIR}/drawable-ldpi/icon.png" 
convert $ICON_SRC -gravity center -extent 2048x2048 -resize 48x48 "${BASE_DIR}/drawable-mdpi/icon.png"
convert $ICON_SRC -gravity center -extent 2048x2048 -resize 72x72 "${BASE_DIR}/drawable-hdpi/icon.png"
convert $ICON_SRC -gravity center -extent 2048x2048 -resize 96x96 "${BASE_DIR}/drawable-xhdpi/icon.png"
convert $ICON_SRC -gravity center -extent 2048x2048 -resize 144x144 "${BASE_DIR}/drawable-xxhdpi/icon.png"
convert $ICON_SRC -gravity center -extent 2048x2048 -resize 96x96 "${BASE_DIR}/drawable/icon.png"

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


convert $SPLASH_SRC -background $SPLASH_BGD -gravity center -extent 2208x1472 -resize 320x200  "${BASE_DIR}/drawable-land-ldpi/splash.png"
convert $SPLASH_SRC -background $SPLASH_BGD -gravity center -extent 1472x2208 -resize 200x320  "${BASE_DIR}/drawable-port-ldpi/splash.png"
convert $SPLASH_SRC -background $SPLASH_BGD -gravity center -extent 2208x1472 -resize 480x320  "${BASE_DIR}/drawable-land-mdpi/splash.png"
convert $SPLASH_SRC -background $SPLASH_BGD -gravity center -extent 1472x2208 -resize 320x480  "${BASE_DIR}/drawable-port-mdpi/splash.png"
convert $SPLASH_SRC -background $SPLASH_BGD -gravity center -extent 2208x1472 -resize 800x480  "${BASE_DIR}/drawable-land-hdpi/splash.png"
convert $SPLASH_SRC -background $SPLASH_BGD -gravity center -extent 1472x2208 -resize 480x800  "${BASE_DIR}/drawable-port-hdpi/splash.png"
convert $SPLASH_SRC -background $SPLASH_BGD -gravity center -extent 2208x1472 -resize 1280x720 "${BASE_DIR}/drawable-land-xhdpi/splash.png"
convert $SPLASH_SRC -background $SPLASH_BGD -gravity center -extent 1472x2208 -resize 720x1280 "${BASE_DIR}/drawable-port-xhdpi/splash.png"

cp -r $BASE_DIR/* ../app/platforms/android/res/
