const Train = require("../models/train.model");

const createTrain = async (req, res) => {
  try {
    const { train_id, train_name, capacity, stops } = req.body;

    const newTrain = new Train({
      train_id,
      train_name,
      capacity,
      stops,
    });

    await newTrain.save();

    res.status(201).json(newTrain.toJSONRepresentation());
  } catch (error) {
    console.error("Error creating train:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createTrain };
