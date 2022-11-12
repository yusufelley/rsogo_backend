const express = require("express");
// Import the mongoose module
const mongoose = require("mongoose");
const app = express();
const PORT = 3001;
// Set up default mongoose connection
const mongoDB =
  "mongodb+srv://rsogo_user:EasBeQY1AlZKZZCZ@rsogocluster.8wj3ikw.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("connected to MongoDB!"))
  .catch((err) => console.log("MongoDB Error !!\n", err));
// Get the default connection
const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.listen(PORT, (error) => {
  if (!error) console.log("running");
});
