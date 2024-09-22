const mongoose = require("mongoose");

const db_url = process.env.MONGO_CON;

mongoose.connect(db_url)
  .then(() => {
    console.log("MongoDB Connected..");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error", err);
  });
