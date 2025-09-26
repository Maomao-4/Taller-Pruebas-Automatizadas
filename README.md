# ExpressJS Todo API

Una API REST completa para gestión de tareas (todos) construida con ExpressJS, TypeScript, y un stack moderno de desarrollo.

## 🚀 Stack Tecnológico

- **Node.js + Express**: Framework web para la API HTTP
- **TypeScript**: Tipado estático para mejor desarrollo
- **Zod**: Validación de esquemas y payloads
- **Jest + ts-jest + Supertest**: Testing unitario y de integración
- **ts-node-dev**: Hot reload en desarrollo
- **ESLint**: Linting y calidad de código
- **Pino**: Sistema de logging estructurado
- **Repositorio en memoria**: Para simplificar testing (fácil migrar a BD)


## 🛠️ Instalación y Uso

### Instalar dependencias
\`\`\`bash
npm install
\`\`\`

### Desarrollo (con hot reload)
\`\`\`bash
npm run dev
\`\`\`

### Ejecutar tests
\`\`\`bash
npm test                # Ejecutar todos los tests
npm run test:watch      # Tests en modo watch
npm run test:coverage   # Tests con coverage
\`\`\`

## 📋 API Endpoints

### Todos
- `GET /api/todos` - Obtener todos los todos
- `GET /api/todos/:id` - Obtener todo por ID
- `POST /api/todos` - Crear nuevo todo
- `PUT /api/todos/:id` - Actualizar todo
- `DELETE /api/todos/:id` - Eliminar todo
- `GET /api/todos/completed` - Obtener todos completados
- `GET /api/todos/pending` - Obtener todos pendientes

### Health Check
- `GET /health` - Estado de la API

## 🧪 Tests

El proyecto incluye más de 7 pruebas unitarias que cubren:

1. **Repository Tests**: Creación, lectura, actualización y eliminación
2. **Service Tests**: Lógica de negocio y filtros
3. **API Integration Tests**: Endpoints HTTP completos
4. **Validation Tests**: Esquemas Zod y manejo de errores

### Ejecutar tests específicos
\`\`\`bash
npm test -- --testNamePattern="should create a new todo"
npm test -- src/__tests__/todo.repository.test.ts
\`\`\`


### Logging Estructurado
Utiliza Pino para logging con formato JSON en producción y pretty-print en desarrollo.


## 📊 Coverage de Tests

Los tests cubren:
- ✅ Operaciones CRUD completas
- ✅ Validación de datos
- ✅ Manejo de errores
- ✅ Filtros (completados/pendientes)
- ✅ Endpoints HTTP
- ✅ Casos edge (IDs inexistentes, datos inválidos)


