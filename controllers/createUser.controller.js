const User = require("../models/user.model");

const createUser = async (req, res) => {
  try {
    const { user_id, user_name, balance } = req.body;

    const newUser = new User({
      user_id,
      user_name,
      balance,
    });

    await newUser.save();

    res.status(201).json({
      user_id: newUser.user_id,
      user_name: newUser.user_name,
      balance: newUser.balance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
};
