const mongoose = require('mongoose');

const BeerSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
  },
  abv: {
    type: String
  },
  description: {
    type: String
  },
  rating: {
    type: Number
  },
  imgURL: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('beer', BeerSchema);
