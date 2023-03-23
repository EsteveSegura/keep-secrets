require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {createProxyMiddleware} = require('http-proxy-middleware');
const tokenValidator = require('./infrastructure/http/middleware/token-validator');

const app = express();

const {server:{port}} = require('./infrastructure/config');

const secretProxy = createProxyMiddleware({
  target: 'http://localhost:3001/',
  changeOrigin: true,
  pathRewrite: {
    '^/secrets': '/secrets',
  },
  loglevel: 'info',
});

const docsProxy = createProxyMiddleware({
  target: 'http://localhost:4000/',
  changeOrigin: true,
  pathRewrite: {
    '^/docs': '/docs',
  },
  loglevel: 'info',
});

app.use(cors());
app.use(tokenValidator);
app.use('/api/v1/secrets', secretProxy);
app.use('/docs', docsProxy);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
