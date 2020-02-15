#!/bin/sh

if  [ "$1" = "" ]
then
	echo -e "
	\e[39m
	Usage:
	------
	To generate the Enlgish jpg's: \e[36mconvert2JPGs.sh EN\e[39m
	To generate the German  jpg's: \e[36mconvert2JPGs.sh DE\e[39m


	"
	exit 0
fi



echo  "../png/$1/ => ../jpg/$1/"
mkdir --parents ../jpg/$1

cp ../index.php ../jpg/$1
cp cardNames.csv ../jpg/$1


find ../png/$1/$2 -name '*.png' >./jpg_$1.txt

echo liste
cat ./jpg_$1.txt

for f in $(cat ./jpg_$1.txt)
 do
  echo $f
  convert $f -background white -flatten $f
convert -format jpg -quality 50 $(dirname $f)/$(basename $f .png).png ../jpg/$1/$(basename $f .png).jpg
done


