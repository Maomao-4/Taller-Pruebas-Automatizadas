import type { Request, Response } from "express"
import type { TodoService } from "../services/todo.service"
import { CreateTodoSchema, UpdateTodoSchema } from "../types/todo"
import { ZodError } from "zod"
import pino from "pino"

const logger = pino()

export class TodoController {
    constructor(private todoService: TodoService) { }

    getAllTodos = async (req: Request, res: Response): Promise<void> => {
        try {
            const todos = await this.todoService.getAllTodos()
            res.json({
                success: true,
                data: todos,
                count: todos.length,
            })
        } catch (error) {
            logger.error("Error getting all todos:", error)
            res.status(500).json({
                success: false,
                error: "Internal server error",
            })
        }
    }

    getTodoById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params
            const todo = await this.todoService.getTodoById(id)

            if (!todo) {
                res.status(404).json({
                    success: false,
                    error: "Todo not found",
                })
                return
            }

            res.json({
                success: true,
                data: todo,
            })
        } catch (error) {
            logger.error("Error getting todo by id:", error)
            res.status(500).json({
                success: false,
                error: "Internal server error",
            })
        }
    }

    createTodo = async (req: Request, res: Response): Promise<void> => {
        try {
            const validatedData = CreateTodoSchema.parse(req.body)
            const todo = await this.todoService.createTodo(validatedData)

            res.status(201).json({
                success: true,
                data: todo,
            })
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    success: false,
                    error: "Validation error",
                    details: error.errors,
                })
                return
            }

            logger.error("Error creating todo:", error)
            res.status(500).json({
                success: false,
                error: "Internal server error",
            })
        }
    }

    updateTodo = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params
            const validatedData = UpdateTodoSchema.parse(req.body)
            const todo = await this.todoService.updateTodo(id, validatedData)

            if (!todo) {
                res.status(404).json({
                    success: false,
                    error: "Todo not found",
                })
                return
            }

            res.json({
                success: true,
                data: todo,
            })
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    success: false,
                    error: "Validation error",
                    details: error.errors,
                })
                return
            }

            logger.error("Error updating todo:", error)
            res.status(500).json({
                success: false,
                error: "Internal server error",
            })
        }
    }

    deleteTodo = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params
            const deleted = await this.todoService.deleteTodo(id)

            if (!deleted) {
                res.status(404).json({
                    success: false,
                    error: "Todo not found",
                })
                return
            }

            res.status(204).send()
        } catch (error) {
            logger.error("Error deleting todo:", error)
            res.status(500).json({
                success: false,
                error: "Internal server error",
            })
        }
    }

    getCompletedTodos = async (req: Request, res: Response): Promise<void> => {
        try {
            const todos = await this.todoService.getCompletedTodos()
            res.json({
                success: true,
                data: todos,
                count: todos.length,
            })
        } catch (error) {
            logger.error("Error getting completed todos:", error)
            res.status(500).json({
                success: false,
                error: "Internal server error",
            })
        }
    }

    getPendingTodos = async (req: Request, res: Response): Promise<void> => {
        try {
            const todos = await this.todoService.getPendingTodos()
            res.json({
                success: true,
                data: todos,
                count: todos.length,
            })
        } catch (error) {
            logger.error("Error getting pending todos:", error)
            res.status(500).json({
                success: false,
                error: "Internal server error",
            })
        }
    }
}
