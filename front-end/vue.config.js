const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 3008,  
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
})
