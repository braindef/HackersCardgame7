#!/bin/sh



if  [ "$1" = "" ] || [ "$2" = "" ] 
then
	echo -e "
	\e[39m
	Usage:
	------
	To generate directory structure (use English as template and generate German): \e[36mcopyLanguage.sh EN DE\e[39m

	"
	exit 0
fi


find ../cards/$1 -type d > translateDirs.txt

#mkdir ../cards/$2  

for i in $(cat translateDirs.txt)
do
	mkdir -p ../cards/$2/$(echo $i | cut -d/ -f4-)
done


find ../cards/$1 > translateCards.txt

for i in $(cat translateCards.txt)
do
	echo	cp $i ../cards/$2/$(echo $i | cut -d/ -f4-)
	cp $i ../cards/$2/$(echo $i | cut -d/ -f4-)
done
