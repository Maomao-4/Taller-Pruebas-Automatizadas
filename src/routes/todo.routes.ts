import { Router } from "express"
import type { TodoController } from "../controllers/todo.controller"

export function createTodoRoutes(todoController: TodoController): Router {
    const router = Router()

    router.get("/", todoController.getAllTodos)
    router.get("/completed", todoController.getCompletedTodos)
    router.get("/pending", todoController.getPendingTodos)
    router.get("/:id", todoController.getTodoById)
    router.post("/", todoController.createTodo)
    router.put("/:id", todoController.updateTodo)
    router.delete("/:id", todoController.deleteTodo)

    return router
}
