// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/osdr',
    createProxyMiddleware({
      target: 'https://osdr.nasa.gov',
      changeOrigin: true,
      pathRewrite: {
        '^/osdr': '/osdr'  // Rewrite paths if necessary
      },
    })
  );
};
