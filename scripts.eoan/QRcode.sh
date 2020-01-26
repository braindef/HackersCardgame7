#!/bin/bash

sudo apt-get install qrencode

#qrencode -o dev.png https://github.com/braindef/Shrink-Disorder-Tarot-0.2.0
#qrencode -o website.png http://marclandolt.ch/Shrink-Disorder-Tarot-0.2.0

qrencode -t svg -o dev.svg https://github.com/braindef/Hackers-Cardgame
qrencode -t svg -o website.svg http://marclandolt.ch/Hackers-Cardgame
qrencode -t svg -o retailSurveillance.svg https://media.ccc.de/v/33c3-8238-retail_surveillance_retail_countersurveillance#video&t=476
