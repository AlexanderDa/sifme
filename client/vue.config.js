module.exports = {
    outputDir: process.env.OUTPUT || '../public/client',
    transpileDependencies: ['vuetify'],
    devServer: {
        proxy: {
            '/api': {
                target: process.env.PROXY || 'http://localhost:3000/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
