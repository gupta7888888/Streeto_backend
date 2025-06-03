const User = require('../../models/auth/User');
// const User = require('../../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Update current user profile (demo version)
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findOne(); // again, normally use user ID
    if (!user) return res.status(404).json({ message: 'User not found' });

    Object.assign(user, req.body); // update fields
    await user.save();

    res.json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
