require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const morgan = require('morgan');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
const secretRoutes = require('./infrastructure/http/secret-controller');

app.use('/api/v1/secrets', secretRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
