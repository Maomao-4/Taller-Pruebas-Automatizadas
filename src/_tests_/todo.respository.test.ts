import { InMemoryTodoRepository } from "../repositories/todo.repository";
import type { CreateTodoRequest } from "../types/todo"

describe("InMemoryTodoRepository", () => {
  let repository: InMemoryTodoRepository

  beforeEach(() => {
    repository = new InMemoryTodoRepository()
  })

  describe("create", () => {
    it("should create a new todo", async () => {
      const todoData: CreateTodoRequest = {
        title: "Test Todo",
        description: "Test Description",
      }

      const todo = await repository.create(todoData)

      expect(todo).toMatchObject({
        id: "1",
        title: "Test Todo",
        description: "Test Description",
        completed: false,
      })
      expect(todo.createdAt).toBeInstanceOf(Date)
      expect(todo.updatedAt).toBeInstanceOf(Date)
    })

    it("should create todo without description", async () => {
      const todoData: CreateTodoRequest = {
        title: "Test Todo",
      }

      const todo = await repository.create(todoData)

      expect(todo.title).toBe("Test Todo")
      expect(todo.description).toBeUndefined()
    })
  })

  describe("findAll", () => {
    it("should return empty array when no todos exist", async () => {
      const todos = await repository.findAll()
      expect(todos).toEqual([])
    })

    it("should return all todos", async () => {
      await repository.create({ title: "Todo 1" })
      await repository.create({ title: "Todo 2" })

      const todos = await repository.findAll()
      expect(todos).toHaveLength(2)
    })
  })

  describe("findById", () => {
    it("should return todo by id", async () => {
      const created = await repository.create({ title: "Test Todo" })
      const found = await repository.findById(created.id)

      expect(found).toEqual(created)
    })

    it("should return null for non-existent id", async () => {
      const found = await repository.findById("999")
      expect(found).toBeNull()
    })
  })

  describe("update", () => {
    it("should update existing todo", async () => {
      const created = await repository.create({ title: "Original Title" })
      const updated = await repository.update(created.id, {
        title: "Updated Title",
        completed: true,
      })

      expect(updated).toMatchObject({
        id: created.id,
        title: "Updated Title",
        completed: true,
      })
      expect(updated!.updatedAt.getTime()).toBeGreaterThan(created.updatedAt.getTime())
    })

    it("should return null for non-existent todo", async () => {
      const updated = await repository.update("999", { title: "Updated" })
      expect(updated).toBeNull()
    })
  })

  describe("delete", () => {
    it("should delete existing todo", async () => {
      const created = await repository.create({ title: "Test Todo" })
      const deleted = await repository.delete(created.id)

      expect(deleted).toBe(true)

      const found = await repository.findById(created.id)
      expect(found).toBeNull()
    })

    it("should return false for non-existent todo", async () => {
      const deleted = await repository.delete("999")
      expect(deleted).toBe(false)
    })
  })
})