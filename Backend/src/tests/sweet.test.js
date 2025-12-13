jest.setTimeout(10000);

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");
const Sweet = require("../models/Sweet");

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  await Sweet.deleteMany({});

  // register user
  await request(app).post("/api/auth/register").send({
    name: "Aryan",
    email: "sweet@test.com",
    password: "password123"
  });

  // login user
  const res = await request(app).post("/api/auth/login").send({
    email: "sweet@test.com",
    password: "password123"
  });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Sweet API", () => {
  it("should add a new sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Gulab Jamun",
        category: "Indian",
        price: 20,
        quantity: 50
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("name", "Gulab Jamun");
  });

  it("should fetch all sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    // testing with postman-api-is done
  });

  it("should search sweets by category", async () => {
  const res = await request(app)
    .get("/api/sweets/search?category=Indian")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
  expect(res.body[0]).toHaveProperty("category", "Indian");
});


});
