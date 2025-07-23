const WishlistItem = require('../models/WishlistItem');

exports.getWishlist = async (req, res) => {
    try {
        const userId = req.user.id || req.user._id || req.user.userId;
        const items = await WishlistItem.find({ user: userId });
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        res.status(500).json({ message: 'Failed to fetch wishlist' });
    }
};


exports.addToWishlist = async (req, res) => {
    try {
        console.log('Decoded user from JWT:', req.user);
        console.log('Request body:', req.body);

        const userId = req.user.id || req.user._id || req.user.userId;
        const { gameId, name, slug, platforms, image, genres } = req.body;

        if (!userId || !gameId) {
            return res.status(400).json({ message: 'Missing userId or gameId' });
          }
      
          const existing = await WishlistItem.findOne({ user: userId, gameId });
          if (existing) {
            return res.status(400).json({ message: 'Game already in wishlist' });
          }
      
          const newItem = await WishlistItem.create({
            user: userId,
            gameId,
            name,
            slug,
            platforms,
            image,
            genres
          });
      
          res.status(201).json(newItem);
    } catch (error) {
          console.error('Error adding to wishlist:', error);
          res.status(500).json({ message: 'Failed to add to wishlist' });
    }
        
};

exports.removeFromWishlist = async (req, res) => {
    
    try {
        const userId = req.user.id || req.user._id || req.user.userId;
        const itemId = req.params.id;

        const deletedItem = await WishlistItem.findOneAndDelete({
            _id: itemId,
            user: userId,
        });

        if (!deletedItem) {
            return res.status(404).json({message: 'Game not found in wishlist'});
        }
        res.status(200).json({message: 'Game removed from wishlist'});
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        res.status(500).json({ message: 'Failed to remove from wishlist' });
    }
};