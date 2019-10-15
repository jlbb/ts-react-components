pipeline {
    agent {
        docker {
            image 'node:11.0.0'
            args '-u root'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'rm -rf node_modules'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'npm run test'
            }
        }
        stage('Deploying') {
            steps {
                echo 'Deploying...'
                sh 'npm run build'
            }
        }
    }
}