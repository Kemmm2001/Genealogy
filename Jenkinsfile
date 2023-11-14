pipeline {

  agent any
  
  stages {
    stage('Log all data'){
        steps {
        sh 'git log --pretty=format:"%h %s" --graph -20' 
        sh 'pm2 ls'
        }
    }

    stage('Stop Backend') {
      steps {
        dir('back-end') {
          sh 'pm2 stop "back-end"'
        }
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