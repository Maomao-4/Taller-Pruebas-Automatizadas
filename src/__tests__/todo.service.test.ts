import { TodoService } from "../services/todo.service";
import { InMemoryTodoRepository } from "../repositories/todo.repository";

describe("TodoService", () => {
  let service: TodoService
  let repository: InMemoryTodoRepository

  beforeEach(() => {
    repository = new InMemoryTodoRepository()
    service = new TodoService(repository)
  })

  describe("createTodo", () => {
    it("should create a new todo", async () => {
      const todoData = { title: "Test Todo", description: "Test Description" }
      const todo = await service.createTodo(todoData)

      expect(todo.title).toBe("Test Todo")
      expect(todo.description).toBe("Test Description")
      expect(todo.completed).toBe(false)
    })
  })

  describe("getAllTodos", () => {
    it("should return all todos", async () => {
      await service.createTodo({ title: "Todo 1" })
      await service.createTodo({ title: "Todo 2" })

      const todos = await service.getAllTodos()
      expect(todos).toHaveLength(2)
    })
  })

  describe("getTodoById", () => {
    it("should return todo by id", async () => {
      const created = await service.createTodo({ title: "Test Todo" })
      const found = await service.getTodoById(created.id)

      expect(found).toEqual(created)
    })

    it("should return null for non-existent id", async () => {
      const found = await service.getTodoById("999")
      expect(found).toBeNull()
    })
  })

  describe("updateTodo", () => {
    it("should update existing todo", async () => {
      const created = await service.createTodo({ title: "Original" })
      const updated = await service.updateTodo(created.id, {
        title: "Updated",
        completed: true,
      })

      expect(updated?.title).toBe("Updated")
      expect(updated?.completed).toBe(true)
    })

    it("should return null for non-existent todo", async () => {
      const updated = await service.updateTodo("999", { title: "Updated" })
      expect(updated).toBeNull()
    })
  })

  describe("deleteTodo", () => {
    it("should delete existing todo", async () => {
      const created = await service.createTodo({ title: "Test Todo" })
      const deleted = await service.deleteTodo(created.id)

      expect(deleted).toBe(true)
    })

    it("should return false for non-existent todo", async () => {
      const deleted = await service.deleteTodo("999")
      expect(deleted).toBe(false)
    })
  })

  describe("getCompletedTodos", () => {
    it("should return only completed todos", async () => {
      const todo1 = await service.createTodo({ title: "Todo 1" })
      const todo2 = await service.createTodo({ title: "Todo 2" })

      await service.updateTodo(todo1.id, { completed: true })

      const completed = await service.getCompletedTodos()
      expect(completed).toHaveLength(1)
      expect(completed[0].id).toBe(todo1.id)
    })
  })

  describe("getPendingTodos", () => {
    it("should return only pending todos", async () => {
      const todo1 = await service.createTodo({ title: "Todo 1" })
      const todo2 = await service.createTodo({ title: "Todo 2" })

      await service.updateTodo(todo1.id, { completed: true })

      const pending = await service.getPendingTodos()
      expect(pending).toHaveLength(1)
      expect(pending[0].id).toBe(todo2.id)
    })
  })
})
