const { news } = require("../../news");
const db = require("../models");
const News = db.news;

// Create and Save a new News
exports.create = async (req, res) => {
  const stockCode = req.query.stockCode;

  // Validate request
  if (!stockCode) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  News.findById(stockCode)
    .then(async (data) => {
      if (data) {
        res.send("News already found");
        return;
      }
      if (!data) {
        const response = await news(stockCode);
        // Create a News
        const saveNews = new News({
          _id: stockCode,
          news: response.news,
        });

        // Save News in the database
        saveNews
          .save(saveNews)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the News.",
            });
          });
        return;
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
// Update a stocks by the stockCode in the request
exports.update = (req, res) => {
  const stockCode = req.query.stockCode;
  if (!stockCode) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  News.findById(stockCode)
    .then(async (data) => {
      if (data) {
        const response = await news(stockCode);
        const newsBody = {
          news: { ...data.news, ...response.news },
        };
        News.findByIdAndUpdate(stockCode, newsBody, {
          useFindAndModify: false,
        })
          .then((data) => {
            if (!data) {
              res.status(200).send({
                message: `Cannot update News with id=${stockCode}. Maybe News was not found!`,
              });
              return;
            }
            res.send({ message: "News was updated successfully." });
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating News with id=" + stockCode,
            });
          });
        return;
      }
      if (!data) {
        res.status(200).send({
          message: `Cannot update News with stockCode=${stockCode}. Maybe News was not found!`,
        });
        return;
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving News with stockCode=" + stockCode,
      });
    });
};

// Find a single news with an stockCode
exports.findOne = (req, res) => {
  const stockCode = req.query.stockCode;

  News.findById(stockCode)
    .then((data) => {
      if (!data) {
        res
          .status(200)
          .send({ message: "Not found news with stockCode " + stockCode });
        return;
      }
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving news with stockCode=" + stockCode });
    });
};

// Retrieve all News from the database.
exports.findAll = (req, res) => {
  News.find().then((result) => {
    res.send(result);
  });
};

// Delete a News with the specified stockcode in the request
exports.delete = (req, res) => {
  const stockCode = req.query.stockCode;

  News.findByIdAndRemove(stockCode)
    .then((data) => {
      if (!data) {
        res.status(200).send({
          message: `Cannot delete News with stockCode=${stockCode}. Maybe News was not found!`,
        });
      } else {
        res.send({
          message: "News was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete News with stockCode=" + stockCode,
      });
    });
};
// Delete all News from the database.
exports.deleteAll = (req, res) => {
  News.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} stockCode were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all stockCode.",
      });
    });
};
