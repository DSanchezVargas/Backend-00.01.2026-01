# Mini-Learning Platform API

API REST construida con **Node.js + Express + Sequelize** para la hackatón de 6h.

---

## Stack

- Node.js 18+
- Express 4
- Sequelize 6 (ORM)
- PostgreSQL

---

## Instalación

```bash
git clone <repo-url>
cd mini-learning-platform
npm install

cp .env.example .env
# Edita .env con tus credenciales de base de datos
```

### Variables de entorno (`.env`)

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=learning_platform
DB_USER=postgres
DB_PASS=tu_password
DB_DIALECT=postgres
DB_SYNC=alter           # force | alter | none
PORT=3000
```

---

## Arranque

```bash
# Desarrollo (hot reload con --watch de Node 18)
npm run dev

# Cargar datos de prueba
npm run seed
```

---

## Entidades y Relaciones

```
User (admin | instructor | student)
  │
  ├─1:N─► Course (ownerId) — soft delete (paranoid)
  │          │
  │          ├─1:N─► Lesson — soft delete (paranoid)
  │          │          │
  │          │          └─1:N─► Comment ◄─N:1─ User
  │          │
  │          └─N:M─► User (via Enrollment: status, score)
  │
  └─1:N─► Comment
```

---

## Endpoints

### Users

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST   | `/users` | Crear usuario |
| GET    | `/users?role=&q=&page=&pageSize=` | Listar con filtros y paginación |
| GET    | `/users/:id` | Detalle de usuario |

### Courses

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST   | `/courses` | Crear curso (auto-slug) |
| GET    | `/courses?published=true&q=&order=createdAt:DESC&page=&pageSize=` | Listar con filtros |
| GET    | `/courses/:slug` | Detalle con owner + lessons + stats |
| PUT    | `/courses/:id` | Actualizar |
| DELETE | `/courses/:id` | Soft delete |
| POST   | `/courses/:idhttp://localhost:3000/courses /restore` | Restaurar (soft delete) |

### Lessons

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST   | `/courses/:courseId/lessons` | Crear lección (order auto-incremental) |
| GET    | `/courses/:courseId/lessons?order=ASC` | Listar ordenadas |
| PUT    | `/lessons/:id` | Editar |
| DELETE | `/lessons/:id` | Soft delete |

### Enrollments

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST   | `/courses/:courseId/enroll` | Inscribir alumno (transacción) |
| GET    | `/courses/:courseId/enrollments?status=active` | Listar inscritos |
| PATCH  | `/enrollments/:id/status` | Actualizar status y/o score |

### Comments

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST   | `/lessons/:lessonId/comments` | Crear comentario |
| GET    | `/lessons/:lessonId/comments?page=&pageSize=` | Listar con paginación |

---

## Ejemplos (usando Postman)
    Crear usuario — valida email único, role por defecto student
    POST: http://localhost:3000/users
    body/raw
    {  "firstName": "Ana López",  "lastName": "García",  "email": "ana@test.com",  "password": "12345"}
---
    Listar usuarios con filtros y búsqueda
    GET: http://localhost:3000/users?role=student&q=Ana&page=1&pageSize=10    
---
    Crear curso — solo instructor/admin. Auto-slug desde title
    POST: http://localhost:3000/courses
    body/raw
    { "title": "Node.js Avanzado", "description": "Profundiza en la creación de aplicaciones web escalables, de alto rendimiento y en tiempo real, utilizando un modelo de E/S sin bloqueo impulsado por eventos", "ownerId":1}
---
    Lista paginada con filtros y orden
    GET: http://localhost:3000/courses?published=true&page=1&pageSize=10
---
    Detalle del curso con owner, conteo de lecciones y enrollments
    GET: http://localhost:3000/courses/?slug=intro-a-node&slug=nodejs-avanzado&order=node
---
    Actualizar curso
    PUT: http://localhost:3000/courses/2
    {  "title": "Node.js Avanzado actualizado",  "description": "Nueva descripción",  "published": true}
---
    Soft delete — el registro persiste con deletedAt
    DELETE: http://localhost:3000/courses/3
---
    Restaurar el curso eliminado
    POST: http://localhost:3000/courses/3/restore
---
    Crear lección — asigna order incremental automáticamente
    POST: http://localhost:3000/courses/3/lessons
    body/raw
    {"title": "Intro a Express", "body": "framework web rápido, flexible y minimalista para Node.js","courseId": "3","ownerId":4}
    {title: "Intro a Sequalize", body: "Sequelize es un ORM (Object-Relational Mapping) para Node.js basado en promesas", courseId: 3, ownerId: 4}
    {title: "API REST", body: "Estilo de arquitectura estándar para crear servicios web, que permite la comunicación entre sistemas a través del protocolo HTTP", courseId: 3, ownerId: 4}
---
    Lista lecciones del curso en orden ascendente
    GET: http://localhost:3000/courses/3/lessons?order=ASC
---
    Editar lección
    PUT: http://localhost:3000/lessons/7
    body/raw
    {title: "Que es API REST", body: "Estilo de arquitectura estándar para crear servicios web, que permite la comunicación entre sistemas a través del protocolo HTTP", ownerId: 4}
---
    Borrar lección (soft delete si paranoid)
    DELETE: http://localhost:3000/lessons/7
---

## Características técnicas

- **Modelos y asociaciones**: User, Course, Lesson, Enrollment (N:M con atributos), Comment
- **Validaciones**: email único, longitudes mínimas, enums de roles y status
- **Scopes**: `Course.scope('published')`, `Course.scope('withOwner')`
- **Hooks**: auto-slug en Course y Lesson, normalización de strings, trim + validación en Comment
- **Paginación**: `findAndCountAll` con `limit`/`offset` en todos los listados
- **Filtros**: `q` (búsqueda), `published`, `status`, `role`, rangos de fecha (`createdAt_gte/lte`)
- **Ordenamiento**: `order=field:DIR` configurable
- **Eager loading**: `include` estratégico para evitar N+1
- **Soft delete**: `paranoid: true` en Course y Lesson con endpoint `/restore`
- **Transacciones**: inscripción crea Enrollment + actualiza status + incrementa `studentsCount` con rollback automático
- **Manejo de errores**: 400/404/409/500 con mensajes claros

---

## Estructura del proyecto

```
├─ src/
│  ├─ db.js              # Conexión Sequelize
│  ├─ models.js          # Todos los modelos + asociaciones
│  ├─ server.js          # Express + sync + rutas
│  ├─ seed.js            # Datos de prueba
│  └─ routes/
│     ├─ users.routes.js
│     ├─ courses.routes.js
│     ├─ lessons.routes.js
│     ├─ enrollments.routes.js
│     └─ comments.routes.js
├─ docs/                 # Capturas y colección Postman
├─ .env.example
├─ package.json
└─ README.md
```

---

## Checklist de validación

- [x] `npm run dev` arranca sin errores
- [x] `/courses` lista paginada con filtros `q`, `published`
- [x] `/courses/:slug` trae owner + lessons + `studentsCount`
- [x] `/courses/:id` soporta PUT/DELETE (soft)
- [x] `/courses/:courseId/lessons` crea y ordena correctamente
- [x] Transacción de inscripción funciona y hace rollback ante falla
- [x] Comentarios se crean con trim y validación mínima
- [x] No hay N+1 evidente en endpoints de detalle

---