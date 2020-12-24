// 아이피,데이터를 proxy server에서 임의 바꿀수 있음
// 방화벽,웹 필터, 캐쉬데이터, 공유 데이터 제공 
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};