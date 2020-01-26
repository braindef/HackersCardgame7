#!/bin/bash



find ./cards/ -maxdepth 1 -type d| grep -v ^.$ |cut -c 9-  |grep -v ^$ >allLanguages.txt

if  [ "$1" = "" ]
then
echo -e "
\e[39m
Usage:
------
To clean the Spanish deck type: \e[36m./clean.sh \e[35mES\e[39m
To clean the Englsih deck type: \e[36m./clean.sh \e[35mEN\e[39m
To clean the German deck type: \e[36m./clean.sh \e[35mDE\e[39m

to clean all decks that will (b)lock computer for about 5h
type \e[36m./clean.sh \e[35mall\e[39m

available languages: \e[35m
$(cat allLanguages.txt) \e[39m
"
exit 0
fi

if  [ "$1" = "all" ]
then

echo -e "

cleaning all languages...

"

for i in $(cat allLanguages.txt)
do
 echo ./clean.sh $i
done

fi

if $(grep -q $1 allLanguages.txt)
 then 
   echo $1
 else
  echo -e "

   ⇨  \e[1m\e[33m\e[41m language \e[4mnot\e[24m available\e[0m"
 ./clean.sh
  echo -e "\e[21m"
 exit 1
fi



echo cleaning $1 ...

find assembled/ -name '*-*.svg' -exec rm '{}' \;
find pdf/ -type f -exec rm '{}' \;
find jpg/ -type f -exec rm '{}' \;
find png/ -type f -exec rm '{}' \;

