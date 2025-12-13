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

let adminToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  await Sweet.deleteMany({});

  // normal user
  await request(app).post("/api/auth/register").send({
    name: "User",
    email: "user@test.com",
    password: "password123"
  });

  const userLogin = await request(app).post("/api/auth/login").send({
    email: "user@test.com",
    password: "password123"
  });

  token = userLogin.body.token;

  // admin user
  await User.create({
    name: "Admin",
    email: "admin@test.com",
    password: await require("bcryptjs").hash("admin123", 10),
    role: "admin"
  });

  const adminLogin = await request(app).post("/api/auth/login").send({
    email: "admin@test.com",
    password: "admin123"
  });

  adminToken = adminLogin.body.token;
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

it("should NOT allow normal user to delete a sweet", async () => {
  const sweets = await request(app)
    .get("/api/sweets")
    .set("Authorization", `Bearer ${token}`);

  const sweetId = sweets.body[0]._id;

  const res = await request(app)
    .delete(`/api/sweets/${sweetId}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(403);
});

it("should allow admin to delete a sweet", async () => {
  const sweet = await Sweet.create({
    name: "Barfi",
    category: "Indian",
    price: 30,
    quantity: 10
  });

  const res = await request(app)
    .delete(`/api/sweets/${sweet._id}`)
    .set("Authorization", `Bearer ${adminToken}`);

  expect(res.statusCode).toBe(200);
});




});
