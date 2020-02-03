#!/bin/sh



if  [ "$1" = "" ] || [ "$2" = "" ] 
then
	echo -e "
	\e[39m
	Usage:
	------
	To edit two languages (eg English and German): \e[36meditMultiLang.sh EN DE\e[39m

	"
	exit 0
fi




find ../cards/$1 -name '*.svg' > translateCards.txt

for i in $(cat translateCards.txt)
do
	echo FILE: $i
	echo $i | cut -d/ -f4-
	inkscape ../cards/$1/$(echo $i | cut -d/ -f4-) &
	inkscape ../cards/$2/$(echo $i | cut -d/ -f4-)
	read -n 1 -s -r -p "press key for next card in both languages ($1 / $2)."
done
