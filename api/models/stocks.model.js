// Define the schema and model for storing all the stock data
module.exports = mongoose => {
  const StockSchema = new mongoose.Schema({
    ticker: String,
    company: String,
    sector: String,
    industry: String,
    country: String,
    marketcap: String,
    pe: String,
    price: String,
    change: String,
    volume: String,
  });

  const Schema = new mongoose.Schema({
    alldatas: [StockSchema], // Embedding StockSchema within the main schema
  });

  // Define the model using the main schema
  const Stocks = mongoose.model("Stocks", Schema); // Use "Stocks" as the model name

  return Stocks;
};
