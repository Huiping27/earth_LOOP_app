pipeline {
    agent any

    environment {
        MONGO_URI = 'mongodb://localhost:27017/flightco2tracker'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from your GitHub repository
                git url: 'https://github.com/Huiping27/earth_LOOP_app', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                // Run tests
                sh 'npm test'
            }
        }
    }

    post {
        always {
            // Archive test results and logs
            junit '**/test-results.xml'
            archiveArtifacts artifacts: 'logs/**/*.log', allowEmptyArchive: true
        }
    }
}
