import request from "supertest";
import { createApp } from "../app";

const app = createApp();

describe("Todo controller - validaciones (Zod → 400)", () => {
  it("POST /api/todos sin title → 400", async () => {
    const res = await request(app).post("/api/todos").send({ completed: false });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe("Validation error");
    expect(Array.isArray(res.body.details)).toBe(true);
  });

  it("PUT /api/todos/:id con payload inválido → 400", async () => {
    const res = await request(app).put("/api/todos/1").send({ title: 123 });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe("Validation error");
  });
});