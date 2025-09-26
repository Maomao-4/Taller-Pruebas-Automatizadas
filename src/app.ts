import express, {type Express} from "express";
import cors from "cors";
import pino from "pino";
import { InMemoryTodoRepository } from "./repositories/todo.repository";
import { TodoService } from "./services/todo.service";
import { TodoController } from "./controllers/todo.controller";
import { createTodoRoutes } from "./routes/todo.routes";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
        }
    }
})

export function createApp(): Express {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));

    // Request logging
    app.use((req, res, next) => {
        logger.info(`${req.method} ${req.url}`);
        next();
    })

    // Dependency injection
    const todoRepository = new InMemoryTodoRepository();
    const todoService = new TodoService(todoRepository);
    const todoController = new TodoController(todoService);

    // Routes
    app.get("/health", (req, res) => {
        res.json({ status: "OK", timestamp: new Date().toISOString() });
    });

    app.use("/api/todos", createTodoRoutes(todoController));

    // Error handling
    app.use(notFoundHandler);
    app.use(errorHandler);
    
    return app;
}