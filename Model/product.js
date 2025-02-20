const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,

  },
  price: {
    type: Number,
  },
  img: {
    type: String,

  }
},
);

const product = mongoose.model('Product', productSchema);
module.exports = product