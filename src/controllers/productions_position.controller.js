const ProductionsPosition = require('../models/productions_position.model');

exports.savePositions = async (req, res) => {
  try {
    const { productionId, positions } = req.body;
    const doc = await ProductionsPosition.findOneAndUpdate(
      { productionId },
      { positions },
      { upsert: true, new: true }
    );
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};