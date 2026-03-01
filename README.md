# BMTECHRD POS TERMINAL ENTERPRISE

Monorepo empresarial de POS con backend Node.js/TypeScript modular, frontend React/Vite y wrapper desktop Electron en modo kiosko.

## Arquitectura

- **Backend**: Express + PostgreSQL + Socket.io + JWT + bcrypt, patrón Controller-Service-Repository.
- **Frontend**: React + TypeScript + Zustand + Axios + rutas por roles.
- **Desktop**: Electron en modo kiosko para terminal bloqueada.
- **Infra**: Docker Compose + PM2 + configuración `.env`.

## Estructura

```txt
/backend
  /src
    /config
    /database
    /middlewares
    /modules
      /auth /users /products /tables /orders /payments /audit /dashboard /printers
    /utils
    app.ts
    server.ts
/frontend
  /src
    /components /hooks /pages /services /store /types
/desktop
  main.js
  preload.js
docker-compose.yml
ecosystem.config.cjs
```

## Arranque rápido

1. Copiar `backend/.env.example` a `backend/.env` y definir secretos.
2. Levantar PostgreSQL:
   ```bash
   docker compose up -d db
   ```
3. Backend:
   ```bash
   cd backend && npm i && npm run db:migrate && npm run dev
   ```
4. Frontend:
   ```bash
   cd frontend && npm i && npm run dev
   ```
5. Desktop:
   ```bash
   cd desktop && npm i && npm start
   ```

## Seguridad implementada

- Hash de contraseña y PIN con bcrypt.
- JWT con expiración.
- Middleware de autenticación + autorización por roles.
- Rate limiting global.
- Validación estricta con Zod.
- Auditoría para acciones críticas.
- Soft delete en productos.
- Restricción de acceso cruzado a mesas por camarero.

## Eventos en tiempo real

- `order:new-items` emitido a sala de sucursal para pantallas de BAR/COCINA.

## Producción

- Construir backend con `npm run build`.
- Ejecutar con PM2 usando `ecosystem.config.cjs`.
