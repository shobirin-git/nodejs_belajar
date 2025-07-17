const express = require("express");
const { specs, swaggerUi } = require('./swagger.js');
const app = express();
const port = 3333;

const cors = require("cors");
const bodyParser = require("body-parser");
const { connect } = require("./db.js");
const salesRoutes = require("./routes/Sales.js");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

connect()
  .then((connection) => {
    console.log("Connected to the database.");
  })
  .catch((error) => {
    console.log("Database connection failed!");
    console.log(error);
  });

app.use("/sales", salesRoutes.router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
