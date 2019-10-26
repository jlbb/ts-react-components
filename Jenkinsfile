pipeline {
    agent any
    environment {
        CI = 'true'
    }
    
    stages {
        stage("Build") {
            steps {
                // Build and push image with Jenkins' docker-plugin
                script {
                    withCredentials([
                        usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD'),
                        string(credentialsId: 'mongoDbURI', variable: 'MONGO_DB_URI')
                    ]) {
                        // Copy Mongo Database URI to the .env (created on the fly) file
                        sh 'echo MONGO_DB_URI=\"${MONGO_DB_URI}\" > .env'
                        
                        sh 'docker-compose build'
                        // sh 'docker-compose push'
                    }
                }
            }
        }

        // stage("Pull") {
        //     steps {
        //         sh 'docker pull jbpino/ts-react-app_client'
        //         sh 'docker pull jbpino/ts-react-app_api'
        //     }
        // }
        
        stage("Compose") {
            steps {
                sh 'docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d'
            }
        }
    }

    // post {
    //     always {
    //         sh 'docker-compose down -v'
    //     }
    // }
}