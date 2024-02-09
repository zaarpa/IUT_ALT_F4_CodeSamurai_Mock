const User = require("../models/user.model");

const getWalletBalance = async (req, res) => {
  try {
    const { wallet_id } = req.params;

    const user = await User.findOne({ user_id: wallet_id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ wallet_balance: user.balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getWalletBalance,
};
