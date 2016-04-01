#!/bin/bash

while true
do
  lessc public/css/style.less public/css/style.css --clean-css="--s1 --advanced --compatibility=ie8"
  sleep 0.5
  echo "Less Compiled!"
done
