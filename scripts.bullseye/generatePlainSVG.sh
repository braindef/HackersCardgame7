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

AND SINCE FlowRoot, Flow.... things only work in the svg 1.2 draft
and this is needed for justified print we probably wait until
svg 2.0 is here, inkscape seems to implement 1.2 draft but most
other things dont, and if you look at https://www.w3.org/TR/SVG2/
microsoft and adobe probably will block svg 2.0 too, since people
would prefere an open document standard like svg over AI or WMF ....
 \e[36mworkaround would be to select the text, and select "test" in the menubar and then select "Convert to Text" so inkscape would remove the FlowRoot elements\e[39m 


"
exit 0
fi


clear


find ../cards/$1 -name "*.svg" >./SVGs.txt

svgpath=$(dirname $(pwd))/svg

mkdir -p $svgpath/$1

counter=0

for i in $(cat ./SVGs.txt)
  do
  let counter=counter+1
  /usr/bin/inkscape $i &
  sleep 5
  xdotool key Ctrl+Alt+a
  sleep 5
  xdotool key Ctrl+Shift+s
  sleep 5
  xdotool key Shift+Tab Shift+Tab Shift+Tab Home Down
  sleep 5
  xdotool key Tab Tab Tab
  sleep 5
  echo $svgpath/$1/
  xdotool type "$svgpath/$1/"
  sleep 5
  xdotool type $(basename $i .svg)
  sleep 5
  xdotool key KP_Enter
  sleep 5
  killall inkscape
done



