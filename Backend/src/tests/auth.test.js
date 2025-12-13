jest.setTimeout(10000);

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Aryan",
        email: "aryan@test.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("email");
  });

  it("should login an existing user and return JWT token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "aryan@test.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
  it("should register admin when valid admin key is provided", async () => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Admin",
      email: "admin@test.com",
      password: "admin123",
      adminKey: "123456"
    });

  expect(res.body.role).toBe("admin");
});

});
