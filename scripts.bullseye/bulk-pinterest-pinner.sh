#!/bin/bash



for i in $(seq 110 -1 0)
do
  xdotool mousemove 1200 300
  sleep 0.3
  xdotool click 1
  sleep 1
  xdotool mousemove 1280 510
  sleep 0.3
  xdotool click 1
  sleep 0.3
  xdotool mousemove 700 600
  sleep 1
  xdotool click 1
  echo $i
  sleep 1
  for j in $(seq 0 $i)
  do
    echo $j
    xdotool key Down
  done
  sleep 1
  xdotool key KP_Enter
  sleep 3
  xdotool mousemove 1320 300
  sleep 1
  xdotool click 1
  sleep 1
  xdotool mousemove 700 600
  sleep 1
  xdotool key Tab
  sleep 1
  xdotool key KP_Enter
  sleep 1
  xdotool key Escape
  sleep 1
done
