const { MongoClient } = require("mongodb");

export default new MongoClient(
  process.env.MONGO_DB_URI || "mongodb://localhost:27017/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
