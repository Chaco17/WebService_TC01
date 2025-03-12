# WebService_TC01

## 🚀 Proyecto Estudiantil - Backend con Node.js & PostgreSQL

### 🏗 Tech Stack
- **Backend**
  - 🟢 Runtime: Node.js
  - ⚡ Framework: Express.js
  - 🗄 Base de datos: PostgreSQL
  - 📦 ORM: Prisma o Sequelize
  - 🔑 Autenticación: jsonwebtoken (JWT)
- **Testing**
  - 🧪 Pruebas unitarias y de integración: Jest
  - 📡 Pruebas de endpoints: Supertest
- **Contenedores y Desarrollo**
  - 🐳 Contenedores: Docker
  - 🗄 Base de datos en contenedor: PostgreSQL con persistencia
  - ⚙️ Gestión de contenedores: docker-compose

---
### 📂 Estructura del Proyecto
mi-proyecto-estudiantil/ ├── backend/ # Código del servidor en Node.js │ ├── src/ │ │ ├── controllers/ # Lógica de negocio │ │ ├── models/ # Modelos de BD (Prisma o Sequelize) │ │ ├── routes/ # Endpoints y rutas de Express │ │ ├── middlewares/ # Middleware (ej. JWT) │ │ ├── config/ # Configuración de BD y env variables │ │ ├── server.js # Archivo principal del servidor │ ├── tests/ # Pruebas con Jest y Supertest │ ├── package.json # Dependencias y scripts npm │ ├── .env # Variables de entorno │ ├── Dockerfile # Archivo Docker para la API │ ├── docker-compose.yml # Configuración Docker-Compose │ ├── README.md # Documentación del proyecto
---
