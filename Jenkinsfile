pipeline {
    agent any
    environment {
        CI = 'true'
    }
    
    stages {
        stage("Build") {
            steps {
                sh 'docker-compose rm -fsv'

                sh 'if [ $(docker-compose images -q | wc -l) -gt 0 ]; then \
                        docker rmi $(docker-compose images -q) --force; \
                    fi'

                // Build image with Jenkins' docker-plugin
                script {
                    withCredentials([string(credentialsId: 'mongoDbURI', variable: 'MONGO_DB_URI')]) {
                        // Copy Mongo Database URI to the .env (created on the fly) file
                        sh 'echo MONGO_DB_URI=\"${MONGO_DB_URI}\" > .env'
                        
                        sh 'docker-compose -f docker-compose.yml -f docker-compose.production.yml build --no-cache'
                    }
                }

                sh 'if [ $(docker images --filter dangling=true -q --no-trunc | wc -l) -gt 0 ]; then \
                    docker rmi $(docker images --filter dangling=true -q --no-trunc) --force; \
                fi'
            }
        }

        stage("Push") {
            steps {
                // Push image with Jenkins' docker-plugin
                // With docker-compose installed in server we need gnupg2 => https://stackoverflow.com/a/57485107/1186541
                withDockerRegistry([ credentialsId: 'dockerhub', url: "" ]) {
                    // sh 'docker-compose push'
                    sh 'docker tag jbpino/ts-react-app_client jbpino/ts-react-app_client:${BUILD_NUMBER}'
                    sh 'docker push jbpino/ts-react-app_client:${BUILD_NUMBER}'
                    sh 'docker push jbpino/ts-react-app_client'
                    
                    sh 'docker tag jbpino/ts-react-app_api:latest jbpino/ts-react-app_api:${BUILD_NUMBER}'
                    sh 'docker push jbpino/ts-react-app_api:${BUILD_NUMBER}'
                    sh 'docker push jbpino/ts-react-app_api'
                }

                sh 'if [ $(docker-compose images -q | wc -l) -gt 0 ]; then \
                    docker rmi $(docker-compose images -q) --force; \
                fi'

                sh 'docker rmi jbpino/ts-react-app_client:${BUILD_NUMBER}'
                sh 'docker rmi jbpino/ts-react-app_client:latest'
                sh 'docker rmi jbpino/ts-react-app_api:${BUILD_NUMBER}'
                sh 'docker rmi jbpino/ts-react-app_api:latest'
            }
        }

        stage("Pull") {
            steps {
                sh 'docker-compose pull'
            }
        }

        stage("Tests") {
            steps {
                sh 'echo TODO: Add image tests'
            }
        }
        
        stage("Compose build & Up") {
            steps {
                sh 'docker-compose -f docker-compose.yml -f docker-compose.production.yml up --build -d'
            }
        }
    }

    post {
        always {
            sh 'if [ $(docker images --filter dangling=true -q --no-trunc | wc -l) -gt 0 ]; then \
                    docker rmi $(docker images --filter dangling=true -q --no-trunc) --force; \
                fi'
        }
    }
}