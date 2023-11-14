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
        sh 'npm install pm2 -g -s' 
        }
    }

stage('Stop all pm2 processes'){
    steps {
        script {
            // Kiểm tra xem có quy trình nào đang chạy không
            def processes = sh(script: 'pm2 list', returnStdout: true).trim()

            // Kiểm tra xem có quy trình nào không
            if (processes.contains('PM2')) {
                // Nếu có quy trình, thì dừng tất cả
                sh 'pm2 stop all' 
            } else {
                echo 'Không có quy trình nào đang chạy.'
            }
        }
    }
}

stage('Delete all pm2 processes'){
    steps {
        script {
            // Kiểm tra xem có quy trình nào đang chạy không
            def processes = sh(script: 'pm2 list', returnStdout: true).trim()

            // Kiểm tra xem có quy trình nào không
            if (processes.contains('PM2')) {
                // Nếu có quy trình, thì xóa tất cả
                sh 'pm2 delete all' 
            } else {
                echo 'Không có quy trình nào đang chạy.'
            }
        }
    }
}
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
          sh 'pm2 start "npm start" --name "back-end"' 
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
          sh 'pm2 start "npm run serve" --name "front-end"' 
        }
      }
    }

  }

}