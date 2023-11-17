pipeline {

  agent any
  tools {
    nodejs '18.17.1'
  }

    environment {
    // Địa chỉ IP của server
    SERVER_IP = '14.225.254.123'
  }

  stages {
    stage('Log all data'){
        steps {
        sh 'git log --pretty=format:"%h %s" --graph -10' 
        }
    }

    stage('Install pm2'){
        steps {
        sh 'npm install pm2 -g -s' 
        }
    }

    // stage('Stop all pm2 processes'){
    //     steps {
    //     sh 'pm2 stop all' 
    //     }
    // }

    // stage('Delete all pm2 processes'){
    //     steps {
    //     sh 'pm2 delete all' 
    //     }
    // }

    stage('Install back-end dependencies') {
      steps {
        dir('back-end') {
          sh 'npm install'
        }
      }
    }
    
    stage('Start Backend') {
      steps {
        dir('back-end') {
          sh 'pm2 start "npm start -- --port=3003" --name "back-end"' 
        }
      }
    }
    
    stage('Install front-end dependencies') {
      steps {
        dir('front-end') {
          sh 'npm install'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir('front-end') {
          sh 'npm run build' 
        }
      }
    }

    stage('Start Frontend') {
      steps {
        dir('front-end') {
          sh 'pm2 start "npm run serve -- --port=3006" --name "front-end"' 
        }
      }
    }

    stage('Pm2 force save'){
        steps {
        sh 'pm2 save --force' 
        }
    }

  }

}