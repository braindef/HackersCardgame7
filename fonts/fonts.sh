#!/bin/bash

echo $0

find . -name '*.zip' -exec unzip -n '{}'  -d ./unzipped/ \;

mkdir ttf

cd ./unzipped



find . -name '*.TTF' -exec mv '{}' ../ttf/ \;
find . -name '*.ttf' -exec mv '{}' ../ttf/ \;

#somehow this bitstream charter went into my system fonts...
find . -name '*.afm' -exec mv '{}' ../ttf/ \;
find . -name '*.pfb' -exec mv '{}' ../ttf/ \;

cd ..

mkdir ~/.fonts

cp ./ttf/*.ttf ~/.fonts
cp ./ttf/*.TTF ~/.fonts


cp ./ttf/*.afm ~/.fonts
cp ./ttf/*.pfb ~/.fonts

fc-cache -f -v


rm -rfv ./unzipped/*
rm -rfv ./ttf/*
rm -rfv ./ttf/.*

echo installed

echo $0
