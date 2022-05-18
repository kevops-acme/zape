#!/bin/bash

set -e

# @description Install zape node modules
#
# @example
#   ci
#
# @arg $1 Task: "brief", "help" or "exec"
#
# @exitcode The exit code of the statements of the action
# @exitcode 1  If the task is not implemented
#
# @stdout "Not implemented" message if the requested task is not implemented
#
function ci() {

    # Init
    local briefMessage="Install zape node modules"
    local helpMessage="Install zape node modules, only to check if we can execute 'npm ci'"

    # Task choosing
    case "$1" in
        brief)
            showBriefMessage "${FUNCNAME[0]}" "$briefMessage"
            ;;
        help)
            showHelpMessage "${FUNCNAME[0]}" "$helpMessage"
            ;;
        exec)
            npm ci
            ;;
        *)
            showNotImplemtedMessage "$1" "${FUNCNAME[0]}"
            return 1
    esac
}

# Main
ci "$@"