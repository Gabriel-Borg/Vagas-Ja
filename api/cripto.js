module.exports = (req, res) => {
    res.status(200).json({ apiKey: process.env.GOOGLE_API_KEY });
  };
      