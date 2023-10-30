const mongoose = require("mongoose");
const connectionString = process.env.MONGODB_URI;
const { DB_NAME } = require("../../constants");

const connectionDB = () => {
  mongoose
    .connect(`${connectionString}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => {
      console.log(
        `✅✅✅ MongoDB Connected! ✅✅✅ \n☘️  Db host: ${connection.connection.host}\n`
      );
    })
    .catch((error) => {
      console.log("❌❌❌ Unable to connect to MongoDB ❌❌❌");
      process.exit(1);
    });
};

module.exports = connectionDB;
