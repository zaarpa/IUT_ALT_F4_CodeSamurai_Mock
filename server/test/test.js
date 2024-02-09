require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const server = require("../server");
const connectToDatabase = require("./config.js");

describe("Book fetch Tests", () => {
  beforeAll(async () => {
    await mongoose.connection.close();
    await connectToDatabase(process.env.ATLAS_URI);
  }, 25000);

  afterAll(async () => {
    await server.close();
    await Promise.all(mongoose.connections.map((con) => con.close()));
  }, 25000);

  test("should return an error", async () => {
    const response = await request(app).get("/api/books/101");
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe(`Book with id: 101 was not found`);
  });

  test("should return a book", async () => {
    const expectedBook = {
      _id: "65be4005e86c4eca2365c3dc",
      id: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      price: 19.99,
      __v: 0,
    };

    await request(app).get("/api/books/1");

    const response = await request(app).get("/api/books/1");
    expect(response.body).toEqual(expectedBook);
    expect(response.statusCode).toBe(200);
  });
});
