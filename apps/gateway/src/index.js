require('dotenv').config();
const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const tokenValidator = require('./infrastructure/http/middleware/token-validator');
const cors = require('cors');


const secretProxy = createProxyMiddleware({
  target: 'http://localhost:3000/',
  changeOrigin: true,
  pathRewrite: {
    '^/secrets': '/secrets',
  },
  loglevel: 'info',
});

const app = express();
app.use(cors())
const port = process.env.PORT || 3000;

app.use(tokenValidator);
app.use('/api/v1/secrets', secretProxy);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
