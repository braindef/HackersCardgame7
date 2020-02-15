!/bin/bash

if  [ "$1" = "" ]
then
echo -e "
\e[39m
Usage:
------
To generate the Enlgish PDF sheets: \e[36m./generateA6.sh EN\e[39m
To generate the German  PDF sheets: \e[36m./generateA6.sh DE\e[39m

"
exit 0
fi


find ../cards/$1/ -name "*.svg" >./stretch_$1.txt

echo making directories
#mkdir -p ../cards.stretchpdf/$1/A4


 /usr/bin/inkscape &

counter=0

for j in $(echo "./stretch_$1.txt")
 do
 echo j: $j
 for i in $(cat $j)
  do
  echo i: $i

   /usr/bin/inkscape $i &

   sleep 7
   xdotool key Tab Tab
   sleep 1
   xdotool key KP_Enter
   sleep 10
   xdotool key 5
   sleep 1
   xdotool key alt+F4
   sleep 5
   xdotool key KP_Enter
   echo converted $i

  done

 echo -e "

          my cups-pdf printer is slow, so we wait here 2 Min
"
 sleep 60

 echo moving $j 

 if  [ "$j" = "./pdf_$1_A4.txt" ]
  then
   mv ~/PDF/*.pdf ../pdf/$1/A4
  else
   mv ~/PDF/*.pdf ../pdf/$1/A6
 fi

done


