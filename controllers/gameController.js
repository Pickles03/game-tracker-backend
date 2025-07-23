const axios = require('axios');

exports.getGames = async (req, res) => {
  try {
    const genre = req.query.genre;
    const response = await axios.get('https://api.rawg.io/api/games', {
      params: {
        key: process.env.RAWG_API_KEY,
        search: req.query.search,
        genres: genre,
        page_size: 20
      }
    });

    const formatGames = response.data.results.map(game => ({
        id: game.id,
        name: game.name,
        slug: game.slug,
        released: game.released,
        background_image: game.background_image,
        rating: game.rating,
        platforms: game.platforms.map(p => p.platform.name),
        genres: game.genres.map(g => g.name),
    }))

    res.status(200).json({results: formatGames});
  } catch (error) {
    console.error('Error fetching games:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to fetch games' });
  }
};
