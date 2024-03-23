const { stockInfo } = require("../../stockInfo");
const db = require("../models");
const Stocks = db.stocks;

// Create and Save a new Stocks
exports.create = (req, res) => {
  const stockCode = req.query.stockCode;

  // Validate request
  if (!stockCode) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  Stocks.findById(stockCode)
    .then(async (data) => {
      if (data) {
        res.send("Stocks already found");
        return;
      }
      if (!data) {
        const response = await stockInfo(stockCode);
        // Create a Stocks
        const saveStocks = new Stocks({
          _id: stockCode,
          stockCode,
          image: response.image.value,
          marketcap: response.marketcap.value,
          prevClose: response.prevClose.value,
          avgVolume: response.avgVolume.value,
          price: response.price.value,
          volume: response.volume.value,
          change: response.change.value,
          changeColor: response.changeColor.value,
        });

        // Save Stocks in the database
        saveStocks
          .save(saveStocks)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Stocks.",
            });
          });
        return;
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving stocks with stockCode=" + stockCode,
      });
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

  Stocks.findById(stockCode)
    .then(async (data) => {
      if (data) {
        const response = await stockInfo(stockCode);
        const stocksBody = {
          stockCode,
          image: response.image.value,
          marketcap: response.marketcap.value,
          prevClose: response.prevClose.value,
          avgVolume: response.avgVolume.value,
          price: response.price.value,
          volume: response.volume.value,
          change: response.change.value,
          changeColor: response.changeColor.value,
        };
        Stocks.findByIdAndUpdate(stockCode, stocksBody, {
          useFindAndModify: false,
        })
          .then((data) => {
            if (!data) {
              res.status(200).send({
                message: `Cannot update Stocks with stockCode=${stockCode}. Maybe stocks was not found!`,
              });
              return;
            }
            res.send({ message: "Stocks was updated successfully." });
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Stocks with stockCode=" + stockCode,
            });
          });
        return;
      }
      if (!data) {
        res.status(200).send({
          message: `Cannot update Stocks with stockCode=${stockCode}. Maybe Stocks was not found!`,
        });
        return;
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Stocks with stockCode=" + stockCode,
      });
    });
};

const isDatabaseEmpty = async () => {
  const count = await Stocks.countDocuments();
  return count === 0;
};

exports.findAll = async (req, res) => {
  const getData = req.body.get_data;
  var parameterData;
  try {
    const isEmpty = await isDatabaseEmpty();
    const savedStocks = [];
    if (isEmpty) {
      for (let i = 0; i < 476; i++) {
        if (i == 0) {
          parameterData = `${getData}`;
        } else {
          parameterData = `${getData}&r=${i * 20 + 1}`;
        }

        // console.log()
        const stocksDetails = await stockInfo(parameterData);
        // return
        for (const stockDetail of stocksDetails) {
          const stockData = {
            ticker: stockDetail.ticker.value,
            company: stockDetail.company.value,
            sector: stockDetail.sector.value,
            industry: stockDetail.industry.value,
            country: stockDetail.country.value,
            marketcap: stockDetail.marketcap.value,
            pe: stockDetail.pe.value,
            price: stockDetail.price.value,
            change: stockDetail.change.value,
            volume: stockDetail.volume.value,
          };
          savedStocks.push(stockData);
        }
      }
      const newStocksDocument = new Stocks({ alldatas: savedStocks });
      await newStocksDocument.save();
      return res.status(201).send({ message: "success", data: savedStocks });
    } else {
      const allStocks = await Stocks.find({});
      return res.status(200).send({ message: "success", data: allStocks });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "error" });
  }
};

// Find a single stocks with an stockCode
exports.findOne = (req, res) => {
  const stockCode = req.query.stockCode;

  Stocks.findById(stockCode)
    .then((data) => {
      if (!data) {
        res
          .status(200)
          .send({ message: "Not found stocks with id " + stockCode });
        return;
      }
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving stocks with id=" + stockCode });
    });
};

// Delete a stocks with the specified stockcode in the request
exports.delete = (req, res) => {
  const stockCode = req.query.stockCode;

  Stocks.findByIdAndRemove(stockCode)
    .then((data) => {
      if (!data) {
        res.status(200).send({
          message: `Cannot delete Stocks with stockCode=${stockCode}. Maybe Stocks was not found!`,
        });
      } else {
        res.send({
          message: "Stocks was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Stocks with stockCode=" + stockCode,
      });
    });
};
// Delete all stocks from the database.
exports.deleteAll = (req, res) => {
  Stocks.deleteMany({})
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
