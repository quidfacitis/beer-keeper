const mongoose = require('mongoose');

const QuoteSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: "Anonymous"
  }
});

module.exports = mongoose.model('quote', QuoteSchema);
