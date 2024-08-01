const mongoose = require("mongoose");
const express = require("express");
const question = require("./routes/questionRoute");
const app = express();
const cors = require("cors");

mongoose
  .connect("mongodb://localhost/quiz-app")
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log("Could not connect to database...", err));

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL if different
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/api/quiz", question);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
