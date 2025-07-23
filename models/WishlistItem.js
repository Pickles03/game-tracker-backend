const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  gameId: {
    type: Number,
    required: true,
  },
  name: String,
  slug: String,
  platforms: [String],
  genres: [String], // ← Add this line
  image: String,
});

module.exports = mongoose.model('WishlistItem', wishlistItemSchema);
