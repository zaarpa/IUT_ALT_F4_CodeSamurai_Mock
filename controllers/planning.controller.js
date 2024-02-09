const Train = require("../models/train.model");
const Station = require("../models/station.model");

class node {
  constructor(station, train, departure_time, arrival_time, time, cost) {
    this.station_id = station;
    this.train_id = train;
    this.time = time;
    this.cost = cost;
    this.departure_time = departure_time;
    this.arrival_time = arrival_time;
  }
}

const PriorityQueue = require("priorityqueuejs");

const dijkstra = (listOfAllStations, listOfAllTrains, from, to, optimize) => {
  //   console.log(graph);

  const graph = new Map();

  for (const station of listOfAllStations) {
    graph.set(station_id.station_id, []);
  }

  for (const train of listOfAllTrains) {
    for (let i = 0; i < train.stops.length - 1; i++) {
      const source = train.stops[i];
      const destination = train.stops[i + 1];
      const arrival_time = destination.arrival_time
        ? destination.arrival_time
        : "00:00";
      const departure_time = source.departure_time
        ? source.departure_time
        : "00:00";
      const time =
        convertToMilliseconds(arrival_time) -
        convertToMilliseconds(departure_time);
      const cost = destination.fare - source.fare;
      graph
        .get(source.station_id)
        .push(
          new node(
            destination.station_id,
            train.train_id,
            departure_time,
            arrival_time,
            time,
            cost
          )
        );
    }
  }

  const distances = new Map();
  const previous = new Map();

  const queue = new PriorityQueue(
    (a, b) => distances.get(a) - distances.get(b)
  );

  for (const vertex of graph) {
    distances.set(vertex[0], Infinity);
    previous.set(parseInt(vertex[0]), null);
  }

  distances.set(parseInt(from), 0);
  queue.enq(from);
  console.log(graph);

  while (!queue.isEmpty()) {
    const current = queue.deq();
    console.log("->" + current);
    const neighbors = graph.get(parseInt(current));

    for (const neighbor of neighbors) {
      const weight = optimize === "time" ? neighbor.time : neighbor.cost;

      const distance = distances.get(parseInt(current)) + weight;
      if (distance < distances.get(parseInt(neighbor.station_id))) {
        distances.set(parseInt(neighbor.station_id), distance);

        previous.set(
          parseInt(neighbor.station_id),
          new node(
            current,
            neighbor.train,
            neighbor.departure_time,
            neighbor.arrival_time,
            neighbor.time,
            neighbor.cost
          )
        );
        queue.enq(neighbor.station_id);
      }
    }
  }

  let total_cost = 0;
  let total_time = 0;

  const route = [];

  let current = to;

  const lastNode = new node(to, null, null, null, null, null);

  while (current !== null) {
    if (previous.get(parseInt(current)) == null) {
      break;
    }
    total_cost += parseInt(previous.get(parseInt(current)).cost);
    total_time += parseInt(previous.get(parseInt(current)).time);
    route.push(previous.get(parseInt(current)));
    current = previous.get(parseInt(current)).station_id;
  }

  const result = {
    total_cost,
    total_time,
    stations: route.reverse(),
  };
  console.log(distances.get(parseInt(to)));

  return result;
};

const convertToMilliseconds = (time) => {
  const [hours, minutes] = time.split(":");
  const milliseconds = parseInt(hours) * 60 + parseInt(minutes);
  return milliseconds;
};

const findOptimalRoute = async (req, res) => {
  try {
    const listOfAllTrainsPromise = Train.find({});
    const listOfAllStationsPromise = Station.find({});

    const [listOfAllTrains, listOfAllStations] = await Promise.all([
      listOfAllTrainsPromise,
      listOfAllStationsPromise,
    ]);

    const { from, to, optimize } = req.query;
    console.log(from, to, optimize);
    let result;
    result = dijkstra(listOfAllStations, listOfAllTrains, from, to, optimize);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in findOptimalRoute:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { findOptimalRoute };
