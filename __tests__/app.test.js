import app from "../src/app";
import request from "supertest";
// import { connectDB, close } from "../src/config/db";

jest.mock("../src/services/userServices");
// beforeAll(async () => await connectDB());

// afterAll(async () => await close());

describe("app test suite", () => {
  test("my first test", async () => {
    console.log("very first test");
  });
  test("get all users", async () => {
    const response = await request(app).get("/users");

    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toEqual(1);
  });
});
