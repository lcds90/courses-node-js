const mongoose = require("mongoose");

// Criação de Model

const articleModel = new mongoose.Schema({
  title: String,
  author: String,
  body: String,
  datePublish: { type: Date, default: Date.now },
  special: Boolean,
  resume: {
    content: String,
    author: String
  },
});

module.exports = articleModel;
