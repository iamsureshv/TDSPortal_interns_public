const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports= app =>{
    app.use(
        '/tds',
        createProxyMiddleware({
          // target: process.env.BASE_KEY,
          // target: env.BASE_KEY,
          target:  "https://ec2-13-201-42-175.ap-south-1.compute.amazonaws.com:9091",         
          changeOrigin: true,
          secure: false, 

        })
      ); 
}
