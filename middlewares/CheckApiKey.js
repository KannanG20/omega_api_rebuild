const checkApiKey = (req, res, next) => {
    const apiKey = req.query.key;
    const validApiKey = process.env.API_KEY;
  
    if (apiKey !== validApiKey) {
      return res.status(401).json({ error: 'unauthorized request' });
    }
  
    next();
  };
module.exports = checkApiKey