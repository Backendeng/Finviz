module.exports = (mongoose) => {
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
  const Stocks = mongoose.model("Stock", StockSchema);
  return Stocks;
};
