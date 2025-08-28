# Inventario API (Node.js + Express + Sequelize)

API REST con autenticación JWT, roles (ADMIN/CLIENT), CRUD de productos y compras con control de stock.

## Requisitos
- Node.js LTS
- PostgreSQL (recomendado) o MySQL
- `npm i -g sequelize-cli` (opcional, también puedes usar `npx`)

## Pasos de instalación
1) Instalar dependencias y copiar variables de entorno:
```bash
npm install
cp .env.example .env
```

2) Configura tu `.env` con tus credenciales de base de datos.
   - Para PostgreSQL: `DB_DIALECT=postgres` y conserva `pg` y `pg-hstore`.
   - Para MySQL: cambia `DB_DIALECT=mysql` y **además** instala `mysql2`:
     ```bash
     npm i mysql2
     ```
   - Ajustar el puerto de la Base de datos segun el que tenga configurado en su POSTGRESQL  
      ```bash
      DB_PORT=5433
      # o
      DB_PORT=5432
      ```
3) Inicializa la base de datos (Sequelize CLI):
```bash
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```

4) Levanta el servidor:
```bash
npm run dev
# o
npm start
```

5) Interfaz Interactiva (Swagger UI)
La API incluye documentación completa e interactiva disponible en:

```bash

http://localhost:3000/api-docs

```

## Endpoints
Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

Productos (ADMIN para crear/editar/borrar; lectura para ambos roles):
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

Compras
- `POST /api/purchases` (CLIENT): body `{ items: [{ productId, quantity }] }`
- `GET /api/purchases/me` (CLIENT)
- `GET /api/admin/purchases` (ADMIN) – filtros opcionales: `?clientId=&dateFrom=&dateTo=`
