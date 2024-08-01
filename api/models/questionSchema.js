const mongoose = require("mongoose");
const Joi = require("joi");

const Question = mongoose.model(
  "question",
  mongoose.Schema({
    question: { type: String, minlength: 5, maxlength: 255, required: true },
    options: { type: Array, required: true },
    correctOption: { type: Number, required: true },
    points: { type: Number, required: true },
  })
);

function validateQuestion(question) {
  const schema = Joi.object({
    question: Joi.string().min(5).max(255).required(),
    options: Joi.required(),
    correctOption: Joi.number().required(),
    points: Joi.number().required(),
  });
  return schema.validate(question);
}

exports.Question = Question;
exports.validate = validateQuestion;
