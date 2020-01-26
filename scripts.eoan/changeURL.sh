#!/bin/bash

for i in $(find $1 -name '*.svg'); do sed -i 's/https:\/\/0x8.ch\/HackersCardgame5/https:\/\/0x8.ch\/HackersCardgame6/g' "$i"; done
