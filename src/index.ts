import { createApp } from "./app";
import pino from "pino";

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
        }
    }
})

const PORT = process.env.PORT || 3000;

const app = createApp();

app.listen(PORT, () => {
    logger.info(`Server is running on Port ${PORT}`);
    logger.info(`Todo API avilable at http://localhost:${PORT}/api/todos`);
    logger.info(`Health check at http://localhost:${PORT}/health`);
})