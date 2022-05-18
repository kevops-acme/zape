#!groovy

@Library('github.com/ayudadigital/jenkins-pipeline-library@v6.3.0') _

// Initialize global config
cfg = jplConfig('zape', 'backend' ,'', [email: 'pedro.rodriguez+kevops@kairosds.com'])
cfg.commitValidation.enabled = false

pipeline {
    agent { label 'docker' }

    stages {
        stage ('Initialize') {
            steps  {
                jplStart(cfg)
            }
        }
        stage ("Install") {
            steps {
                sh "bin/devcontrol.sh ci"
            }
        }
        stage ("Test") {
            steps {
                sh "bin/devcontrol.sh test"
            }
        }
        stage ("Build docker image") {
            when {
                anyOf {
                    branch 'PR-*';
                    branch 'main'
                }
            }
            steps {
                sh "bin/devcontrol.sh build-docker"
            }
        }
        stage ("Deploy") {
            when { branch 'main' }
            steps {
                sshagent (credentials: ['jpl-ssh-credentials']) {
                    sh "bin/devcontrol.sh deploy ubuntu@zape.app.kevops.academy"
                }
            }
        }
    }

    post {
        always {
            jplPostBuild(cfg)
            deleteDir()
        }
    }

    options {
        timestamps()
        ansiColor('xterm')
        buildDiscarder(logRotator(artifactNumToKeepStr: '20',artifactDaysToKeepStr: '30'))
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
    }
}
