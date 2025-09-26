import type { ITodoRepository } from "../repositories/todo.repository";
import type { Todo, CreateTodoRequest, UpdateTodoRequest } from "../types/todo"

export class TodoService {
    constructor(private todoRepository: ITodoRepository) { }

    async getAllTodos(): Promise<Todo[]> {
        return this.todoRepository.findAll()
    }

    async getTodoById(id: string): Promise<Todo | null> {
        return this.todoRepository.findById(id)
    }

    async createTodo(data: CreateTodoRequest): Promise<Todo> {
        return this.todoRepository.create(data)
    }

    async updateTodo(id: string, data: UpdateTodoRequest): Promise<Todo | null> {
        const existingTodo = await this.todoRepository.findById(id)
        if (!existingTodo) {
            return null
        }
        return this.todoRepository.update(id, data)
    }

    async deleteTodo(id: string): Promise<boolean> {
        const existingTodo = await this.todoRepository.findById(id)
        if (!existingTodo) {
            return false
        }
        return this.todoRepository.delete(id)
    }

    async getCompletedTodos(): Promise<Todo[]> {
        const todos = await this.todoRepository.findAll()
        return todos.filter((todo) => todo.completed)
    }

    async getPendingTodos(): Promise<Todo[]> {
        const todos = await this.todoRepository.findAll()
        return todos.filter((todo) => !todo.completed)
    }
}
