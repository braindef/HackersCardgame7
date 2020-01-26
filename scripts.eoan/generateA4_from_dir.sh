#!/bin/bash


if  [ "$1" = "" ]
then
echo -e "
\e[39m
Usage:
------
To generate the cards in direcory A4 sheets: \e[36m./generateA4.sh relativeDirectory\e[39m


"
exit 0
fi


find $1 -name "*.svg" >./customDir.txt

counter=0


mkdir -p ../assembled/$1/A4/
cp ../cards/template/templateA4.svg ../assembled/$1/A4/



 for i in $(cat ./customDir.txt)
  do
   let counter=counter+1
   if (( $counter % 8 == 1 ))
   then 
     inkscape ../assembled/$1/A4/templateA4.svg &
     file=$(basename $i .svg)
     sleep 8
   else
     file=$file-$(basename $i .svg)
   fi
   echo $i
   echo $file 
   /usr/bin/inkscape $i &
   sleep 6
   xdotool key Ctrl+Alt+a
   sleep 2
   xdotool key Ctrl+c
   sleep 1
   xdotool key Alt+Escape
   sleep 1
   xdotool key Ctrl+v
   sleep 1
   xdotool key Ctrl+g
   sleep 1
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
     xdotool key Tab Tab Tab Tab
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
     xdotool key Tab Tab Tab Tab Tab
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
     sleep 3
#  exit 0
     xdotool key KP_Enter
     sleep 1.5
     xdotool key Alt+F4
   fi
  done

