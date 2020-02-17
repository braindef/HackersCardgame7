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
	sleep 3
	echo $i
	echo $i | tr -cd '\/'
	slashes=$(echo $i | tr -cd '\/' | wc -c)
	echo slashes: $slashes
	num1="$(($slashes+1))"
	echo $num1
	file=$(echo $i | cut -d "/" -f$num1)
	nameOnly=$(echo $file |cut -d. -f1)
	echo $nameOnly
	wmctrl -pl
	wmctrl -pl |grep $file |cut -d" " -f1
	#./moveLeft.sh $(wmctrl -pl |grep $file |cut -d" " -f1)
	./moveLeft.sh inkscape

	inkscape ../cards/$2/$(echo $i | cut -d/ -f4-) &

        #./moveRight.sh $(wmctrl -pl |grep $file |cut -d" " -f1)


	read var
	echo $var
done
