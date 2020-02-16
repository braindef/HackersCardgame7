#!/bin/bash

if  [ "$1" = "" ] || [ "$2" = "" ]
then
	echo -e "
\e[39m
Usage:
------
Generate English A4 SVG's: \e[36m./generate.sh EN A4\e[39m
Generate German A6 SVG's: \e[36m./generate.sh DE A6\e[39m
"
	exit 0
fi

counter=0

killall clipit

if [ "$2" = "A4" ]
then
	find ../cards/$1 -name "*.svg" >./A4_$1.txt

	mkdir -p ../assembled/$1/A4/
	cp ./templateA4.svg ../assembled/$1/A4/

	for i in $(cat ./A4_$1.txt)
	do
		let counter=counter+1
		echo $counter
		if (( $counter % 8 == 1 ))
		then 
			inkscape ../assembled/$1/A4/templateA4.svg &
			file=$(basename $i .svg)
			sleep 1
		else
			file=$file-$(basename $i .svg)
		fi
		echo $i
		echo $file 
		/usr/bin/inkscape $i &
		sleep 4
		xdotool key Ctrl+Alt+a
		sleep 1
		xdotool key Ctrl+c
		sleep 0.6
		xdotool key Alt+Escape
		sleep 0.6
		xdotool key Ctrl+v
		sleep 0.6
		xdotool key Ctrl+g
		sleep 0.6
		xdotool key Alt+Escape
		sleep 0.2
		xdotool key Alt+F4

		if (( $counter % 8 == 0 ))
		then 
			sleep 1
			xdotool key Ctrl+Alt+a

			sleep 0.5
			xdotool key Alt+o

			sleep 0.5
			xdotool key End KP_Enter
			sleep 0.5
			xdotool key Tab Tab
			sleep 0.2
			xdotool type '2'
			sleep 0.2
			xdotool key Tab Tab Tab
			sleep 0.2
			#xdotool type '4'
			sleep 0.2
			xdotool key Tab Tab Tab
			sleep 0.2
			xdotool type '0'
			sleep 0.2
			xdotool key Tab
			sleep 0.2
			xdotool type '0'
			sleep 0.2
			xdotool key Tab
			sleep 0.1
			xdotool key KP_Enter
			sleep 1
			xdotool key Ctrl+Alt+a
			sleep 0.2
			xdotool key Ctrl+g
			sleep 0.8
			xdotool key Shift+Ctrl+a
			sleep 0.5
			xdotool key Tab Down Down Down Down Down Up Up
			sleep 0.5
			xdotool key Tab Tab Tab Tab
			sleep 0.5
			xdotool key KP_Enter
			sleep 0.5
			xdotool key Tab Tab Tab Tab Tab Tab
			sleep 0.5
			xdotool key KP_Enter

			xdotool key Ctrl+Shift+s
			sleep 1
			echo filename $file .svg
			sleep 1
			xdotool type "$file"
			sleep 1
			#  exit 0
			xdotool key KP_Enter
			sleep 1.5
			xdotool key Alt+F4
		fi
		echo $file
	done

elif [ "$2" = "A6" ]
then
	find ../cards/$1 -name "*.svg" >./A6_$1.txt

	mkdir -p ../assembled/$1/A6/
	cp ./templateA6.svg ../assembled/$1/A6/

	cp ../cards/template/templateA6.svg ../assembled/$1/A6/

	#open an inkscape instance so that the libraries are already in RAM
	inkscape &
	sleep 8

	find ../cards/$1 -name "*.svg" >./A6_$1.txt

	counter=0

#TODO: sort names

	for i in $(cat ./A6_$1.txt)
	do
		let counter=counter+1
		if (( $counter % 2 == 1 ))
		then
			inkscape ../assembled/$1/A6/templateA6.svg &
			file=$(basename $i .svg)
			sleep 2
		fi

		/usr/bin/inkscape $i &
		sleep 8
		xdotool key Ctrl+Alt+a
		sleep 0.7
		xdotool key Ctrl+c
		sleep 0.2
		xdotool key Alt+Escape
		sleep 0.5
		xdotool key Ctrl+v
		sleep 1
		xdotool key Ctrl+g
		sleep 1
		xdotool key Alt+Escape
		sleep 0.5
		xdotool key Alt+F4

		if (( $counter % 2 == 0 ))
		then 
			file=$file-$(basename $i .svg)
			sleep 0.6
			xdotool key Ctrl+Alt+a
			sleep 0.5
			xdotool key Shift+Ctrl+a
			sleep 0.2
			xdotool key Tab Tab Tab Tab Tab
			sleep 0.5
			xdotool key space
			sleep 0.5
			xdotool key Tab Tab Tab Tab Tab Tab
			sleep 0.5
			xdotool key space
			sleep 0.5
			xdotool key Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab Tab space
			sleep 2
			xdotool key Ctrl+Shift+s
			sleep 2
			xdotool type $file
			sleep 0.5
			xdotool key KP_Enter
			sleep 1.5
			xdotool key Alt+F4
		fi
		echo $file
	done
else
	echo "You must specify A4 or A6"
fi

