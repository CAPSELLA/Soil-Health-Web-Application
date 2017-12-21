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
    This script aim to generate ios app icons easier and simply.

    srcfile - The source png image. Preferably above 1024x1024
    dstpath - The destination path where the icons generate to. (i.e. ios/icon)

    This script is depend on ImageMagick. So you must install ImageMagick first
    You can use 'sudo brew install ImageMagick' to install it
    
AUTHOR:
    Michele Mammini <mammini@aedit.it>

LICENSE:
    This script follow MIT license.

EXAMPLE:
    ./generate_icon_ios.sh logo.png ios/icon
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

info 'Generate iTunesArtwork.png ...'
convert "$SRC_FILE" -resize 512x512 "$DST_PATH/iTunesArtwork.png"
info 'Generate iTunesArtwork@2x.png ...'
convert "$SRC_FILE" -resize 1024x1024 "$DST_PATH/iTunesArtwork@2x.png"

info 'Generate icon-40.png ...'
convert "$SRC_FILE" -resize 40x40 "$DST_PATH/icon-40.png"
info 'Generate icon-40@2x.png ...'
convert "$SRC_FILE" -resize 80x80 "$DST_PATH/icon-40@2x.png"
info 'Generate icon-50.png ...'
convert "$SRC_FILE" -resize 50x50 "$DST_PATH/icon-50.png"
info 'Generate icon-50@2x.png ...'
convert "$SRC_FILE" -resize 100x100 "$DST_PATH/icon-50@2x.png"
info 'Generate icon-60.png ...'
convert "$SRC_FILE" -resize 60x60 "$DST_PATH/icon-60.png"
info 'Generate icon-60@2x.png ...'
convert "$SRC_FILE" -resize 120x120 "$DST_PATH/icon-60@2x.png"
info 'Generate icon-60@3x.png ...'
convert "$SRC_FILE" -resize 180x180 "$DST_PATH/icon-60@3x.png"
info 'Generate icon-72.png ...'
convert "$SRC_FILE" -resize 72x72 "$DST_PATH/icon-72.png"
info 'Generate icon-72@2x.png ...'
convert "$SRC_FILE" -resize 144x144 "$DST_PATH/icon-72@2x.png"
info 'Generate icon-76.png ...'
convert "$SRC_FILE" -resize 76x76 "$DST_PATH/icon-76.png"
info 'Generate icon-76@2x.png ...'
convert "$SRC_FILE" -resize 152x152 "$DST_PATH/icon-76@2x.png"
info 'Generate icon-83.5@2x.png ...'
convert "$SRC_FILE" -resize 167x167 "$DST_PATH/icon-83.5@2x.png"
info 'Generate icon-small.png ...'
convert "$SRC_FILE" -resize 29x29 "$DST_PATH/icon-small.png"
info 'Generate icon-small@2x.png ...'
convert "$SRC_FILE" -resize 58x58 "$DST_PATH/icon-small@2x.png"
info 'Generate icon-small@3x.png ...'
convert "$SRC_FILE" -resize 87x87 "$DST_PATH/icon-small@3x.png"
info 'Generate icon.png ...'
convert "$SRC_FILE" -resize 57x57 "$DST_PATH/icon.png"
info 'Generate icon@2x.png ...'
convert "$SRC_FILE" -resize 114x114 "$DST_PATH/icon@2x.png"

info 'Generate Done.'

info 'Move inside target folder'
rm -f ../ios_app/platforms/ios/AgroAmbiente.Info/Images.xcassets/AppIcon.appiconset/*.png
cp ios/icon/*.png ../ios_app/platforms/ios/AgroAmbiente.Info/Images.xcassets/AppIcon.appiconset/

ls -l ../ios_app/platforms/ios/AgroAmbiente.Info/Images.xcassets/AppIcon.appiconset