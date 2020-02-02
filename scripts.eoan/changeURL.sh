#!/bin/bash

for i in $(find $1 -name '*.svg'); do sed -i 's/https:\/\/0x8.ch\/HackersCardgame6/https:\/\/0x8.ch\/HackersCardgame7/g' "$i"; done
