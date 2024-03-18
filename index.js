const express = require("express");
const { news } = require("./news");
const { stockInfo } = require("./stockInfo");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const db = require("./api/models");
var PORT = process.env.PORT || 8080;

app.use(cors({}));

// Make sure you place body-parser before your CRUD handlers!

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./api/routes/stocks.routes")(app);
require("./api/routes/news.routes")(app);
// set port, listen for requests

// db.mongoose
//   .connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {})
//   .catch((err) => {
//     console.error("Connection error", err);
//     process.exit();
//   });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
