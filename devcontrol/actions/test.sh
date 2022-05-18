#!/bin/bash

set -e

# @description Test zape app
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
function test() {

    # Init
    local briefMessage="Test zape app"
    local helpMessage="Test zape app: execute test and get code coverage report"

    # Task choosing
    case "$1" in
        brief)
            showBriefMessage "${FUNCNAME[0]}" "$briefMessage"
            ;;
        help)
            showHelpMessage "${FUNCNAME[0]}" "$helpMessage"
            ;;
        exec)
            npm run test
            npm run test:cov
            ;;
        *)
            showNotImplemtedMessage "$1" "${FUNCNAME[0]}"
            return 1
    esac
}

# Main
test "$@"