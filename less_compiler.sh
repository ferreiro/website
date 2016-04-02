#!/bin/bash
# Some parts of this script was taken from https://gist.github.com/JamieMason/4761049

# For console colors: http://bluesock.org/~willg/dev/ansi.html

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

# return 1 if local npm package is installed at ./node_modules, else 0
# example
# echo "gruntacular : $(npm_package_is_installed gruntacular)"
function npm_package_is_installed {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  ls node_modules | grep $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}
# 
# echo "less  $(echo_if $(npm_package_is_installed less))"
# echo "less  $(echo_if $(npm_package_is_installed less-plugin-clean-css))"

npm install less -g
npm install less-plugin-clean-css -g

while true
do
  lessc public/css/style.less public/css/style.css --clean-css="--s1 --advanced --compatibility=ie8"
  sleep 0.5
  printf "\e[32m" # put output green http://bluesock.org/~willg/dev/ansi.html
  echo "Less Compiled!"
done
