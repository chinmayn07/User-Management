const mongoose = require("mongoose");
const request = require("supertest");
const dotenv = require("dotenv");
const app = require("../server");
const User = require("../models/users");

jest.mock("../models/users");

beforeAll(async () => {
  require("dotenv").config({ path: ".env.test" });
  const url = process.env.MONGO_URI_TEST;
  if (!url) {
    throw new Error("MONGO_URI_TEST is not defined");
  }
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("User Management API", () => {
  let userId;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user", async () => {
    const mockUser = {
      _id: "user_id",
      name: "John Doe",
      email: "john.doe@example.com",
    };
    User.create.mockResolvedValue(mockUser);

    const res = await request(app).post("/api/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id", "user_id");
    expect(User.create).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john.doe@example.com",
    });
    userId = res.body._id;
  });

  it("should get all users", async () => {
    User.find.mockResolvedValue([
      { _id: "user_id", name: "John Doe", email: "john.doe@example.com" },
    ]);

    const res = await request(app).get("/api/users");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(User.find).toHaveBeenCalled();
  });

  it("should get a user by ID", async () => {
    const mockUser = {
      _id: "user_id",
      name: "John Doe",
      email: "john.doe@example.com",
    };
    User.findById.mockResolvedValue(mockUser);

    const res = await request(app).get(`/api/users/${userId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", "user_id");
    expect(User.findById).toHaveBeenCalledWith(userId);
  });

  it("should update a user by ID", async () => {
    User.findByIdAndUpdate.mockResolvedValue({
      _id: "user_id",
      name: "Jane Doe",
      email: "john.doe@example.com",
    });

    const res = await request(app).put(`/api/users/${userId}`).send({
      name: "Jane Doe",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Jane Doe");
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      userId,
      { name: "Jane Doe" },
      { new: true }
    );
  });

  it("should delete a user by ID", async () => {
    User.findByIdAndDelete.mockResolvedValue({ _id: "user_id" });

    const res = await request(app).delete(`/api/users/${userId}`);

    expect(res.statusCode).toEqual(200);
    expect(User.findByIdAndDelete).toHaveBeenCalledWith(userId);
  });
});
