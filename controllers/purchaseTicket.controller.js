const User = require("../models/user.model");
const Train = require("../models/train.model");
const Station = require("../models/station.model");

// Controller function to purchase a ticket
const purchaseTicket = async (req, res) => {
  const { wallet_id, time_after, station_from, station_to } = req.body;
  try {
    // Retrieve user's wallet balance
    const user = await User.findOne({ user_id: wallet_id });
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with wallet id ${wallet_id} not found` });
    }

    // Calculate ticket cost based on fare for each pair of consecutive stations along the route
    let ticketCost = 0;
    const stations = await Station.find({}, { _id: 0, station_id: 1 });
    for (let i = 0; i < stations.length - 1; i++) {
      const currentStationId = stations[i].station_id;
      const nextStationId = stations[i + 1].station_id;
      const train = await Train.findOne({
        "stops.station_id": currentStationId,
        "stops.station_id": nextStationId,
      });
      if (!train) {
        return res.status(403).json({
          message: `No ticket available for station ${currentStationId} to station ${nextStationId}`,
        });
      }
      const stopIndex = train.stops.findIndex(
        (stop) => stop.station_id === currentStationId
      );
      ticketCost += train.stops[stopIndex].fare;
    }

    // Check if the user has sufficient balance to purchase the ticket
    if (user.balance < ticketCost) {
      const shortageAmount = ticketCost - user.balance;
      return res.status(402).json({
        message: `Recharge amount: ${shortageAmount} to purchase the ticket`,
      });
    }

    // Deduct ticket cost from user's balance
    user.balance -= ticketCost;
    await user.save();

    // Generate ticket ID (can be a unique integer)
    const ticket_id = Math.floor(Math.random() * 1000);

    // Construct response object with ticket details
    const response = {
      ticket_id,
      wallet_id: user.user_id,
      balance: user.balance,
      stations: stations.map((station) => ({ station_id: station.station_id })),
    };
    res.status(201).json(response);
  } catch (error) {
    console.error("Error purchasing ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { purchaseTicket };
