//Webpack requires this to work with directories
const path =  require('path');

module.exports = {
  
    entry: './src/server.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
  
    //default mode is production
    mode: 'development',
    resolve: {
        fallback: { 
          "http": require.resolve("stream-http"),
          "buffer": require.resolve("buffer/"),
          "url": require.resolve("url/")
        },
    },
}