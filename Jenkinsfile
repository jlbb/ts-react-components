pipeline {
    agent {
        docker {
            image 'ts-react-component'
            registryUrl "https://registry.hub.docker.com"
            registryCredentialsId "dockerhub"
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage("Build") {
            docker.build("jlbb/ts-react-components")
        }

        stage("Push") {
            docker.push("${env.BUILD_ID}")
            docker push("latest")
        }
        
        stage("Pull & Up") {
            docker.pull("jbpino/ts-react-app")
            sh 'docker-compose build'
            sh 'docker-compose up'
        }
    }
}