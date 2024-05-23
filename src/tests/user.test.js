// src/tests/user.test.js
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");

beforeAll(async () => {
  const url = process.env.MONGO_URI_TEST;
  if (!url) {
    throw new Error("MONGO_URI_TEST is not defined");
  }
  await mongoose.connect(url);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("User Management API", () => {
  let userId;

  it("should create a new user", async () => {
    const res = await request(app).post("/api/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    userId = res.body._id;
  });

  it("should get all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should get a user by ID", async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", userId);
  });

  it("should update a user by ID", async () => {
    const res = await request(app).put(`/api/users/${userId}`).send({
      name: "Jane Doe",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Jane Doe");
  });

  it("should delete a user by ID", async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(200);
  });
});
