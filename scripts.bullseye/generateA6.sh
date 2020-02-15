#!/bin/bash

if  [ "$1" = "" ]
then
echo -e "
\e[39m
Usage:
------
To generate the Enlgish A6 sheets: \e[36m./generateA6.sh EN\e[39m
To generate the German  A6 sheets: \e[36m./generateA6.sh DE\e[39m


"
exit 0
fi

mkdir -p ../assembled/$1/A6/
cp ../cards/template/templateA6.svg ../assembled/$1/A6/


#open an inkscape instance so that the libraries are already in RAM
inkscape &
sleep 8

find ../cards/$1 -name "*.svg" >./A6_$1.txt

counter=0

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

