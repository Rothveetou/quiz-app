const { Question, validate } = require("../models/questionSchema");
const express = require("express");
const router = express.Router();

router.get("/get", async (req, res) => {
  try {
    const question = await Question.find().sort({ question: 1, options: 1 });
    res.json(question);
    console.log(question);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/add", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let question = new Question({
      question: req.body.question,
      options: req.body,
      correctOption: req.body.correctOption,
      points: req.body.points,
    });
    question = await question.save();
    res.json(question);
    console.log(question);
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    // Validate the request body
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Update the question with the provided data
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      {
        question: req.body.question,
        options: req.body.options,
        correctOption: req.body.correctOption,
        points: req.body.points,
      },
      { new: true } // Return the updated document
    );

    // If the question is not found, return a 404 error
    if (!question) return res.status(404).send("Question not found.");

    // Send the updated question as the response
    res.send(question);
  } catch (err) {
    // Log any errors and send a 500 error response
    console.log(err.message);
    res.status(500).send("Internal server error.");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    // Find the question by ID and delete it
    const question = await Question.findByIdAndRemove(req.params.id);

    // If the question is not found, return a 404 error
    if (!question) return res.status(404).send("Question not found.");

    // Send a success message
    res.send("Question deleted successfully.");
  } catch (err) {
    // Log any errors and send a 500 error response
    console.log(err.message);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
