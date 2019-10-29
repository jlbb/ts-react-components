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
                    withCredentials([
                        usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD'),
                        string(credentialsId: 'mongoDbURI', variable: 'MONGO_DB_URI')
                    ]) {
                        // Copy Mongo Database URI to the .env (created on the fly) file
                        sh 'echo MONGO_DB_URI=\"${MONGO_DB_URI}\" > .env'
                        
                        sh 'docker-compose build --no-cache'
                    }
                }
            }
        }

        stage("Push") {
            steps {
                // Push image with Jenkins' docker-plugin
                script {
                    withCredentials([
                        usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD'),
                    ]) {
                        sh 'docker-compose push'

                    }
                }

                    sh 'if [ $(docker-compose images -q | wc -l) -gt 0 ]; then \
                        docker rmi $(docker-compose images -q) --force; \
                    fi'
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