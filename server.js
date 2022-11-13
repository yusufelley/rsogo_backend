const express = require("express");
const app = express();
// Import the mongoose module
const mongoose = require("mongoose");
const cors = require("cors");
const Event = require("./Models/event");
const { response } = require("express");
const PORT = 3001;
app.use(cors());
app.use(express.json());
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

app.use(express.urlencoded({ extended: true }));

app.get("/event/:rso", (req, res) => {
  console.log("requesting rso events...");
  const rso = req.params.rso;
  console.log(rso);

  Event.find({ rso: rso })
    .then((result) => res.send({ data: result }))
    .catch((error) => console.log(error));
});

app.post("/CreateEvent", (req, res) => {
  //console.log(req.body);
  const event = new Event(req.body);

  event
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(PORT, (error) => {
  if (!error) console.log("running");
});
