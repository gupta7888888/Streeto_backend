// controllers/storeController.js
const Store = require('../../models/store/Store');

exports.createStore = async (req, res) => {
  try {
    const { name, address } = req.body;

    const store = await Store.create({
      owner: req.user.id, // use `id` from token payload
      name,
      address
    });

    res.status(201).json(store);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyStore = async (req, res) => {
  try {
    const store = await Store.findOne({ owner: req.user.id });
    if (!store) return res.status(404).json({ message: 'No store found' });
    res.json(store);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
