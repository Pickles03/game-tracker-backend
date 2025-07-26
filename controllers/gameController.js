const axios = require('axios');

exports.getGames = async (req, res) => {
  const {page = 1, genre, ordering, search} = req.query;

  const params = {
    key: process.env.RAWG_API_KEY,
    page,
    page_size: 40
  }

  if (genre && genre !== '') params.genres = genre;
  if (ordering && ordering !== '') params.ordering = ordering;
  if (search && search !== '') params.search = search;

  try {
    console.log(`RAWG Request Params: ${JSON.stringify(params)}`);

    const response = await axios.get('https://api.rawg.io/api/games', {params})
    const results = response.data?.results || [];

    const formatGames = results.map(game => ({
        id: game.id,
        name: game.name,
        slug: game.slug,
        released: game.released,
        background_image: game.background_image,
        rating: game.rating,
        platforms: game.platforms?.map(p => p.platform.name) || [],
        genres: game.genres?.map(g => g.name) || [],
    }));

    res.status(200).json({results: formatGames});
  } catch (error) {
    console.error('Error fetching games:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to fetch games' });
  }
};
