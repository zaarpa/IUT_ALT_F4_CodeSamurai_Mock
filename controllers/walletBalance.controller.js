const User = require("../models/user.model");

const getWalletBalance = async (req, res) => {
  try {
    const { wallet_id } = req.params;

    const user = await User.findOne({ user_id: wallet_id });

    if (!user) {
      return res
        .status(404)
        .json({ message: `Wallet with id: ${wallet_id} was not found` });
    }
    const response = {
      wallet_id: user.user_id,
      balance: user.balance,
      wallet_user: {
        user_id: user.user_id,
        user_name: user.user_name,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addWalletBalance = async (req, res) => {
  try {
    const { wallet_id } = req.params;
    const { recharge } = req.body;

    if (typeof recharge !== "number" || recharge < 100 || recharge > 10000) {
      return res.status(400).json({
        message: `invalid amount: ${recharge}`,
      });
    }

    const user = await User.findOne({ user_id: wallet_id });

    if (!user) {
      return res
        .status(404)
        .json({ message: `wallet with id: ${wallet_id} was not found` });
    }

    user.balance += recharge;
    await user.save();

    const response = {
      wallet_id: user.user_id,
      balance: user.balance,
      wallet_user: {
        user_id: user.user_id,
        user_name: user.user_name,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getWalletBalance,
  addWalletBalance,
};
