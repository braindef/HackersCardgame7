#!/bin/sh

echo  "../$1/ => ../jpg/$1/"
mkdir --parents ../jpg/$1

find ../png/$1/ -name '*.png' >./jpg_$1.txt

echo liste
cat ./jpg_$1.txt

for f in $(cat ./jpg_$1.txt)
 do
  echo $f
  echo convert -format jpg -quality 50 $(dirname $f)/$(basename $f .png).png ../jpg/$1/$(basename $f .png).jpg
convert -format jpg -quality 50 $(dirname $f)/$(basename $f .png).png ../jpg/$1/$(basename $f .png).jpg
done



