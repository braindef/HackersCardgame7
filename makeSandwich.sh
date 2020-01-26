#!/bin/bash



find ./cards/ -maxdepth 1 -type d| grep -v ^.$ |cut -c 9-  |grep -v ^$ >all.txt

if  [ "$1" = "" ]
then
echo -e "
\e[39m
Usage:
------
To generate the Spanish deck type: \e[36m./makeSandwich.sh \e[35mES\e[39m
To generate the Englsih deck type: \e[36m./makeSandwich.sh \e[35mEN\e[39m
To generate the German deck type: \e[36m./makeSandwich.sh \e[35mDE\e[39m

to generate all decks that will (b)lock computer for about 5h
type \e[36m./makeSandwich.sh \e[35mall\e[39m

available languages: \e[35m
$(cat all.txt) \e[39m
"
exit 0
fi

if  [ "$1" = "all" ]
then

echo -e "

making all sandwiches, go and do something else...

"

killall clipit

for i in $(cat all.txt)
do
 echo ./makeSandwich.sh $i
done

fi

if $(grep -q $1 all.txt)
 then 
   echo $1
 else
  echo -e "

   ⇨  \e[1m language \e[4mnot\e[24m available"
 ./makeSandwich.sh
  echo -e "\e[21m"
 exit 1
fi


mkdir -p pdf/$1
mkdir -p png/$1
mkdir -p jpg/$1
mkdir -p pdf/$1


cd ./scripts
./generatePNGs.sh $1
./convert2JPGs.sh $1
./generateA4.sh $1
./generateA6.sh $1
./generatePDFs.sh $1

echo -e "
now you can got to eg the directory assembled/DE/A6 and run ./printAll.sh
to print your German (DE) cards on A6 sheets on your \e1mdefault printer\e21m 
(select first the correct printer as default, you must be su to do so)

or cd assembled/EN/A4 ./printAll.sh to print all your cards on A4 Sheets
remember, if you laminate them the look better and are more stabile

have fun...
"

