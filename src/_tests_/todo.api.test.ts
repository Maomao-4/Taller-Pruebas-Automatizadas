import request from "supertest"
import { createApp } from "../app"
import type { Express } from "express"

describe("Todo API", () => {
    let app: Express

    beforeEach(() => {
        app = createApp()
    })

    describe("GET /health", () => {
        it("should return health status", async () => {
            const response = await request(app).get("/health").expect(200)

            expect(response.body).toHaveProperty("status", "OK")
            expect(response.body).toHaveProperty("timestamp")
        })
    })

    describe("POST /api/todos", () => {
        it("should create a new todo", async () => {
            const todoData = {
                title: "Test Todo",
                description: "Test Description",
            }

            const response = await request(app).post("/api/todos").send(todoData).expect(201)

            expect(response.body.success).toBe(true)
            expect(response.body.data).toMatchObject({
                title: "Test Todo",
                description: "Test Description",
                completed: false,
            })
        })

        it("should return validation error for invalid data", async () => {
            const response = await request(app).post("/api/todos").send({ title: "" }).expect(400)

            expect(response.body.success).toBe(false)
            expect(response.body.error).toBe("Validation error")
        })
    })

    describe("GET /api/todos", () => {
        it("should return all todos", async () => {
            // Create some todos first
            await request(app).post("/api/todos").send({ title: "Todo 1" })

            await request(app).post("/api/todos").send({ title: "Todo 2" })

            const response = await request(app).get("/api/todos").expect(200)

            expect(response.body.success).toBe(true)
            expect(response.body.data).toHaveLength(2)
            expect(response.body.count).toBe(2)
        })
    })

    describe("GET /api/todos/:id", () => {
        it("should return todo by id", async () => {
            const createResponse = await request(app).post("/api/todos").send({ title: "Test Todo" })

            const todoId = createResponse.body.data.id

            const response = await request(app).get(`/api/todos/${todoId}`).expect(200)

            expect(response.body.success).toBe(true)
            expect(response.body.data.id).toBe(todoId)
        })

        it("should return 404 for non-existent todo", async () => {
            const response = await request(app).get("/api/todos/999").expect(404)

            expect(response.body.success).toBe(false)
            expect(response.body.error).toBe("Todo not found")
        })
    })

    describe("PUT /api/todos/:id", () => {
        it("should update existing todo", async () => {
            const createResponse = await request(app).post("/api/todos").send({ title: "Original Title" })

            const todoId = createResponse.body.data.id

            const response = await request(app)
                .put(`/api/todos/${todoId}`)
                .send({ title: "Updated Title", completed: true })
                .expect(200)

            expect(response.body.success).toBe(true)
            expect(response.body.data.title).toBe("Updated Title")
            expect(response.body.data.completed).toBe(true)
        })

        it("should return 404 for non-existent todo", async () => {
            const response = await request(app).put("/api/todos/999").send({ title: "Updated" }).expect(404)

            expect(response.body.success).toBe(false)
        })
    })

    describe("DELETE /api/todos/:id", () => {
        it("should delete existing todo", async () => {
            const createResponse = await request(app).post("/api/todos").send({ title: "Test Todo" })

            const todoId = createResponse.body.data.id

            await request(app).delete(`/api/todos/${todoId}`).expect(204)

            // Verify todo is deleted
            await request(app).get(`/api/todos/${todoId}`).expect(404)
        })

        it("should return 404 for non-existent todo", async () => {
            const response = await request(app).delete("/api/todos/999").expect(404)

            expect(response.body.success).toBe(false)
        })
    })

    describe("GET /api/todos/completed", () => {
        it("should return only completed todos", async () => {
            const todo1Response = await request(app).post("/api/todos").send({ title: "Todo 1" })

            await request(app).post("/api/todos").send({ title: "Todo 2" })

            // Mark first todo as completed
            await request(app).put(`/api/todos/${todo1Response.body.data.id}`).send({ completed: true })

            const response = await request(app).get("/api/todos/completed").expect(200)

            expect(response.body.success).toBe(true)
            expect(response.body.data).toHaveLength(1)
            expect(response.body.data[0].completed).toBe(true)
        })
    })

    describe("GET /api/todos/pending", () => {
        it("should return only pending todos", async () => {
            const todo1Response = await request(app).post("/api/todos").send({ title: "Todo 1" })

            await request(app).post("/api/todos").send({ title: "Todo 2" })

            // Mark first todo as completed
            await request(app).put(`/api/todos/${todo1Response.body.data.id}`).send({ completed: true })

            const response = await request(app).get("/api/todos/pending").expect(200)

            expect(response.body.success).toBe(true)
            expect(response.body.data).toHaveLength(1)
            expect(response.body.data[0].completed).toBe(false)
        })
    })
})