module.exports = (app) => {
  const stocks = require("../controllers/stocks.controller.js");

  var router = require("express").Router();

  // Retrieve all stocks
  router.post("/", stocks.findAll);

  // Retrieve stock by stockCode
  router.get("/:stockCode", stocks.findOne);

  // Update a stock with stockCode
  router.put("/:stockCode", stocks.update);

  // Delete a stock with stockCode
  router.delete("/:id", stocks.delete);

  // Create a new stock
  router.delete("/", stocks.deleteAll);

  app.use("/api/stocks", router);
};
