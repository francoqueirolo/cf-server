const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);

const Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dishes'
  }
}, {
    timestamps: true
});

module.exports = mongoose.model('Favorites', favoriteSchema);;
