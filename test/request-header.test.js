import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.send(`Hello ${req.get("accept")}`);
});

test("Test Header", async () => {
  const response = await request(app).get("/").set("Accept", "text/plain");
  expect(response.text).toBe("Hello text/plain");
});
