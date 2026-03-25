# Mini-Learning Platform API

API REST para cursos, lecciones, inscripciones y comentarios usando Express + Sequelize + Postgres.

## Requisitos
- Node.js 18+
- Postgres en local

## Instalacion
1. Clona el repo y entra al directorio.
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Crea el archivo `.env` basandote en `.env.example`.
4. Crea la base de datos (ejemplo: `mini_learning`).

## Migraciones y seed
- Migrar:
  ```bash
  npm run db:migrate
  ```
- Seed (datos demo):
  ```bash
  npm run db:seed
  ```

## Arranque
```bash
npm run dev
```

## Variables de entorno
Ver `.env.example`. Importantes:
- `DB_SYNC=none|alter|force` (recomendado `none` si usas migraciones).
- `DB_LOGGING=true` para ver SQL.

## Endpoints principales
### Users
- `POST /users`
- `GET /users?role=student&q=ada&page=1&pageSize=10`

### Courses
- `POST /courses`
- `GET /courses?published=true&q=node&order=createdAt:DESC&page=1&pageSize=10`
- `GET /courses/:slug`
- `PUT /courses/:id`
- `DELETE /courses/:id`

### Lessons
- `POST /courses/:courseId/lessons`
- `GET /courses/:courseId/lessons?order=ASC`
- `PUT /lessons/:id`
- `DELETE /lessons/:id`

### Enrollments
- `POST /courses/:courseId/enroll`
- `PATCH /enrollments/:id/status`
- `GET /courses/:courseId/enrollments?status=active`

### Comments
- `POST /lessons/:lessonId/comments`
- `GET /lessons/:lessonId/comments?page=1&pageSize=10`

## Pruebas rapidas
Hay ejemplos de `curl` en `docs/curl.md`.

## Postman
Importa la coleccion en `docs/postman_collection.json`.

## Tests
Ejecuta:
```bash
npm test
```

## Evidencias
Coloca capturas en `docs/screenshots/`.
