const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const docs = require('./docs');

const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use('/docs',swaggerUI.serve,swaggerUI.setup(docs));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
