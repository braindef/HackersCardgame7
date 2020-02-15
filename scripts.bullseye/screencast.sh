#!/bin/bash

sudo apt-get install kazam

df -h
sleep 5
free -h
sleep 5
cat /proc/cpuinfo  |grep i7
sleep 5

sudo apt-get install screenkey


/usr/bin/gnome-system-monitor &

sleep 10

/usr/bin/baobab &

sleep 3

vim TODO.txt

vim README.md

