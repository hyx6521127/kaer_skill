module.exports = {
    HOST: 'localhost',
    port: 3000,
    proxy: {
        '/': {
            target:'http://localhost:80',
            pathRewrite: {
                '^/api': '/api'
            }
        }
    }
}