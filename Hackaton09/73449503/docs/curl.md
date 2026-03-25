# Curl rapido

Base URL: `http://localhost:3000`

## Users
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Ada","lastName":"Lovelace","email":"ada@example.com","passwordHash":"x","role":"instructor"}'

curl "http://localhost:3000/users?role=instructor&q=ada&page=1&pageSize=10"
```

## Courses
```bash
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -d '{"title":"Intro a Node","description":"Curso base","ownerId":1}'

curl "http://localhost:3000/courses?published=false&q=Intro&page=1&pageSize=10"

curl "http://localhost:3000/courses/intro-a-node"
```

## Lessons
```bash
curl -X POST http://localhost:3000/courses/1/lessons \
  -H "Content-Type: application/json" \
  -d '{"title":"Setup","body":"Contenido minimo de 20 caracteres."}'

curl "http://localhost:3000/courses/1/lessons?order=ASC"
```

## Enrollments
```bash
curl -X POST http://localhost:3000/courses/1/enroll \
  -H "Content-Type: application/json" \
  -d '{"userId":2}'

curl -X PATCH http://localhost:3000/enrollments/1/status \
  -H "Content-Type: application/json" \
  -d '{"status":"active","score":95}'

curl "http://localhost:3000/courses/1/enrollments?status=active"
```

## Comments
```bash
curl -X POST http://localhost:3000/lessons/1/comments \
  -H "Content-Type: application/json" \
  -d '{"userId":2,"body":"Buen contenido, gracias."}'

curl "http://localhost:3000/lessons/1/comments?page=1&pageSize=10"
```
