import request from "supertest";
import { createApp } from "../app";
import { TodoService } from "../services/todo.service";

const app = createApp();

describe("Todo controller - errores inesperados (→ 500)", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("GET /api/todos → 500 si el service.getAllTodos lanza", async () => {
    jest.spyOn(TodoService.prototype, "getAllTodos").mockImplementationOnce(async () => {
      throw new Error("db down");
    });
    const res = await request(app).get("/api/todos");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ success: false, error: "Internal server error" });
  });

  it("POST /api/todos → 500 si el service.createTodo lanza (no Zod)", async () => {
    jest.spyOn(TodoService.prototype, "createTodo").mockImplementationOnce(async () => {
      throw new Error("unexpected");
    });
    const res = await request(app).post("/api/todos").send({ title: "A", completed: false });
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ success: false, error: "Internal server error" });
  });

  it("PUT /api/todos/:id → 500 si el service.updateTodo lanza (no Zod)", async () => {
    jest.spyOn(TodoService.prototype, "updateTodo").mockImplementationOnce(async () => {
      throw new Error("unexpected");
    });
    const res = await request(app).put("/api/todos/1").send({ title: "B", completed: true });
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ success: false, error: "Internal server error" });
  });

  it("DELETE /api/todos/:id → 500 si el service.deleteTodo lanza", async () => {
    jest.spyOn(TodoService.prototype, "deleteTodo").mockImplementationOnce(async () => {
      throw new Error("unexpected");
    });
    const res = await request(app).delete("/api/todos/1");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ success: false, error: "Internal server error" });
  });
});