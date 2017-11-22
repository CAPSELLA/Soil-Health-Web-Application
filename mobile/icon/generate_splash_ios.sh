#!/bin/bash
#
# Copyright (C) 2016 Michele Mammini <mammini@aedit.it>
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.

set -e

SRC_FILE="$1"
DST_PATH="$2"

VERSION=1.0.0

info() {
     local green="\033[1;32m"
     local normal="\033[0m"
     echo -e "[${green}INFO${normal}] $1"
}

error() {
     local red="\033[1;31m"
     local normal="\033[0m"
     echo -e "[${red}ERROR${normal}] $1"
}

usage() {
cat << EOF
VERSION: $VERSION
USAGE:
    $0 srcfile dstpath

DESCRIPTION:
    This script aim to generate ios app splash easier and simply.

    srcfile - The source png image. Preferably above 1024x1024
    dstpath - The destination path where the icons generate to. (i.e. ios/splash)

    This script is depend on ImageMagick. So you must install ImageMagick first
    You can use 'sudo brew install ImageMagick' to install it
    
AUTHOR:
    Michele Mammini <mammini@aedit.it>

LICENSE:
    This script follow MIT license.

EXAMPLE:
    ./generate_icon_ios.sh splash.png ios/splash
EOF
}

# Check ImageMagick
command -v convert >/dev/null 2>&1 || { error >&2 "The ImageMagick is not installed. Please use brew to install it first."; exit -1; }

# Check param
if [ $# != 2 ];then
    usage
    exit -1
fi

# Check dst path whether exist.
if [ ! -d "$DST_PATH" ];then
    mkdir -p "$DST_PATH"
fi

# Generate, refer to:https://developer.apple.com/library/ios/qa/qa1686/_index.html

info '1 Generate Default-568h@2x~iphone.png ...'
convert "$SRC_FILE" -resize 1136x1136 -gravity center -crop 640x1136+0+0 "$DST_PATH/Default-568h@2x~iphone.png"
info '2 Generate Default-667h.png ...'
convert "$SRC_FILE" -resize 1334x1334 -gravity center -crop 750x1334+0+0 "$DST_PATH/Default-667h.png"
info '3 Generate Default-736h.png ...'
convert "$SRC_FILE" -resize 2208x2208 -gravity center -crop 1242x2208+0+0 "$DST_PATH/Default-736h.png"
info '4 Generate Default-Landscape-736h.png ...'
convert "$SRC_FILE" -resize 2208x2208 -gravity center -crop 2208x1242+0+0 "$DST_PATH/Default-Landscape-736h.png"
info '5 Generate Default-Landscape@2x~ipad.png ...'
convert "$SRC_FILE" -resize 2048x2048 -gravity center -crop 2048x1536+0+0 "$DST_PATH/Default-Landscape@2x~ipad.png"
info '6 Generate Default-Landscape~ipad.png ...'
convert "$SRC_FILE" -resize 1024x1024 -gravity center -crop 1024x768+0+0 "$DST_PATH/Default-Landscape~ipad.png"
info '7 Generate Default-Portrait@2x~ipad.png ...'
convert "$SRC_FILE" -resize 2048x2048 -gravity center -crop 1536x2048+0+0 "$DST_PATH/Default-Portrait@2x~ipad.png"
info '8 Generate Default-Portrait~ipad.png ...'
convert "$SRC_FILE" -resize 1024x1024 -gravity center -crop 768x1024+0+0 "$DST_PATH/Default-Portrait~ipad.png"
info '9 Generate Default@2x~iphone.png ...'
convert "$SRC_FILE" -resize 960x960 -gravity center -crop 640x960+0+0 "$DST_PATH/Default@2x~iphone.png"
info '10 Generate Default~iphone.png ...'
convert "$SRC_FILE" -resize 480x480 -gravity center -crop 320x480+0+0 "$DST_PATH/Default~iphone.png"


info 'Generate Done.'

info 'Move inside target folder'
rm -f ../ios_app/platforms/ios/AgroAmbiente.Info/Images.xcassets/LaunchImage.launchimage/*.png
cp ios/splash/*.png ../ios_app/platforms/ios/AgroAmbiente.Info/Images.xcassets/LaunchImage.launchimage/

ls -l ../ios_app/platforms/ios/AgroAmbiente.Info/Images.xcassets/LaunchImage.launchimage