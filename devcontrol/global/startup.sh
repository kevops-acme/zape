#!/bin/bash

# @file devcontrol/global/startup.sh
# @brief devcontrol startup script and functions
echo "Kevops Academy - Zape (c) 2022"
echo

# @description Check presence of docker-related pieces in the system
# The function aborts the execution if the system dont have docker installed
#
# @example
#   checkDocker
#
# @noargs
#
# @exitcode 0  If docker exist, abort execution if other case and return 1 to the system
#
# @stdout Show "Docker not present. Exiting -" message if missing docker
#
function checkDocker() {
    which docker docker-compose > /dev/null 2>&1 || bash -c 'echo "Missing docker: aborting"; exit  1'
}
export -f checkDocker

# @description Get zape app version from pom.xml
#
# @example
#   getVersion
#
# @noargs
#
# @exitcode 0
#
# @stdout Show version
function getVersion() {
    awk '/version/{gsub(/("|",)/,"",$2);print $2}' package.json
}
export -f getVersion
