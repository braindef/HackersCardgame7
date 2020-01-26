#!/bin/bash

echo "

"

find ../cards/DE -name "*.svg" >./print.txt


 for i in $(cat ./print.txt)
  do

   echo $i
   /usr/bin/inkscape $i &

   echo ../cards/EN/$(basename $(dirname $i))/$(basename $i)
   /usr/bin/inkscape ../cards/EN/$(basename $(dirname $i))/$(basename $i) &

   echo press [ENTER] for the next card
   read
  done


