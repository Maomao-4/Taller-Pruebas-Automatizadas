import type { Todo, CreateTodoRequest, UpdateTodoRequest } from "../types/todo"

export interface ITodoRepository {
  findAll(): Promise<Todo[]>
  findById(id: string): Promise<Todo | null>
  create(data: CreateTodoRequest): Promise<Todo>
  update(id: string, data: UpdateTodoRequest): Promise<Todo | null>
  delete(id: string): Promise<boolean>
  deleteAll(): Promise<void>
}

export class InMemoryTodoRepository implements ITodoRepository {
  private todos: Map<string, Todo> = new Map()
  private idCounter = 1

  async findAll(): Promise<Todo[]> {
    return Array.from(this.todos.values())
  }

  async findById(id: string): Promise<Todo | null> {
    return this.todos.get(id) || null
  }

  async create(data: CreateTodoRequest): Promise<Todo> {
    const id = this.idCounter.toString()
    this.idCounter++

    const now = new Date()
    const todo: Todo = {
      id,
      title: data.title,
      description: data.description,
      completed: false,
      createdAt: now,
      updatedAt: now,
    }

    this.todos.set(id, todo)
    return todo
  }

  async update(id: string, data: UpdateTodoRequest): Promise<Todo | null> {
    const existing = this.todos.get(id);
    if (!existing) return null;

    const prevMs = existing.updatedAt.getTime();
    const nowMs = Date.now();
    const nextMs = nowMs > prevMs ? nowMs : prevMs + 1;

    const updated: Todo = {
      ...existing,
      ...data,
      updatedAt: new Date(nextMs),
    };

    this.todos.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.todos.delete(id)
  }

  async deleteAll(): Promise<void> {
    this.todos.clear()
    this.idCounter = 1
  }
}
