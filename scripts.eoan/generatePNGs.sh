#!/bin/bash

clear

if  [ "$1" = "" ]
then
echo -e "
\e[39m
Usage:
------
To generate the Enlgish PNGs sheets: \e[36m./generatePNGs.sh EN\e[39m
To generate the German  PNGs sheets: \e[36m./generatePNGs.sh DE\e[39m


"
exit 0
fi


clear

pngpath=$(dirname $(pwd))/png
mkdir -p $pngpath/$1/
find ../cards/$1 -name "*.svg" >./PNGs.txt

cp m41b.png $pngpath/$1/

counter=0

for i in $(cat ./PNGs.txt)
  do
  let counter=counter+1
  echo $counter
  /usr/bin/inkscape $i &
  sleep 3
  xdotool key Ctrl+Alt+a
  sleep 1
  xdotool key Ctrl+Shift+e
  sleep 0.3
  xdotool key Tab Tab Tab KP_Space
  sleep 0.3
  xdotool key Tab Tab Tab Tab Tab Tab Tab Tab Tab
  sleep 0.3
  xdotool type "1600"
  #xdotool click 1 if key-shortcuts do not work you can also use mouse commands
  sleep 0.3
  #xdotool key Ctrl+a
  xdotool key Tab Tab Tab
  sleep 0.3
  xdotool key Ctrl+a Delete
  echo $pngpath
  xdotool key Alt+b
  sleep 0.3
  xdotool type "$pngpath/$1/"
  xdotool type $(basename $i .svg)
  sleep 0.3
  xdotool type '.png'
  sleep 0.3
  xdotool key KP_Enter
  sleep 0.3
  #xdotool key Alt+e
  sleep 1
  xdotool key Ctrl+w
  sleep 1
  xdotool key Alt+F4
  sleep 2
  xdotool key Alt+w
done



