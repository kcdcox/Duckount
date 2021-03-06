const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        proxy: {
            '/api': {
                logLevel: 'info', // or 'debug'
                target: 'http://localhost:5009'
            }
        }
    },
    
}