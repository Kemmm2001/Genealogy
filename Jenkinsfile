pipeline {

  agent any
  tools {
    nodejs '18.17.1'
  }
  stages {
    stage('Log all data'){
        steps {
        sh 'git log --pretty=format:"%h %s" --graph -10' 
        }
    }

    stage('Install pm2'){
        steps {
        sh 'npm install pm2 -g' 
        }
    }

    stage('Stop all pm2'){
        steps {
          sh 'pm2 stop all' 
        }
    }
    
    stage('Build Backend') {
      steps {
        dir('back-end') {
          sh 'npm install'
        }
      }
    }
    
    stage('Start Backend') {
      steps {
        dir('back-end') {
          sh 'pm2 start "npm start" --name "back-end"' 
        }
      }
    }
    
    stage('Stop Frontend') {
      steps {
        dir('front-end') {
          sh 'pm2 stop "front-end"'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir('front-end') {
          sh 'npm install'
        }
      }
    }

    stage('Start Frontend') {
      steps {
        dir('front-end') {
          sh 'pm2 start "npm run build" --name "front-end"' 
        }
      }
    }

  }

}