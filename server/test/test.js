const request = require("supertest");
const app = require("../app");

describe("Test example", () => {
  test("Get /api/books/:id", (done) => {
    request(app)
      .get("/api/books/1")
      .expect("Content-Type", /json/)
      .expect(404)
      .expect((res) => {
        res.body.data.length = 1;
        res.body.message = `Book with id: 1 was not found`;
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
