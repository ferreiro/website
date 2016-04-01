#!/bin/bash

while true
do
  lessc public/css/style.less public/css/style.css
  sleep 0.5
  echo "Less Compiled!"
done
