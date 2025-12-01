const request = require("supertest");
const app = require("../index"); // assumes index.js exports app or server

describe("Connect feature basic flows", () => {
  it("searches users via /api/users", async () => {
    const token = "TEST_TOKEN"; // replace with real token in real tests
    const res = await request(app)
      .get("/api/users?q=test&role=ALL&page=1&limit=5")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBeLessThan(500);
  });
});


