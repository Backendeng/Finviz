module.exports = (app) => {
  const news = require("../controllers/news.controller");

  var router = require("express").Router();

  // Create a new News
  router.post("/", news.create);

  // Retrieve all News
  router.get("/", news.findAll);

  // Retrieve news by stockCode
  router.get("/:stockCode", news.findOne);

  // Update a news with stockCode
  router.put("/:stockCode", news.update);

  // Delete a stock with stockCode
  router.delete("/:id", news.delete);

  // Create a new stock
  router.delete("/", news.deleteAll);

  app.use("/api/news", router);
};
