#!/bin/bash
# Some parts of this script was taken from https://gist.github.com/JamieMason/4761049

# For console colors: http://bluesock.org/~willg/dev/ansi.html

NODE_MODULES_DIR='./../node_modules'

# display a message in red with a cross by it
# example
# echo echo_fail "No"
function echo_fail {
  # echo first argument in red
  printf "\e[31m✘ ${1}"
  # reset colours back to normal
  echo "\033[0m"
}

# display a message in green with a tick by it
# example
# echo echo_fail "Yes"
function echo_pass {
  # echo first argument in green
  printf "\e[32m✔ ${1}"
  # reset colours back to normal
  echo "\033[0m"
}

# echo pass or fail
# example
# echo echo_if 1 "Passed"
# echo echo_if 0 "Failed"
function echo_if {
  if [ $1 == 1 ]; then
    echo_pass $2
  else
    echo_fail $2
  fi
}

#https://gist.github.com/JamieMason/4761049
# return 1 if local npm package is installed at ./node_modules, else 0
# example
# echo "gruntacular : $(npm_package_is_installed gruntacular)"
function npm_package_is_installed {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  ls $NODE_MODULES_DIR | grep $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

# Install less if not found
if [ $(npm_package_is_installed less) == 0 ]; then
  npm install less --save-dev
fi

# Install less-plugin-clean-css if not installed
if [ $(npm_package_is_installed less-plugin-clean-css) == 0 ]; then
  npm install less-plugin-clean-css --save-dev
fi

while true
do
  lessc css/style.less css/style.css --clean-css="--s1 --advanced --compatibility=ie8"
  sleep 0.5
  printf "\e[32m" # put output green http://bluesock.org/~willg/dev/ansi.html
  echo "Less Compiled!"
done
