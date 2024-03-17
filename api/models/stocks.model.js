module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      _id: String,
      stockCode: String,
      image: Buffer,
      marketcap: String,
      prevClose: String,
      avgVolume: String,
      price: String,
      volume: String,
      change: String,
      changeColor: String,
    },
    { timestamps: true },
    { _id: false }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Stocks = mongoose.model("stocks", schema);
  return Stocks;
};
