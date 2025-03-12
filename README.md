# WebService_TC01

🏗 Tech Stack(v.1)
🔹 Backend (Node.js + Express)
✅ Runtime: Node.js
✅ Framework: Express.js
✅ Base de datos: PostgreSQL
✅ ORM: Prisma o Sequelize (Recomiendo Prisma por su simplicidad)
✅ Autenticación: jsonwebtoken (JWT)
❌ Validación de datos: No se usará
❌ Frontend: No se usará

🔹 Testing
✅ Pruebas unitarias y de integración: Jest
✅ Pruebas de endpoints: Supertest

🔹 Desarrollo en Docker
✅ Contenedores: Docker
✅ Base de datos en contenedor: PostgreSQL con persistencia
✅ Gestión de contenedores: docker-compose

📂 Estructura del Proyecto
📂 mi-proyecto-estudiantil/
├── 📂 backend/ (Código del servidor en Node.js)
│ ├── 📂 src/
│ │ ├── 📂 controllers/ (Lógica de negocio, manejar requests)
│ │ ├── 📂 models/ (Definición de modelos con Prisma o Sequelize)
│ │ ├── 📂 routes/ (Endpoints y rutas de Express)
│ │ ├── 📂 middlewares/ (Middleware de autenticación JWT y otros)
│ │ ├── 📂 config/ (Configuración de base de datos y variables de entorno)
│ │ ├── 📜 server.js (Archivo principal para levantar el servidor)
│ ├── 📂 tests/ (Pruebas con Jest y Supertest)
│ ├── 📜 package.json (Dependencias y scripts npm)
│ ├── 📜 .env (Variables de entorno como conexión a la DB)
│ ├── 📜 Dockerfile (Archivo para crear la imagen Docker)
│ ├── 📜 docker-compose.yml (Orquestación con Docker Compose)
│ ├── 📜 README.md (Documentación del proyecto)
