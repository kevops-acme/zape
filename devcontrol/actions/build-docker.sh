#!/bin/bash

set -e

# @description Build zape docker image
#
# @example
#   build
#
# @arg $1 Task: "brief", "help" or "exec"
#
# @exitcode The exit code of the statements of the action
# @exitcode 1  If the task is not implemented
#
# @stdout "Not implemented" message if the requested task is not implemented
#
function build-docker() {

    # Init
    local briefMessage="Build zape docker image"
    local helpMessage="Build the zape docker image"

    # Task choosing
    case "$1" in
        brief)
            showBriefMessage "${FUNCNAME[0]}" "$briefMessage"
            ;;
        help)
            showHelpMessage "${FUNCNAME[0]}" "$helpMessage"
            ;;
        exec)
            TAG=$(getVersion)
            docker build -t kevopsacademy/zape-app:"$TAG" .
            ;;
        *)
            showNotImplemtedMessage "$1" "${FUNCNAME[0]}"
            return 1
    esac
}

# Main
build-docker "$@"