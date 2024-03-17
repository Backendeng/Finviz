module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      _id: String,
      news: Object,
    },
    { timestamps: true },
    { _id: false }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const News = mongoose.model("news", schema);
  return News;
};
