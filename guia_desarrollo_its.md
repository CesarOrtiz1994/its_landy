## 📋 INFORMACIÓN DEL PROYECTO

**Proyecto:** Plataforma E-commerce + CMS para ITS SYSTEMS  
**Stack:** React + Node.js + Express + PostgreSQL  
**Metodología:** Desarrollo modular incremental (Backend → Testing Backend → Frontend → Testing Frontend por módulo)

---

## 🏗️ ESTRUCTURA DEL PROYECTO

```
its-systems-project/
├── README.md
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   └── utils/
│   ├── uploads/
│   ├── tests/
│   ├── prisma/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── hooks/
│   └── tests/
└── database/
```

---

## 🔧 REQUISITOS PREVIOS

### Ya instalado (✅)
- Node.js 18+ LTS
- PostgreSQL 15+
- Git

### A instalar
- PM2 globalmente: `npm install -g pm2`
- Prisma CLI globalmente (opcional): `npm install -g prisma`

### PostgreSQL - Crear base de datos
- Crear BD: `its_systems_db`
- Crear usuario: `its_systems_user` con contraseña
- Otorgar permisos al usuario

---

## 📦 MÓDULOS DEL PROYECTO

**6 MÓDULOS COMPLETOS (Módulos 0-5)** - cada uno con Backend + Frontend + Testing completo:

0. **MÓDULO 0:** Setup de Infraestructura (EJECUTAR PRIMERO)
1. **MÓDULO 1:** Autenticación y Usuarios
2. **MÓDULO 2:** Gestión de Contenido (CMS)
3. **MÓDULO 3:** E-commerce (Productos y Catálogo)
4. **MÓDULO 4:** Carrito y Órdenes
5. **MÓDULO 5:** Integración Cisco y Dashboard Avanzado

**⚠️ IMPORTANTE:** NO pasar al siguiente módulo hasta completar Backend + Frontend + Testing del módulo actual.

---

# 🚀 MÓDULO 1: AUTENTICACIÓN Y USUARIOS

## Objetivos del Módulo
- Sistema de autenticación con JWT
- Gestión de usuarios y roles
- Panel de login/registro completo
- Base para todos los módulos siguientes

---

## PARTE A: BACKEND

### Fase 1.0: Setup de Infraestructura (EJECUTAR PRIMERO)

**Tarea 1.0.1: Configurar Logging Profesional**
- Instalar winston y winston-daily-rotate-file
- Crear config/logger.js con niveles: error, warn, info, http, debug
- Configurar rotación de logs diaria (mantener 14 días)
- Crear middleware httpLogger.js para loggear todas las peticiones HTTP
- Agregar LOG_LEVEL a variables de entorno
- Crear carpeta logs/ con .gitkeep

**Tarea 1.0.2: Configurar Git y Control de Versiones**
- Crear .gitignore completo (node_modules, .env, logs, uploads, coverage)
- Crear .gitattributes para normalización de archivos
- Inicializar repositorio Git
- Realizar primer commit

**Tarea 1.0.3: Configurar Herramientas de Calidad**
- Instalar ESLint y Prettier en backend
- Crear .eslintrc.json con reglas básicas
- Crear .prettierrc con configuración estándar
- Agregar scripts: lint, lint:fix, format

**Tarea 1.0.4: Crear Scripts Útiles**
- Crear carpeta scripts/
- Crear setup.sh: instalar dependencias, crear carpetas, copiar .env
- Crear backup.sh: backup de BD y uploads con limpieza automática
- Dar permisos de ejecución a scripts

### Fase 1.1: Setup Inicial Backend

**Tarea 1.1.1: Estructura de carpetas**
- Crear carpeta `backend/` con subcarpetas: src, uploads, tests, prisma
- Dentro de src: config, controllers, routes, middlewares, services, utils
- Dentro de uploads: products, pages, temp

**Tarea 1.1.2: Inicializar Node.js**
- Ejecutar `npm init -y` en backend/
- Configurar package.json como type "module"

**Tarea 1.1.3: Instalar dependencias**
- Producción: express, cors, helmet, dotenv, pg, @prisma/client, jsonwebtoken, bcryptjs, express-rate-limit, joi, multer, sharp, uuid
- Desarrollo: nodemon, prisma, jest, supertest

**Tarea 1.1.4: Configurar scripts**
- dev (nodemon)
- start (producción)
- test (jest)
- prisma:generate, prisma:migrate, prisma:studio

**Tarea 1.1.5: Variables de entorno**
- Crear .env con: NODE_ENV, PORT, DATABASE_URL, JWT_SECRET, JWT_EXPIRES_IN, CORS_ORIGIN, MAX_FILE_SIZE
- Crear .env.example (sin valores sensibles)

**Tarea 1.1.6: Configurar .gitignore**
- Ignorar: node_modules, .env, uploads/*, logs, dist, coverage

### Fase 1.2: Base de Datos

**Tarea 1.2.1: Inicializar Prisma**
- Ejecutar `npx prisma init`

**Tarea 1.2.2: Schema de Prisma**
- Modelo User: id, email (único), passwordHash, firstName, lastName, role (default: viewer), isActive, timestamps
- Modelo AuditLog: userId, action, entityType, entityId, oldValues (JSON), newValues (JSON), ipAddress, timestamp

**Tarea 1.2.3: Migración**
- `npx prisma migrate dev --name init_users`
- `npx prisma generate`

**Tarea 1.2.4: Verificar**
- `npx prisma studio` para ver tablas creadas

### Fase 1.3: Configuraciones

**Tarea 1.3.1: config/database.js**
- Exportar PrismaClient configurado
- Función testConnection para verificar conexión

**Tarea 1.3.2: config/jwt.js**
- generateToken(payload)
- generateRefreshToken(payload)
- verifyToken(token)
- verifyRefreshToken(token)

**Tarea 1.3.3: utils/passwordUtils.js**
- hashPassword(password) con bcrypt
- comparePassword(password, hash)

**Tarea 1.3.4: utils/responseUtils.js**
- successResponse(res, data, message, statusCode)
- errorResponse(res, message, statusCode, errors)

### Fase 1.4: Middlewares

**Tarea 1.4.1: middlewares/auth.js**
- authenticate: extraer token, validar, agregar user a req
- authorize(...roles): verificar rol del usuario

**Tarea 1.4.2: middlewares/validation.js**
- validate(schema): validar req.body con Joi

**Tarea 1.4.3: middlewares/errorHandler.js**
- errorHandler: capturar errores globales
- notFound: manejar rutas 404

### Fase 1.5: Validadores

**Tarea 1.5.1: utils/validators/authValidators.js**
- registerSchema: email, password (min 6), firstName (min 2), lastName (min 2)
- loginSchema: email, password
- updateProfileSchema: firstName, lastName (opcionales)
- changePasswordSchema: currentPassword, newPassword (min 6)

### Fase 1.5-S: Mejoras de Seguridad en Autenticación

**Tarea 1.5-S.1: Instalar dependencias de seguridad**
- Instalar: express-validator, express-mongo-sanitize, xss-clean, hpp

**Tarea 1.5-S.2: Mejorar validación de passwords**
- Actualizar registerSchema: password mínimo 8 caracteres
- Requerir: mayúscula, minúscula, número, carácter especial
- Agregar mensajes de error descriptivos

**Tarea 1.5-S.3: Crear middleware de sanitización**
- Crear middlewares/sanitize.js
- Implementar mongoSanitize para prevenir NoSQL injection
- Implementar xss-clean para prevenir XSS
- Implementar hpp para prevenir HTTP Parameter Pollution

**Tarea 1.5-S.4: Crear rate limiters específicos**
- Crear middlewares/rateLimiter.js
- loginLimiter: 5 intentos cada 15 minutos
- registerLimiter: 3 registros por hora por IP
- apiLimiter: 100 requests cada 15 minutos

**Tarea 1.5-S.5: Agregar campos de seguridad al modelo User**
- Agregar campo loginAttempts (Int, default 0)
- Agregar campo lockUntil (DateTime, opcional)
- Ejecutar migración: npx prisma migrate dev --name add_security_fields

**Tarea 1.5-S.6: Implementar bloqueo de cuenta en authController**
- En login: verificar si cuenta está bloqueada
- Incrementar loginAttempts en cada intento fallido
- Bloquear cuenta por 30 minutos después de 5 intentos fallidos
- Resetear intentos en login exitoso
- Loggear todos los intentos con winston

**Tarea 1.5-S.7: Mejorar headers de seguridad**
- Configurar helmet con CSP (Content Security Policy)
- Habilitar HSTS con maxAge 1 año
- Configurar directivas para scripts, estilos e imágenes

**Tarea 1.5-S.8: Aplicar rate limiters y sanitización**
- Aplicar loginLimiter a POST /auth/login
- Aplicar registerLimiter a POST /auth/register
- Aplicar apiLimiter a todas las rutas /api/*
- Agregar sanitizeMiddleware en server.js antes de las rutas

### Fase 1.6: Controladores

**Tarea 1.6.1: controllers/authController.js**
- register: verificar email único, hash password, crear user, generar tokens, retornar
- login: buscar user, verificar activo, comparar password, generar tokens, retornar
- getProfile: obtener user desde req.user.id
- updateProfile: actualizar firstName y lastName
- changePassword: verificar password actual, hash nuevo, actualizar

### Fase 1.7: Rutas

**Tarea 1.7.1: routes/auth.routes.js**
- POST /register (validación registerSchema)
- POST /login (validación loginSchema)
- GET /profile (authenticate)
- PUT /profile (authenticate + validación updateProfileSchema)
- POST /change-password (authenticate + validación changePasswordSchema)

### Fase 1.8: Servidor Principal

**Tarea 1.8.1: server.js**
- Configurar express con middlewares: helmet, cors, json, rate-limit
- Servir archivos estáticos: /uploads
- Ruta /health
- Montar /api/auth
- Middlewares de error
- Función startServer: test BD, iniciar servidor

**Tarea 1.8.2: Probar servidor**
- `npm run dev`
- Verificar mensajes de éxito

### Fase 1.8-D: Documentación con Swagger

**Tarea 1.8-D.1: Instalar Swagger**
- Instalar swagger-jsdoc y swagger-ui-express

**Tarea 1.8-D.2: Configurar Swagger**
- Crear config/swagger.js con definición OpenAPI 3.0
- Montar /api-docs con swagger-ui en server.js
- Configurar información del proyecto, servidores, seguridad JWT

**Tarea 1.8-D.3: Documentar endpoints de auth**
- Documentar POST /auth/register con JSDoc
- Documentar POST /auth/login con JSDoc
- Documentar GET /auth/profile con JSDoc
- Incluir: descripción, parámetros, request body, responses, ejemplos
- Definir schema User reutilizable

### Fase 1.8-S: Seeders de Usuarios

**Tarea 1.8-S.1: Crear sistema de seeds**
- Crear carpeta backend/prisma/seeds/
- Crear usersSeed.js: crear admin, editor, viewer de prueba
- Crear seed.js principal que ejecuta usersSeed
- Agregar script en package.json: "seed": "node prisma/seeds/seed.js"

**Tarea 1.8-S.2: Ejecutar seeds**
- Comando: npm run seed
- Verificar que usuarios se crean correctamente
- Documentar credenciales de usuarios de prueba en README

---

## PRUEBAS BACKEND

### Fase 1.9: Testing Backend

**Tarea 1.9.1: Configurar Jest**
- Crear jest.config.js

**Tarea 1.9.2: tests/auth.test.js**
- Suite completa para auth endpoints
- Tests: register (exitoso, email duplicado, validaciones)
- Tests: login (exitoso, credenciales inválidas)
- Tests: profile (con token, sin token)
- Tests: updateProfile
- Tests: changePassword

**Tarea 1.9.3: Ejecutar tests**
- `npm test`
- Verificar que todos pasen

**Tarea 1.9.4: Pruebas manuales**
- Con cURL o Postman probar todos los endpoints
- Registrar usuario de prueba
- Login y guardar token
- Probar endpoints protegidos

**✅ CHECKPOINT:** Backend completo y testeado. NO continuar hasta verificar que todo funciona.

---

## PARTE B: FRONTEND

### Fase 1.10: Setup Inicial Frontend

**Tarea 1.10.1: Crear proyecto React**
- `npm create vite@latest frontend -- --template react`

**Tarea 1.10.2: Instalar dependencias**
- react-router-dom, axios, @tanstack/react-query, react-hot-toast, antd, lucide-react, react-hook-form
- TailwindCSS: tailwindcss, postcss, autoprefixer

**Tarea 1.10.3: Configurar Tailwind**
- `npx tailwindcss init -p`
- Editar tailwind.config.js con paths
- Agregar directivas en index.css

**Tarea 1.10.4: Variables de entorno**
- Crear .env con VITE_API_URL=http://localhost:5000/api

**Tarea 1.10.5: Estructura de carpetas**
- src/components/ (common, layout, auth, admin)
- src/pages/ (public, admin)
- src/context/, services/, hooks/, utils/

**Tarea 1.10.6: Configurar scripts**
- dev en puerto 3000

### Fase 1.11: Servicios API

**Tarea 1.11.1: services/api.js**
- Instancia axios con baseURL
- Interceptor request: agregar token del localStorage
- Interceptor response: manejar 401 (eliminar token, redirigir)

**Tarea 1.11.2: services/authService.js**
- register(userData): POST, guardar token y user
- login(credentials): POST, guardar token y user
- logout(): eliminar localStorage
- getProfile(): GET
- updateProfile(data): PUT
- changePassword(passwords): POST
- getCurrentUser(): leer de localStorage
- isAuthenticated(): verificar token existe

### Fase 1.12: Context de Auth

**Tarea 1.12.1: context/AuthContext.jsx**
- Estados: user, loading
- useEffect: cargar user de localStorage
- login(credentials): llamar service, actualizar estado
- register(userData): llamar service, actualizar estado
- logout(): limpiar estado
- updateUser(user): actualizar estado y localStorage
- Hook useAuth() para usar el context

### Fase 1.13: Componentes de Auth

**Tarea 1.13.1: components/auth/ProtectedRoute.jsx**
- Props: children, allowedRoles
- Lógica: si loading → spinner, si no user → redirect login, si rol no permitido → redirect unauthorized, else → children

**Tarea 1.13.2: pages/public/Login.jsx**
- Form con email y password
- handleSubmit: llamar login del context, navegar a /admin
- Link a /register
- Mostrar toasts

**Tarea 1.13.3: pages/public/Register.jsx**
- Form con firstName, lastName, email, password
- handleSubmit: llamar register, navegar a /admin
- Validaciones HTML5
- Link a /login

**Tarea 1.13.4: pages/admin/Dashboard.jsx**
- Navbar con logo, nombre user, botón logout
- Contenido: mensaje bienvenida, info del user (email, rol, id)
- Mensaje: "✅ Módulo 1 completado"

### Fase 1.14: Rutas

**Tarea 1.14.1: App.jsx**
- BrowserRouter con AuthProvider
- Toaster de react-hot-toast
- Routes:
  - /login → Login
  - /register → Register
  - /admin → Dashboard (con ProtectedRoute)
  - / → Navigate a /login

**Tarea 1.14.2: main.jsx**
- Renderizar App con StrictMode

**Tarea 1.14.3: Iniciar frontend**
- `npm run dev`
- Abrir http://localhost:3000

---

## PRUEBAS FRONTEND

### Fase 1.15: Testing Frontend Manual

**Tarea 1.15.1: Flujo de registro**
- Ir a /register
- Llenar formulario con datos válidos
- Submit
- ✅ Verificar: toast éxito, redirect a /admin, muestra dashboard

**Tarea 1.15.2: Logout**
- En /admin, hacer logout
- ✅ Verificar: toast logout, redirect a /login, localStorage limpio

**Tarea 1.15.3: Login**
- En /login, ingresar credenciales
- Submit
- ✅ Verificar: toast éxito, redirect a /admin

**Tarea 1.15.4: Persistencia**
- Logueado en /admin, refrescar página (F5)
- ✅ Verificar: NO redirige, sigue en dashboard

**Tarea 1.15.5: Protección de rutas**
- Cerrar sesión
- Intentar ir a /admin directamente
- ✅ Verificar: redirige a /login

**Tarea 1.15.6: Validaciones**
- En /register: probar email inválido, password corto, campos vacíos
- En /login: probar credenciales incorrectas
- ✅ Verificar: mensajes de error apropiados

**Tarea 1.15.7: Responsive**
- Probar en DevTools: móvil (375px), tablet (768px), desktop (1920px)
- ✅ Verificar: todo se ve bien

**Tarea 1.15.8: Cross-browser**
- Probar en Chrome, Firefox, Edge
- ✅ Verificar: funciona igual

---

## ✅ CHECKLIST MÓDULO 1 COMPLETO

### Backend
- [ ] Estructura y dependencias instaladas
- [ ] PostgreSQL configurado
- [ ] Prisma y migraciones ejecutadas
- [ ] Configuraciones (database, jwt, utils)
- [ ] Middlewares implementados
- [ ] Validadores con Joi
- [ ] Controladores de auth completos
- [ ] Rutas configuradas
- [ ] Servidor funcionando en puerto 5000
- [ ] Tests Jest pasando
- [ ] Pruebas manuales exitosas

### Frontend
- [ ] React con Vite configurado
- [ ] TailwindCSS funcionando
- [ ] Estructura de carpetas
- [ ] Servicio API con interceptors
- [ ] AuthService completo
- [ ] AuthContext implementado
- [ ] Componentes: ProtectedRoute, Login, Register, Dashboard
- [ ] Rutas configuradas
- [ ] Servidor en puerto 3000

### Testing
- [ ] Tests backend pasando
- [ ] Flujo registro funcionando
- [ ] Flujo login funcionando
- [ ] Logout funcionando
- [ ] Persistencia de sesión OK
- [ ] Protección de rutas OK
- [ ] Validaciones funcionando
- [ ] Responsive OK
- [ ] Cross-browser OK

### Final
- [ ] Git commit realizado
- [ ] Backup de BD creado
- [ ] Documentación actualizada

---

## 🚫 NO CONTINUAR AL MÓDULO 2 HASTA:

1. ✅ Todos los checkboxes del Módulo 1 marcados
2. ✅ Backend testeado completamente
3. ✅ Frontend funcionando sin errores
4. ✅ Flujo completo probado (registro → login → dashboard → logout)
5. ✅ Commit realizado en Git

---

# 🎯 MÓDULO 2: GESTIÓN DE CONTENIDO (CMS)

**⚠️ COMENZAR SOLO DESPUÉS DE COMPLETAR MÓDULO 1**

## Objetivos del Módulo
- Sistema de páginas dinámicas
- Editor de contenido
- Gestor de medios (upload imágenes)
- Secciones reutilizables
- Preview de páginas

---

## PARTE A: BACKEND

### Fase 2.1: Schema y Migraciones

**Tarea 2.1.1: Extender Prisma schema**
- Modelo Page: id, title, slug (único), content (JSON), metaTitle, metaDescription, isPublished, createdBy (FK a User), timestamps
- Modelo Media: id, filename, originalName, mimetype, size, path, url, uploadedBy (FK a User), timestamps
- Relaciones: User → Pages, User → Media

**Tarea 2.1.2: Migración**
- `npx prisma migrate dev --name add_cms_models`
- `npx prisma generate`

### Fase 2.2: Configuración Storage

**Tarea 2.2.1: config/storage.js**
- Configurar multer con diskStorage
- Destination según el tipo (products, pages, temp)
- Filename único con uuid + timestamp
- FileFilter para tipos permitidos (images, pdf)
- Límite 10MB

**Tarea 2.2.2: services/imageService.js**
- processImage(filePath): crear thumbnails (300x300), medium (800x800), comprimir
- deleteImage(imageUrl): eliminar archivo y sus variantes
- getImageInfo(path): retornar metadata

### Fase 2.2-S: Mejoras de Seguridad en Uploads

**Tarea 2.2-S.1: Validación estricta de archivos**
- Verificar MIME type y extensión (doble verificación)
- Tipos permitidos: image/jpeg, image/png, image/webp, image/gif, application/pdf
- Rechazar archivos con extensiones dobles (ej: file.php.jpg)
- Loggear intentos de subida de archivos no permitidos

**Tarea 2.2-S.2: Generar nombres de archivo seguros**
- Usar crypto.randomBytes para nombres únicos
- Formato: timestamp-hash-aleatorio.ext
- No usar nombres originales del usuario
- Prevenir path traversal (../, ..\)

**Tarea 2.2-S.3: Validar dimensiones y límites**
- Tamaño máximo: 10MB por archivo
- Máximo 10 archivos por upload múltiple
- Validar dimensiones de imágenes (máx 4000x4000)

**Tarea 2.2-S.4: Sanitizar contenido HTML**
- Instalar dompurify y jsdom
- Crear utils/sanitizeHtml.js
- Definir tags permitidos: p, br, strong, em, u, h1-h4, ul, ol, li, a, img
- Definir atributos permitidos: href, src, alt, title, class
- Sanitizar todo contenido HTML antes de guardar en BD

### Fase 2.3: Controladores CMS

**Tarea 2.3.1: controllers/pageController.js**
- getAllPages: listar páginas (con filtros: published, search)
- getPageById: obtener página por ID
- getPageBySlug: obtener por slug (para frontend público)
- createPage: crear página, generar slug automático
- updatePage: actualizar página
- deletePage: soft delete (isPublished = false)
- publishPage: cambiar estado published

**Tarea 2.3.2: controllers/mediaController.js**
- uploadMedia: recibir archivo, procesar con Sharp, guardar en BD
- uploadMultiple: subir múltiples archivos
- getAllMedia: listar con paginación
- getMediaById: obtener un archivo
- deleteMedia: eliminar archivo del disco y BD

**Tarea 2.3.3: utils/validators/cmsValidators.js**
- createPageSchema: title (requerido), content (JSON), metaTitle, metaDescription
- updatePageSchema: similar pero campos opcionales
- uploadMediaSchema: validar tipo de archivo

### Fase 2.4: Rutas CMS

**Tarea 2.4.1: routes/pages.routes.js**
- GET /pages (authenticate + authorize admin/editor)
- GET /pages/:id (authenticate)
- GET /pages/slug/:slug (público)
- POST /pages (authenticate + authorize admin/editor + validación)
- PUT /pages/:id (authenticate + authorize + validación)
- DELETE /pages/:id (authenticate + authorize admin)
- PATCH /pages/:id/publish (authenticate + authorize admin)

**Tarea 2.4.2: routes/media.routes.js**
- POST /media/upload (authenticate + multer.single('file'))
- POST /media/upload-multiple (authenticate + multer.array('files', 10))
- GET /media (authenticate)
- GET /media/:id (authenticate)
- DELETE /media/:id (authenticate + authorize admin)

**Tarea 2.4.3: Montar rutas en server.js**
- app.use('/api/pages', pagesRoutes)
- app.use('/api/media', mediaRoutes)

---

## PRUEBAS BACKEND MÓDULO 2

### Fase 2.5: Testing Backend CMS

**Tarea 2.5.1: tests/pages.test.js**
- Tests CRUD de páginas
- Test generación de slug único
- Test validaciones
- Test permisos por rol

**Tarea 2.5.2: tests/media.test.js**
- Test upload simple
- Test upload múltiple
- Test procesamiento de imágenes
- Test delete de archivos

**Tarea 2.5.3: Ejecutar tests**
- `npm test`
- Verificar todos pasen

**Tarea 2.5.4: Pruebas manuales**
- Con Postman: crear página, listarlas, actualizar, eliminar
- Upload de imágenes
- Verificar archivos en uploads/

**✅ CHECKPOINT:** Backend CMS completo y testeado. NO continuar al frontend hasta verificar.

---

## PARTE B: FRONTEND

### Fase 2.6: Servicios CMS

**Tarea 2.6.1: services/pageService.js**
- getAllPages(filters)
- getPageById(id)
- getPageBySlug(slug)
- createPage(pageData)
- updatePage(id, pageData)
- deletePage(id)
- publishPage(id)

**Tarea 2.6.2: services/mediaService.js**
- uploadMedia(file, onProgress)
- uploadMultiple(files)
- getAllMedia(page, limit)
- deleteMedia(id)

### Fase 2.7: Componentes CMS

**Tarea 2.7.1: components/admin/PageList.jsx**
- Tabla de páginas con columnas: título, slug, estado, fecha, acciones
- Filtros: búsqueda por título, filtro por estado
- Botón "Nueva página"
- Acciones: editar, eliminar, publicar/despublicar

**Tarea 2.7.2: components/admin/PageEditor.jsx**
- Form con: title, slug (auto-generado, editable), content (textarea o editor simple)
- Campos SEO: metaTitle, metaDescription
- Toggle isPublished
- Botones: guardar borrador, publicar
- Preview button

**Tarea 2.7.3: components/admin/MediaGallery.jsx**
- Grid de imágenes subidas
- Drag & drop para upload
- Botón "Subir archivos"
- Click en imagen para copiar URL
- Botón eliminar
- Paginación

**Tarea 2.7.4: components/admin/MediaUploader.jsx**
- Drop zone para drag & drop
- Input file multiple
- Progress bars para cada archivo
- Preview de imágenes
- Botón cancelar

### Fase 2.8: Páginas CMS

**Tarea 2.8.1: pages/admin/Pages.jsx**
- Usar PageList component
- Manejar navegación a editor
- Confirmaciones para eliminar

**Tarea 2.8.2: pages/admin/PageEdit.jsx**
- Usar PageEditor component
- Cargar datos si es edición
- Guardar cambios
- Navegar de vuelta a lista

**Tarea 2.8.3: pages/admin/Media.jsx**
- Usar MediaGallery component
- Modal con MediaUploader
- Refresh después de upload

**Tarea 2.8.4: Actualizar Dashboard**
- Agregar links a "Páginas" y "Medios"
- Sidebar o nav menu

### Fase 2.9: Rutas

**Tarea 2.9.1: Agregar rutas CMS en App.jsx**
- /admin/pages → Pages (ProtectedRoute con role admin/editor)
- /admin/pages/new → PageEdit (modo crear)
- /admin/pages/edit/:id → PageEdit (modo editar)
- /admin/media → Media

---

## PRUEBAS FRONTEND MÓDULO 2

### Fase 2.10: Testing Frontend CMS

**Tarea 2.10.1: Flujo crear página**
- Ir a /admin/pages
- Click "Nueva página"
- Llenar formulario
- Guardar
- ✅ Verificar: aparece en lista, toast éxito

**Tarea 2.10.2: Flujo editar página**
- En lista, click editar
- Modificar campos
- Guardar
- ✅ Verificar: cambios guardados

**Tarea 2.10.3: Flujo eliminar página**
- En lista, click eliminar
- Confirmar
- ✅ Verificar: desaparece de lista

**Tarea 2.10.4: Flujo upload imagen**
- Ir a /admin/media
- Subir 1 imagen
- ✅ Verificar: aparece en galería, se puede ver

**Tarea 2.10.5: Flujo upload múltiple**
- Subir 5 imágenes juntas
- ✅ Verificar: progress bars, todas aparecen

**Tarea 2.10.6: Slug automático**
- Crear página con título "Mi Primera Página"
- ✅ Verificar: slug = "mi-primera-pagina"

**Tarea 2.10.7: Permisos**
- Login como viewer
- Intentar acceder a /admin/pages
- ✅ Verificar: redirect o mensaje de permisos

---

## ✅ CHECKLIST MÓDULO 2 COMPLETO

### Backend
- [ ] Modelos Page y Media en Prisma
- [ ] Migración ejecutada
- [ ] Storage configurado (Multer + Sharp)
- [ ] Controladores de páginas
- [ ] Controladores de media
- [ ] Validadores
- [ ] Rutas configuradas
- [ ] Tests pasando
- [ ] Pruebas manuales OK

### Frontend
- [ ] Servicios pageService y mediaService
- [ ] Componente PageList
- [ ] Componente PageEditor
- [ ] Componente MediaGallery
- [ ] Componente MediaUploader
- [ ] Páginas admin
- [ ] Rutas configuradas
- [ ] Dashboard actualizado

### Testing
- [ ] Crear página OK
- [ ] Editar página OK
- [ ] Eliminar página OK
- [ ] Upload imagen OK
- [ ] Upload múltiple OK
- [ ] Slug automático OK
- [ ] Permisos funcionando

### Final
- [ ] Git commit
- [ ] Backup BD
- [ ] Documentación actualizada

---

## 🚫 NO CONTINUAR AL MÓDULO 3 HASTA:

1. ✅ Módulo 2 completamente funcional
2. ✅ Puedes crear, editar y eliminar páginas
3. ✅ Puedes subir imágenes
4. ✅ Pruebas completas realizadas

---

# 🎯 MÓDULO 3: E-COMMERCE (PRODUCTOS)

**⚠️ COMENZAR SOLO DESPUÉS DE COMPLETAR MÓDULO 2**

## Objetivos del Módulo
- Catálogo de productos
- Sistema de categorías
- Gestión de inventario
- Búsqueda y filtros
- Vista pública de productos

---

## PARTE A: BACKEND

### Fase 3.1: Schema Productos

**Tarea 3.1.1: Extender Prisma**
- Modelo Category: id, name, slug, parentId (auto-referencia), description, imageUrl, displayOrder
- Modelo Product: id, sku (único), name, description, price, discountPrice, stock, lowStockAlert, categoryId (FK), images (JSON), specifications (JSON), isPublished, ciscoSku, lastSynced, timestamps
- Modelo InventoryMovement: id, productId (FK), movementType, quantity, previousStock, newStock, reason, userId (FK), timestamp
- Relaciones: Category → Products, Product → InventoryMovements

**Tarea 3.1.2: Migración**
- `npx prisma migrate dev --name add_products`

### Fase 3.2: Controladores Productos

**Tarea 3.2.1: controllers/categoryController.js**
- getAllCategories: listar (con subcategorías)
- getCategoryById
- createCategory: validar slug único
- updateCategory
- deleteCategory: verificar que no tenga productos
- getCategoryTree: retornar estructura jerárquica

**Tarea 3.2.2: controllers/productController.js**
- getAllProducts: listar con filtros (categoría, precio, búsqueda), paginación
- getProductById
- getProductBySku
- createProduct: validar SKU único, procesar imágenes
- updateProduct: actualizar stock registra movimiento
- deleteProduct: soft delete
- updateStock: agregar/quitar stock
- getLowStockProducts: productos con stock bajo

**Tarea 3.2.3: controllers/inventoryController.js**
- adjustStock: ajustar stock con razón
- getMovements: historial de movimientos
- getProductMovements: movimientos de un producto

**Tarea 3.2.4: utils/validators/productValidators.js**
- categorySchema: name, slug, parentId
- productSchema: sku, name, description, price, stock, categoryId
- stockAdjustmentSchema: productId, quantity, reason

### Fase 3.3: Rutas Productos

**Tarea 3.3.1: routes/categories.routes.js**
- GET /categories (público)
- GET /categories/:id (público)
- GET /categories/tree (público)
- POST /categories (authenticate + admin)
- PUT /categories/:id (authenticate + admin)
- DELETE /categories/:id (authenticate + admin)

**Tarea 3.3.2: routes/products.routes.js**
- GET /products (público con filtros)
- GET /products/:id (público)
- GET /products/sku/:sku (público)
- POST /products (authenticate + admin/editor)
- PUT /products/:id (authenticate + admin/editor)
- DELETE /products/:id (authenticate + admin)
- PATCH /products/:id/stock (authenticate + admin)

**Tarea 3.3.3: routes/inventory.routes.js**
- POST /inventory/adjust (authenticate + admin)
- GET /inventory/movements (authenticate)
- GET /inventory/movements/:productId (authenticate)
- GET /inventory/low-stock (authenticate)

**Tarea 3.3.4: Montar en server.js**
- /api/categories, /api/products, /api/inventory

### Fase 3.3-P: Optimizaciones de Performance

**Tarea 3.3-P.1: Instalar compression**
- Instalar compression para comprimir respuestas HTTP
- Configurar en server.js con nivel 6

**Tarea 3.3-P.2: Agregar índices en BD**
- Agregar índices en Prisma schema:
  - Product: categoryId, isPublished, createdAt, name
  - Order: customerEmail, status, createdAt, orderNumber
- Ejecutar migración: npx prisma migrate dev --name add_indexes

**Tarea 3.3-P.3: Crear utils de paginación**
- Crear utils/pagination.js
- Función paginate(page, limit): retorna skip y take
- Función paginationMeta(total, page, limit): retorna metadata
- Límite máximo: 100 items por página

**Tarea 3.3-P.4: Implementar paginación en controladores**
- Aplicar paginación en getAllProducts
- Aplicar paginación en getAllCategories
- Usar Promise.all para queries paralelas (productos + total)
- Optimizar queries con select específico (no traer todos los campos)

---

## PRUEBAS BACKEND MÓDULO 3

### Fase 3.4: Testing Backend Productos

**Tarea 3.4.1: tests/categories.test.js**
- CRUD categorías
- Test jerarquía (categoría con subcategorías)
- Test slug único

**Tarea 3.4.2: tests/products.test.js**
- CRUD productos
- Test SKU único
- Test filtros (categoría, precio, búsqueda)
- Test paginación
- Test stock alert

**Tarea 3.4.3: tests/inventory.test.js**
- Test ajuste de stock
- Test registro de movimientos
- Test low stock alert

**Tarea 3.4.4: Ejecutar y validar**
- `npm test`
- Pruebas manuales con Postman
- Crear 5 categorías de prueba
- Crear 20 productos de prueba
- Probar filtros y búsqueda

**✅ CHECKPOINT:** Backend E-commerce completo y testeado. NO continuar al frontend hasta verificar.

---

## PARTE B: FRONTEND

### Fase 3.5: Servicios Productos

**Tarea 3.5.1: services/categoryService.js**
- getAllCategories()
- getCategoryById(id)
- getCategoryTree()
- createCategory(data)
- updateCategory(id, data)
- deleteCategory(id)

**Tarea 3.5.2: services/productService.js**
- getAllProducts(filters): filters = { page, limit, categoryId, minPrice, maxPrice, search }
- getProductById(id)
- createProduct(data)
- updateProduct(id, data)
- deleteProduct(id)
- updateStock(id, quantity, reason)

**Tarea 3.5.3: services/inventoryService.js**
- adjustStock(productId, quantity, reason)
- getMovements(page, limit)
- getProductMovements(productId)
- getLowStockProducts()

### Fase 3.6: Componentes Admin Productos

**Tarea 3.6.1: components/admin/CategoryManager.jsx**
- Lista de categorías con estructura de árbol
- Botones: crear, editar, eliminar
- Modal para crear/editar categoría
- Drag & drop para reordenar (opcional)

**Tarea 3.6.2: components/admin/ProductList.jsx**
- Tabla de productos: imagen, SKU, nombre, categoría, precio, stock, estado
- Filtros: categoría, rango precio, búsqueda por nombre/SKU
- Paginación
- Acciones: editar, eliminar, ver
- Indicador visual de bajo stock

**Tarea 3.6.3: components/admin/ProductForm.jsx**
- Form completo de producto:
  - SKU, nombre, descripción
  - Categoría (select)
  - Precio, precio con descuento
  - Stock inicial
  - Alerta de bajo stock
  - Upload múltiple de imágenes (hasta 10)
  - Especificaciones técnicas (lista dinámica key-value)
  - Toggle publicado
- Validaciones en tiempo real
- Preview de imágenes

**Tarea 3.6.4: components/admin/StockManager.jsx**
- Buscador de productos
- Form para ajustar stock:
  - Producto seleccionado
  - Cantidad (+ o -)
  - Razón del ajuste
  - Stock actual y nuevo
- Historial de movimientos del producto
- Tabla de productos con bajo stock

**Tarea 3.6.5: components/admin/InventoryHistory.jsx**
- Tabla de movimientos con: fecha, producto, tipo, cantidad, usuario, razón
- Filtros: producto, tipo de movimiento, rango de fechas
- Exportar a Excel

### Fase 3.7: Componentes Públicos Productos

**Tarea 3.7.1: components/ecommerce/ProductCard.jsx**
- Imagen del producto
- Nombre, precio (con descuento si aplica)
- Indicador de stock bajo
- Badge de "Agotado" si stock = 0
- Botón "Ver detalles"
- Hover effects

**Tarea 3.7.2: components/ecommerce/ProductGrid.jsx**
- Grid responsive de ProductCard
- Mensaje si no hay productos
- Loading skeletons

**Tarea 3.7.3: components/ecommerce/ProductFilters.jsx**
- Filtro por categoría (lista de checkboxes)
- Filtro por rango de precio (slider)
- Búsqueda por texto
- Ordenar por: nombre, precio, más reciente
- Botón limpiar filtros

**Tarea 3.7.4: components/ecommerce/ProductDetail.jsx**
- Galería de imágenes (con zoom)
- Nombre, SKU, precio
- Descripción completa
- Especificaciones técnicas en tabla
- Selector de cantidad (con límite de stock)
- Botón "Agregar al carrito" (disabled si no hay stock)
- Productos relacionados

**Tarea 3.7.5: components/common/SearchBar.jsx**
- Input de búsqueda con ícono
- Autocompletado (debounce 300ms)
- Muestra sugerencias de productos
- Click en sugerencia navega a detalle

### Fase 3.7-P: Optimizaciones Frontend

**Tarea 3.7-P.1: Crear componente LazyImage**
- Crear components/common/LazyImage.jsx
- Implementar IntersectionObserver para lazy loading
- Cargar imagen solo cuando esté visible en viewport
- Placeholder mientras carga
- Agregar loading="lazy" a todas las imágenes

**Tarea 3.7-P.2: Crear hook useDebounce**
- Crear hooks/useDebounce.js
- Delay configurable (default 500ms)
- Aplicar a SearchBar (300ms)
- Aplicar a todos los inputs de búsqueda y filtros

**Tarea 3.7-P.3: Optimizar componentes**
- Usar React.memo en ProductCard
- Usar React.memo en componentes que no cambian frecuentemente
- Implementar skeleton loaders en ProductGrid mientras carga

### Fase 3.8: Páginas Productos

**Tarea 3.8.1: pages/admin/Categories.jsx**
- Usar CategoryManager component
- Breadcrumbs
- Título "Gestión de Categorías"

**Tarea 3.8.2: pages/admin/Products.jsx**
- Usar ProductList component
- Botón "Nuevo producto"
- Navegación a formulario

**Tarea 3.8.3: pages/admin/ProductEdit.jsx**
- Usar ProductForm component
- Modo crear vs modo editar
- Breadcrumbs
- Botones: guardar, cancelar

**Tarea 3.8.4: pages/admin/Inventory.jsx**
- Tabs: "Ajustar Stock", "Historial", "Alertas"
- Tab 1: StockManager
- Tab 2: InventoryHistory
- Tab 3: Lista de productos con bajo stock

**Tarea 3.8.5: pages/public/Shop.jsx**
- Título "Catálogo de Productos"
- Layout: ProductFilters (sidebar) + ProductGrid (main)
- Paginación
- Breadcrumbs

**Tarea 3.8.6: pages/public/ProductDetailPage.jsx**
- Usar ProductDetail component
- Breadcrumbs: Inicio > Categoría > Producto
- SEO metadata

### Fase 3.9: Layout y Navegación

**Tarea 3.9.1: components/layout/PublicHeader.jsx**
- Logo/marca ITS SYSTEMS
- SearchBar
- Navegación: Inicio, Productos, Contacto
- Ícono carrito (con contador)
- Botón login/registro o perfil si está logueado

**Tarea 3.9.2: components/layout/AdminSidebar.jsx**
- Agregar items:
  - Dashboard
  - Páginas (CMS)
  - Medios
  - **Categorías** ← nuevo
  - **Productos** ← nuevo
  - **Inventario** ← nuevo
  - Configuración

**Tarea 3.9.3: Actualizar Dashboard**
- Agregar tarjetas:
  - Total productos
  - Productos con bajo stock
  - Valor total inventario
- Links rápidos a productos e inventario

### Fase 3.10: Rutas

**Tarea 3.10.1: Agregar rutas admin en App.jsx**
- /admin/categories → Categories
- /admin/products → Products
- /admin/products/new → ProductEdit (modo crear)
- /admin/products/edit/:id → ProductEdit (modo editar)
- /admin/inventory → Inventory
- Todas con ProtectedRoute (admin/editor)

**Tarea 3.10.2: Agregar rutas públicas en App.jsx**
- /shop → Shop (catálogo público)
- /product/:id → ProductDetailPage
- Actualizar / para redirigir a /shop en lugar de /login

---

## PRUEBAS FRONTEND MÓDULO 3

### Fase 3.11: Testing Frontend Productos

**Tarea 3.11.1: Admin - Categorías**
- Crear categoría padre
- Crear subcategoría
- Editar categoría
- Eliminar categoría sin productos
- ✅ Verificar: árbol de categorías se actualiza

**Tarea 3.11.2: Admin - Productos**
- Crear producto con todas las especificaciones
- Subir 3 imágenes
- Guardar
- ✅ Verificar: aparece en lista, imágenes procesadas

**Tarea 3.11.3: Admin - Editar producto**
- Editar producto existente
- Cambiar precio, stock, agregar imagen
- Guardar
- ✅ Verificar: cambios reflejados

**Tarea 3.11.4: Admin - Filtros**
- Aplicar filtro por categoría
- Aplicar búsqueda por nombre
- Aplicar rango de precio
- ✅ Verificar: resultados correctos

**Tarea 3.11.5: Admin - Stock**
- Ir a Inventario → Ajustar Stock
- Buscar producto
- Agregar 50 unidades con razón "Compra inicial"
- ✅ Verificar: stock actualizado, movimiento registrado

**Tarea 3.11.6: Admin - Bajo stock**
- Crear producto con stock = 5, alert = 10
- Ir a Inventario → Alertas
- ✅ Verificar: aparece en lista de bajo stock

**Tarea 3.11.7: Público - Catálogo**
- Ir a /shop
- Ver grid de productos
- ✅ Verificar: muestra productos publicados, no muestra no publicados

**Tarea 3.11.8: Público - Filtros**
- Aplicar filtro por categoría
- Ajustar slider de precio
- Usar buscador
- ✅ Verificar: filtros funcionan, URL se actualiza

**Tarea 3.11.9: Público - Detalle**
- Click en un producto
- Ver todas las imágenes
- Leer especificaciones
- ✅ Verificar: toda la información visible

**Tarea 3.11.10: Responsive**
- Probar catálogo en móvil (375px)
- Probar filtros en tablet (768px)
- ✅ Verificar: grid se adapta, filtros accesibles

**Tarea 3.11.11: Performance**
- Cargar catálogo con 50+ productos
- Scroll y navegación
- ✅ Verificar: carga fluida, sin lag

---

## ✅ CHECKLIST MÓDULO 3 COMPLETO

### Backend
- [ ] Modelos Category, Product, InventoryMovement
- [ ] Migración ejecutada
- [ ] Controladores categorías completos
- [ ] Controladores productos completos
- [ ] Controladores inventario completos
- [ ] Validadores
- [ ] Rutas configuradas
- [ ] Tests pasando
- [ ] 5 categorías de prueba
- [ ] 20 productos de prueba

### Frontend Admin
- [ ] Servicios: category, product, inventory
- [ ] CategoryManager component
- [ ] ProductList component
- [ ] ProductForm component
- [ ] StockManager component
- [ ] InventoryHistory component
- [ ] Páginas admin completas
- [ ] Sidebar actualizado
- [ ] Dashboard con stats

### Frontend Público
- [ ] ProductCard component
- [ ] ProductGrid component
- [ ] ProductFilters component
- [ ] ProductDetail component
- [ ] SearchBar component
- [ ] PublicHeader component
- [ ] Página Shop
- [ ] Página ProductDetail
- [ ] Rutas configuradas

### Testing
- [ ] CRUD categorías OK
- [ ] CRUD productos OK
- [ ] Filtros admin OK
- [ ] Ajuste de stock OK
- [ ] Alertas bajo stock OK
- [ ] Catálogo público OK
- [ ] Filtros públicos OK
- [ ] Detalle producto OK
- [ ] Responsive OK
- [ ] Performance OK

### Final
- [ ] Git commit
- [ ] Backup BD
- [ ] Documentación actualizada

---

## 🚫 NO CONTINUAR AL MÓDULO 4 HASTA:

1. ✅ Catálogo público funcionando perfectamente
2. ✅ Admin puede gestionar productos completos
3. ✅ Sistema de inventario operativo
4. ✅ Filtros y búsqueda funcionando
5. ✅ Todas las pruebas pasadas

---

# 🎯 MÓDULO 4: CARRITO Y ÓRDENES

**⚠️ COMENZAR SOLO DESPUÉS DE COMPLETAR MÓDULO 3**

## Objetivos del Módulo
- Sistema de carrito de compras
- Proceso de checkout
- Gestión de órdenes
- Notificaciones por email
- Panel de órdenes admin

---

## PARTE A: BACKEND

### Fase 4.1: Schema Órdenes

**Tarea 4.1.1: Extender Prisma**
- Modelo Order: id, orderNumber (único), customerName, customerEmail, customerPhone, shippingAddress (JSON), subtotal, tax, shippingCost, total, status (enum: pending, processing, completed, cancelled), notes, timestamps
- Modelo OrderItem: id, orderId (FK), productId (FK), productName, productSku, quantity, unitPrice, subtotal
- Modelo Payment: id, orderId (FK), gateway, transactionId, amount, status, paymentMethod, metadata (JSON), timestamp
- Relaciones: Order → OrderItems, Order → Payment

**Tarea 4.1.2: Crear enum de estados**
- OrderStatus: PENDING, PROCESSING, COMPLETED, CANCELLED

**Tarea 4.1.3: Migración**
- `npx prisma migrate dev --name add_orders`

### Fase 4.2: Integración de Stripe (Pasarela de Pagos)

**Tarea 4.2.1: Instalar y configurar Stripe**
- Instalar stripe en backend: npm install stripe
- Crear cuenta en Stripe (https://stripe.com)
- Obtener API keys: Publishable Key y Secret Key
- Agregar a .env: STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET

**Tarea 4.2.2: Crear config/stripe.js**
- Importar y configurar Stripe con SECRET_KEY
- Exportar instancia de Stripe configurada

**Tarea 4.2.3: Crear services/stripeService.js**
- createPaymentIntent(amount, currency, metadata): crear intención de pago
- confirmPayment(paymentIntentId): confirmar pago
- refundPayment(paymentIntentId, amount): reembolsar pago
- getPaymentIntent(paymentIntentId): obtener detalles de pago
- Manejar errores de Stripe apropiadamente

**Tarea 4.2.4: Actualizar modelo Payment en Prisma**
- Agregar campo stripePaymentIntentId (String, único)
- Agregar campo stripeCustomerId (String, opcional)
- Agregar campo paymentStatus: pending, succeeded, failed, refunded
- Ejecutar migración: npx prisma migrate dev --name add_stripe_fields

**Tarea 4.2.5: Crear controlador de pagos**
- Crear controllers/paymentController.js
- createPaymentIntent: crear intención de pago para una orden
- confirmPaymentSuccess: confirmar pago exitoso y actualizar orden
- handlePaymentFailure: manejar fallo de pago
- getPaymentStatus: obtener estado del pago

**Tarea 4.2.6: Crear endpoint de webhook de Stripe**
- Crear controllers/stripeWebhookController.js
- Verificar firma del webhook con STRIPE_WEBHOOK_SECRET
- Manejar eventos: payment_intent.succeeded, payment_intent.failed, charge.refunded
- Actualizar estado de orden según evento
- Enviar notificaciones por email según resultado

**Tarea 4.2.7: Configurar rutas de pago**
- POST /api/payments/create-intent (authenticate): crear intención de pago
- POST /api/payments/confirm (authenticate): confirmar pago
- POST /api/webhooks/stripe (público, con verificación): webhook de Stripe
- GET /api/payments/:orderId/status (authenticate): estado del pago

### Fase 4.3: Servicios Email

**Tarea 4.3.1: config/email.js**
- Configurar Nodemailer con SMTP
- Variables de entorno: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM

**Tarea 4.3.2: services/emailService.js**
- sendOrderConfirmation(order, customer): email al cliente con detalles de orden
- sendNewOrderNotification(order): email al admin
- sendOrderStatusUpdate(order, newStatus): email al cliente
- sendPaymentConfirmation(order, payment): email de confirmación de pago
- sendPaymentFailure(order): email de fallo en pago
- generateOrderEmailHTML(order): template HTML del email
- Usar plantillas con variables dinámicas

### Fase 4.4: Controladores Órdenes

**Tarea 4.4.1: controllers/orderController.js**
- createOrder(orderData): 
  - Validar stock disponible
  - Calcular totales (subtotal, IVA 16%, envío)
  - Crear orden con items
  - Reducir stock de productos (crear movimientos de inventario)
  - Generar número de orden único (formato: ORD-YYYYMMDD-XXXX)
  - Enviar emails de confirmación
  - Retornar orden creada
- getAllOrders: listar con filtros (status, fecha, cliente), paginación
- getOrderById: obtener orden completa con items
- getOrderByNumber: buscar por orderNumber
- updateOrderStatus: cambiar status, enviar notificación
- cancelOrder: cancelar orden, restaurar stock
- getOrderStats: estadísticas (ventas del mes, órdenes pendientes, etc)

**Tarea 4.4.2: utils/orderUtils.js**
- generateOrderNumber(): generar número único
- calculateOrderTotals(items, shippingCost): calcular subtotal, tax, total
- validateStock(items): verificar disponibilidad de todos los productos

**Tarea 4.4.3: utils/validators/orderValidators.js**
- createOrderSchema: customerName, customerEmail, customerPhone, shippingAddress (street, city, state, zipCode), items (array)
- updateStatusSchema: status (enum)

### Fase 4.5: Mejoras de Seguridad en E-commerce

**Tarea 4.5.1: CRÍTICO - Validar precios en servidor**
- En createOrder: NUNCA confiar en precios del cliente
- Recalcular precios consultando BD para cada producto
- Usar precio actual del servidor (discountPrice o price)
- Validar que productos existan y estén publicados
- Validar stock disponible antes de crear orden

**Tarea 4.5.2: Validar integridad de orden**
- Calcular subtotal, IVA (16%) y total en servidor
- Validar que cantidades sean números positivos
- Validar que productos no estén duplicados en items
- Loggear todas las órdenes creadas con detalles completos

**Tarea 4.5.3: Validar datos de envío**
- Validar formato de email
- Validar formato de teléfono
- Sanitizar dirección de envío
- Prevenir inyección de datos maliciosos

### Fase 4.6: Rutas Órdenes

**Tarea 4.6.1: routes/orders.routes.js**
- POST /orders (público - crear orden)
- GET /orders (authenticate + admin - listar todas)
- GET /orders/stats (authenticate + admin - estadísticas)
- GET /orders/:id (authenticate - ver orden específica)
- GET /orders/number/:orderNumber (público con validación - tracking)
- PATCH /orders/:id/status (authenticate + admin - cambiar status)
- DELETE /orders/:id (authenticate + admin - cancelar orden)

**Tarea 4.6.2: Montar en server.js**
- app.use('/api/orders', ordersRoutes)

---

## PRUEBAS BACKEND MÓDULO 4

### Fase 4.7: Testing Backend Órdenes

**Tarea 4.7.1: tests/orders.test.js**
- Test crear orden: validar cálculos, reducción de stock, generación de número
- Test con stock insuficiente: debe fallar
- Test listar órdenes con filtros
- Test cambiar status de orden
- Test cancelar orden: debe restaurar stock

**Tarea 4.7.2: tests/email.test.js**
- Mock de nodemailer
- Test envío de confirmación
- Test envío de notificación admin
- Test cambio de status

**Tarea 4.7.3: Ejecutar tests**
- `npm test`

**Tarea 4.7.4: Pruebas manuales**
- Crear orden completa con Postman
- Verificar email recibido (usar Mailtrap o similar en desarrollo)
- Verificar stock reducido
- Cambiar status de orden
- Cancelar orden y verificar stock restaurado

**✅ CHECKPOINT:** Backend Órdenes completo y testeado. NO continuar al frontend hasta verificar.

---

## PARTE B: FRONTEND

### Fase 4.8: Context del Carrito

**Tarea 4.8.1: context/CartContext.jsx**
- Estados: cart (array de items), loading
- useEffect: cargar cart de localStorage
- addToCart(product, quantity): 
  - Verificar stock disponible
  - Si ya existe, incrementar cantidad
  - Si no, agregar nuevo item
  - Guardar en localStorage
  - Toast de confirmación
- removeFromCart(productId): eliminar item
- updateQuantity(productId, quantity): actualizar cantidad
- clearCart(): vaciar carrito
- getCartTotal(): calcular subtotal
- getCartItemCount(): total de items
- Hook useCart() para consumir

**Tarea 4.8.2: utils/cartUtils.js**
- calculateItemSubtotal(item): precio * cantidad
- calculateCartSubtotal(items): suma de todos los items
- calculateTax(subtotal): 16% IVA
- calculateTotal(subtotal, tax, shipping): total final

### Fase 4.9: Servicios Frontend Órdenes y Pagos

**Tarea 4.9.1: services/paymentService.js**
- createPaymentIntent(orderId, amount): POST /api/payments/create-intent
- confirmPayment(orderId, paymentIntentId): POST /api/payments/confirm
- getPaymentStatus(orderId): GET /api/payments/:orderId/status
- Manejar errores de Stripe

**Tarea 4.9.2: services/orderService.js**
- createOrder(orderData): POST /api/orders
- getAllOrders(filters): GET /api/orders (admin)
- getOrderById(id): GET /api/orders/:id
- getOrderByNumber(orderNumber): GET /api/orders/number/:orderNumber
- updateOrderStatus(id, status): PATCH /api/orders/:id/status
- cancelOrder(id): DELETE /api/orders/:id
- getOrderStats(): GET /api/orders/stats

**Tarea 4.9.3: Configurar Stripe en frontend**
- Crear utils/stripeConfig.js
- Importar loadStripe de @stripe/stripe-js
- Configurar con STRIPE_PUBLISHABLE_KEY
- Exportar instancia de Stripe

### Fase 4.10: Componentes Carrito

**Tarea 4.10.1: components/ecommerce/CartIcon.jsx**
- Ícono de carrito en header
- Badge con número de items
- Click abre mini cart o navega a /cart

**Tarea 4.10.2: components/ecommerce/MiniCart.jsx**
- Dropdown que muestra en header
- Lista de items (máx 3)
- Subtotal
- Botones: "Ver carrito", "Checkout"

**Tarea 4.10.3: components/ecommerce/CartItem.jsx**
- Imagen miniatura del producto
- Nombre, precio unitario
- Selector de cantidad (+/-)
- Subtotal del item
- Botón eliminar

**Tarea 4.10.4: components/ecommerce/CartSummary.jsx**
- Subtotal
- IVA (16%)
- Envío
- Total
- Botón "Proceder al checkout"

### Fase 4.11: Componentes Checkout

**Tarea 4.11.1: components/ecommerce/CheckoutSteps.jsx**
- Indicador de pasos: 1. Información, 2. Envío, 3. Confirmación
- Visual de paso actual

**Tarea 4.11.2: components/ecommerce/CustomerInfoForm.jsx**
- Campos: nombre completo, email, teléfono, RFC (opcional)
- Validación en tiempo real
- Usar react-hook-form

**Tarea 4.11.3: components/ecommerce/ShippingAddressForm.jsx**
- Campos: calle y número, colonia, ciudad, estado, código postal, referencias
- Validación de código postal
- Usar react-hook-form

**Tarea 4.11.4: components/ecommerce/StripePaymentForm.jsx**
- Instalar @stripe/stripe-js y @stripe/react-stripe-js en frontend
- Crear componente con Stripe Elements
- CardElement para ingresar datos de tarjeta
- Manejar errores de validación de Stripe
- Mostrar loading durante procesamiento
- Integrar con backend para crear PaymentIntent

**Tarea 4.11.5: components/ecommerce/OrderReview.jsx**
- Resumen de items del carrito
- Información del cliente
- Dirección de envío
- Totales
- Integrar StripePaymentForm
- Checkbox "Acepto términos y condiciones"
- Botón "Pagar ahora" (procesa pago con Stripe)

**Tarea 4.11.6: components/ecommerce/OrderSuccess.jsx**
- Mensaje de confirmación de pago exitoso
- Número de orden
- Resumen de la compra
- Detalles del pago (últimos 4 dígitos de tarjeta)
- Email de confirmación enviado
- Botón "Ver orden" o "Seguir comprando"

### Fase 4.12: Componentes Admin Órdenes

**Tarea 4.12.1: components/admin/OrderList.jsx**
- Tabla: número orden, fecha, cliente, total, status, acciones
- Filtros: status, rango de fechas, búsqueda por cliente/número
- Paginación
- Acciones: ver detalle, cambiar status, cancelar
- Badges de colores por status

**Tarea 4.12.2: components/admin/OrderDetail.jsx**
- Información de la orden: número, fecha, status
- Datos del cliente
- Dirección de envío
- Lista de productos ordenados
- Totales
- Historial de cambios de status (timeline)
- Botones: cambiar status, imprimir, cancelar

**Tarea 4.12.3: components/admin/OrderStats.jsx**
- Cards con estadísticas:
  - Ventas del día
  - Ventas del mes
  - Órdenes pendientes
  - Órdenes completadas este mes
- Gráfica de ventas (últimos 30 días)

**Tarea 4.12.4: components/admin/StatusUpdateModal.jsx**
- Modal para cambiar status
- Select con opciones de status
- Notas adicionales (opcional)
- Confirmar cambio

### Fase 4.13: Páginas Carrito y Órdenes

**Tarea 4.13.1: pages/public/Cart.jsx**
- Título "Mi Carrito"
- Si está vacío: mensaje y botón "Ir a comprar"
- Si tiene items: lista de CartItem + CartSummary
- Botón "Continuar comprando"
- Botón "Proceder al checkout"

**Tarea 4.13.2: pages/public/Checkout.jsx**
- CheckoutSteps component
- Paso 1: CustomerInfoForm
- Paso 2: ShippingAddressForm
- Paso 3: OrderReview
- Navegación entre pasos
- Validación antes de avanzar
- Submit final crea la orden

**Tarea 4.13.3: pages/public/OrderSuccessPage.jsx**
- OrderSuccess component
- Obtener orden creada desde state o URL param

**Tarea 4.13.4: pages/public/OrderTracking.jsx**
- Form para ingresar número de orden
- Mostrar detalle de orden si existe
- Status actual
- Timeline de estados

**Tarea 4.13.5: pages/admin/Orders.jsx**
- OrderStats en la parte superior
- OrderList
- Breadcrumbs

**Tarea 4.13.6: pages/admin/OrderDetailPage.jsx**
- OrderDetail component
- StatusUpdateModal
- Breadcrumbs: Órdenes > Detalle

### Fase 4.14: Actualizar Componentes

**Tarea 4.14.1: Actualizar ProductDetail**
- Agregar botón "Agregar al carrito"
- Integrar con useCart()
- Validar stock antes de agregar
- Mostrar mensaje si no hay stock

**Tarea 4.14.2: Actualizar PublicHeader**
- Agregar CartIcon con contador
- MiniCart en dropdown

**Tarea 4.14.3: Actualizar AdminSidebar**
- Agregar item "Órdenes"

**Tarea 4.14.4: Actualizar Dashboard Admin**
- Integrar OrderStats
- Links rápidos a órdenes

### Fase 4.15: Rutas

**Tarea 4.15.1: Agregar rutas públicas en App.jsx**
- /cart → Cart
- /checkout → Checkout
- /order-success → OrderSuccessPage
- /order-tracking → OrderTracking

**Tarea 4.15.2: Agregar rutas admin en App.jsx**
- /admin/orders → Orders (ProtectedRoute admin)
- /admin/orders/:id → OrderDetailPage (ProtectedRoute admin)

---

## PRUEBAS FRONTEND MÓDULO 4

### Fase 4.16: Testing Frontend Carrito y Órdenes

**Tarea 4.16.1: Flujo agregar al carrito**
- En detalle de producto, agregar 2 unidades
- ✅ Verificar: toast confirmación, contador actualizado, item en carrito

**Tarea 4.16.2: Ver carrito**
- Ir a /cart
- ✅ Verificar: muestra items agregados, subtotales correctos

**Tarea 4.16.3: Modificar carrito**
- Cambiar cantidad de un item
- Eliminar un item
- ✅ Verificar: totales se recalculan, localStorage actualizado

**Tarea 4.16.4: Checkout paso a paso**
- Click "Proceder al checkout"
- Paso 1: llenar info del cliente
- Paso 2: llenar dirección
- Paso 3: revisar y confirmar
- ✅ Verificar: navegación fluida, datos persistentes entre pasos

**Tarea 4.16.5: Probar pago con Stripe (modo test)**
- En paso 3, ingresar datos de tarjeta de prueba de Stripe
- Tarjeta de prueba: 4242 4242 4242 4242, cualquier fecha futura, cualquier CVC
- Click "Pagar ahora"
- ✅ Verificar:
  - Pago procesado exitosamente
  - PaymentIntent creado en Stripe dashboard
  - Orden creada con status COMPLETED
  - Redirige a success page
  - Muestra número de orden y confirmación de pago
  - Carrito se vacía
  - Email de confirmación recibido (verificar en Mailtrap)

**Tarea 4.16.6: Probar pago fallido**
- Usar tarjeta de prueba que falla: 4000 0000 0000 0002
- ✅ Verificar:
  - Muestra error de pago
  - Orden no se crea o queda en PENDING
  - Stock no se reduce
  - Usuario puede reintentar

**Tarea 4.16.7: Verificar webhook de Stripe**
- Crear orden y pagar
- ✅ Verificar en logs del backend:
  - Webhook recibido de Stripe
  - Evento payment_intent.succeeded procesado
  - Orden actualizada correctamente

**Tarea 4.16.8: Stock después de orden**
- Verificar en admin que el stock de productos se redujo
- ✅ Verificar: movimientos de inventario registrados

**Tarea 4.16.9: Admin - Ver órdenes**
- Login como admin
- Ir a /admin/orders
- ✅ Verificar: muestra orden recién creada

**Tarea 4.16.10: Admin - Cambiar status**
- Abrir detalle de orden
- Cambiar status a "Procesando"
- ✅ Verificar: 
  - Status actualizado
  - Timeline muestra cambio
  - Email enviado al cliente (verificar Mailtrap)

**Tarea 4.16.11: Admin - Cancelar orden**
- Cancelar una orden
- ✅ Verificar:
  - Status = Cancelada
  - Stock restaurado
  - Movimientos de inventario registrados

**Tarea 4.16.12: Order tracking público**
- Ir a /order-tracking
- Ingresar número de orden
- ✅ Verificar: muestra detalle de la orden

**Tarea 4.16.13: Validaciones**
- Intentar agregar más unidades que el stock
- ✅ Verificar: muestra error
- Intentar checkout con carrito vacío
- ✅ Verificar: redirige o muestra mensaje

**Tarea 4.16.14: Persistencia del carrito**
- Agregar items al carrito
- Cerrar navegador
- Abrir nuevamente
- ✅ Verificar: carrito persiste

---

## ✅ CHECKLIST MÓDULO 4 COMPLETO

### Backend
- [ ] Modelos Order, OrderItem, Payment
- [ ] Migración ejecutada
- [ ] Stripe instalado y configurado
- [ ] config/stripe.js creado
- [ ] services/stripeService.js completo
- [ ] Campos de Stripe en modelo Payment
- [ ] controllers/paymentController.js completo
- [ ] Webhook de Stripe configurado y funcionando
- [ ] Rutas de pago configuradas
- [ ] Email configurado (Nodemailer)
- [ ] Servicios de email funcionando (incluye emails de pago)
- [ ] Controladores de órdenes completos
- [ ] Validadores
- [ ] Rutas configuradas
- [ ] Tests pasando
- [ ] Emails de prueba recibidos

### Frontend Context y Servicios
- [ ] CartContext implementado
- [ ] Funciones de carrito OK
- [ ] localStorage funcionando
- [ ] paymentService completo
- [ ] orderService completo
- [ ] Stripe configurado en frontend (loadStripe)
- [ ] @stripe/react-stripe-js instalado

### Frontend Público
- [ ] CartIcon y MiniCart
- [ ] CartItem y CartSummary
- [ ] CheckoutSteps
- [ ] Forms: CustomerInfo, ShippingAddress
- [ ] StripePaymentForm con CardElement
- [ ] OrderReview con integración de pago
- [ ] OrderSuccess con detalles de pago
- [ ] OrderTracking
- [ ] Páginas públicas completas

### Frontend Admin
- [ ] OrderList component
- [ ] OrderDetail component
- [ ] OrderStats component
- [ ] StatusUpdateModal
- [ ] Páginas admin completas

### Testing
- [ ] Agregar al carrito OK
- [ ] Pago con Stripe exitoso (tarjeta de prueba)
- [ ] Pago fallido manejado correctamente
- [ ] Webhook de Stripe funcionando
- [ ] PaymentIntent creado en Stripe dashboard
- [ ] Modificar carrito OK
- [ ] Checkout completo OK
- [ ] Orden creada OK
- [ ] Stock reducido OK
- [ ] Emails enviados OK
- [ ] Admin ver órdenes OK
- [ ] Cambiar status OK
- [ ] Cancelar orden OK
- [ ] Tracking público OK
- [ ] Validaciones OK
- [ ] Persistencia OK

### Final
- [ ] Git commit
- [ ] Backup BD
- [ ] Documentación actualizada

---

## 🚫 NO CONTINUAR AL MÓDULO 5 HASTA:

1. ✅ Flujo completo de compra funcionando sin errores
2. ✅ Emails de confirmación enviándose correctamente
3. ✅ Admin puede gestionar órdenes completamente
4. ✅ Stock se maneja correctamente (reduce y restaura)
5. ✅ Todas las pruebas pasadas

---

# 🎯 MÓDULO 5: INTEGRACIÓN CISCO Y DASHBOARD AVANZADO

**⚠️ COMENZAR SOLO DESPUÉS DE COMPLETAR MÓDULO 4**

## Objetivos del Módulo
- Integración con API de Cisco
- Sincronización automática de productos e inventario
- Dashboard con métricas y reportes
- Cron jobs para sincronización
- Panel de configuración

---

## PARTE A: BACKEND

### Fase 5.1: Schema Cisco

**Tarea 5.1.1: Extender Prisma**
- Modelo CiscoSyncLog: id, syncType (products/inventory), status (success/error), productsSynced, productsFailed, errorMessage, syncDate
- Modelo Settings: key (PK), value (JSON), category, updatedAt
- Agregar campos a Product (si no existen): ciscoSku, lastSynced

**Tarea 5.1.2: Migración**
- `npx prisma migrate dev --name add_cisco_integration`

### Fase 5.2:
### Fase 5.2: Servicio de Integración Cisco

**Tarea 5.2.1: services/ciscoService.js**
- Clase CiscoService con métodos:
- constructor: inicializar con API_URL y API_KEY desde .env
- authenticate(): obtener token de Cisco API
- getProducts(): obtener todos los productos de Cisco
- getProduct(sku): obtener un producto específico
- syncProducts(): sincronizar productos completos
- syncInventory(): sincronizar solo stock
- mapCiscoProduct(ciscoData): mapear campos Cisco a schema interno
- handleSyncError(error): manejar y loggear errores
- Usar axios con retry logic (3 intentos)
- Timeout de 30 segundos por request

**Tarea 5.2.2: utils/ciscoMapper.js**
- mapProductFields(ciscoProduct): convertir estructura Cisco a nuestra BD
- Mapeos específicos según documentación de Cisco API
- Manejar campos opcionales
- Normalizar formatos (precios, SKUs, etc)

**Tarea 5.2.3: Agregar variables .env**
- CISCO_API_URL
- CISCO_API_KEY
- CISCO_API_SECRET
- CISCO_SYNC_FREQUENCY (en minutos)

### Fase 5.3: Cron Jobs

**Tarea 5.3.1: jobs/syncJob.js**
- Importar node-cron
- Crear job para sincronización completa de productos:
  - Frecuencia: cada 6 horas (configurable desde .env)
  - Ejecutar ciscoService.syncProducts()
  - Loggear en CiscoSyncLog
  - Notificar por email si hay errores críticos
- Crear job para sincronización de inventario:
  - Frecuencia: cada 1 hora
  - Ejecutar ciscoService.syncInventory()
  - Loggear resultados
- Iniciar jobs al arrancar el servidor

**Tarea 5.3.2: Integrar en server.js**
- Importar syncJob
- Iniciar jobs después de conectar a BD
- Loggear "Sync jobs started"

### Fase 5.4: Controladores Cisco

**Tarea 5.4.1: controllers/ciscoController.js**
- syncNow(): ejecutar sincronización manual inmediata
- getSyncStatus(): obtener última sincronización
- getSyncLogs(filters): listar logs con paginación
- getSyncStats(): estadísticas de sincronizaciones
- configureCiscoSettings(settings): guardar config en tabla Settings
- getCiscoSettings(): obtener configuración actual
- testConnection(): probar conexión con API Cisco

**Tarea 5.4.2: controllers/settingsController.js**
- getAllSettings(category): obtener configuraciones por categoría
- updateSetting(key, value): actualizar una configuración
- getPublicSettings(): configuraciones visibles para frontend

### Fase 5.5: Dashboard y Reportes

**Tarea 5.5.1: controllers/dashboardController.js**
- getOverview(): métricas generales
  - Total productos, categorías, órdenes
  - Ventas del día, semana, mes
  - Productos con bajo stock
  - Órdenes pendientes
- getSalesReport(startDate, endDate): reporte de ventas
  - Ventas por día
  - Productos más vendidos
  - Categorías top
- getInventoryReport(): reporte de inventario
  - Valor total del inventario
  - Productos más/menos stock
  - Movimientos recientes
- getTopProducts(limit): productos best sellers

**Tarea 5.5.2: controllers/reportsController.js**
- exportSalesReport(format): exportar a Excel/PDF
- exportInventoryReport(format)
- exportOrdersReport(filters, format)
- scheduleReport(reportType, frequency, email): programar envío automático

### Fase 5.6: Rutas

**Tarea 5.6.1: routes/cisco.routes.js**
- POST /cisco/sync (authenticate + admin - sincronizar ahora)
- GET /cisco/status (authenticate + admin - estado actual)
- GET /cisco/logs (authenticate + admin - historial)
- GET /cisco/stats (authenticate + admin - estadísticas)
- POST /cisco/settings (authenticate + admin - configurar)
- GET /cisco/settings (authenticate + admin - obtener config)
- POST /cisco/test-connection (authenticate + admin - probar conexión)

**Tarea 5.6.2: routes/settings.routes.js**
- GET /settings (authenticate + admin)
- GET /settings/:category (authenticate + admin)
- PUT /settings/:key (authenticate + admin)
- GET /settings/public (público - solo settings públicas)

**Tarea 5.6.3: routes/dashboard.routes.js**
- GET /dashboard/overview (authenticate)
- GET /dashboard/sales (authenticate + admin)
- GET /dashboard/inventory (authenticate + admin)
- GET /dashboard/top-products (authenticate)

**Tarea 5.6.4: routes/reports.routes.js**
- GET /reports/sales (authenticate + admin)
- GET /reports/inventory (authenticate + admin)
- GET /reports/orders (authenticate + admin)
- POST /reports/export (authenticate + admin)
- POST /reports/schedule (authenticate + admin)

**Tarea 5.6.5: Montar en server.js**
- /api/cisco, /api/settings, /api/dashboard, /api/reports

---

## PRUEBAS BACKEND MÓDULO 5

### Fase 5.7: Testing Backend Cisco y Dashboard

**Tarea 5.7.1: tests/cisco.test.js**
- Mock de Cisco API
- Test autenticación Cisco
- Test mapeo de productos
- Test sincronización exitosa
- Test manejo de errores
- Test logs de sincronización

**Tarea 5.7.2: tests/dashboard.test.js**
- Test métricas de overview
- Test reporte de ventas con fechas
- Test reporte de inventario
- Test productos top

**Tarea 5.7.3: tests/cron.test.js**
- Test que cron jobs se inicien
- Test ejecución de sincronización programada
- Mock de node-cron

**Tarea 5.7.4: Ejecutar tests**
- `npm test`
- Todos deben pasar

**Tarea 5.7.5: Pruebas manuales**
- Configurar credenciales Cisco en .env
- Ejecutar sincronización manual con Postman
- Verificar logs en BD
- Verificar productos sincronizados
- Probar endpoints de dashboard
- Verificar cron jobs en logs del servidor

**✅ CHECKPOINT:** Backend Cisco y Dashboard completo y testeado. NO continuar al frontend hasta verificar.

---

## PARTE B: FRONTEND

### Fase 5.8: Servicios Dashboard y Cisco

**Tarea 5.8.1: services/ciscoService.js**
- syncNow()
- getSyncStatus()
- getSyncLogs(page, limit)
- getSyncStats()
- configureCiscoSettings(settings)
- getCiscoSettings()
- testConnection()

**Tarea 5.8.2: services/dashboardService.js**
- getOverview()
- getSalesReport(startDate, endDate)
- getInventoryReport()
- getTopProducts(limit)

**Tarea 5.8.3: services/reportService.js**
- exportSalesReport(format, filters)
- exportInventoryReport(format)
- exportOrdersReport(format, filters)
- scheduleReport(config)

**Tarea 5.8.4: services/settingsService.js**
- getAllSettings(category)
- updateSetting(key, value)
- getPublicSettings()

### Fase 5.9: Componentes Dashboard

**Tarea 5.9.1: components/admin/DashboardOverview.jsx**
- Grid de 4 columnas con cards:
  - Total Productos (ícono, número, cambio vs mes anterior)
  - Ventas del Mes (monto, porcentaje de crecimiento)
  - Órdenes Pendientes (número, link a órdenes)
  - Bajo Stock (número, link a inventario)
- Usar lucide-react para íconos
- Colores según métrica (verde positivo, rojo negativo)

**Tarea 5.9.2: components/admin/SalesChart.jsx**
- Gráfica de línea de ventas (últimos 30 días)
- Usar recharts: LineChart
- Eje X: fechas
- Eje Y: montos
- Tooltip con detalles
- Selector de período: 7 días, 30 días, 90 días

**Tarea 5.9.3: components/admin/TopProductsWidget.jsx**
- Lista de top 10 productos más vendidos
- Mostrar: imagen, nombre, unidades vendidas
- Barra de progreso relativa al #1
- Link a detalle del producto

**Tarea 5.9.4: components/admin/RecentOrdersWidget.jsx**
- Tabla de últimas 5 órdenes
- Columnas: número, cliente, monto, status
- Link a detalle de orden
- Botón "Ver todas"

**Tarea 5.9.5: components/admin/LowStockWidget.jsx**
- Lista de productos con stock bajo
- Alerta visual (rojo)
- Stock actual vs alerta
- Botón "Ajustar stock"

**Tarea 5.9.6: components/admin/InventoryValueCard.jsx**
- Card mostrando valor total del inventario
- Cálculo: suma(precio * stock) de todos los productos
- Desglose por categoría (opcional)

### Fase 5.10: Componentes Cisco

**Tarea 5.10.1: components/admin/CiscoConnectionStatus.jsx**
- Indicador visual: conectado (verde) / desconectado (rojo)
- Última sincronización exitosa (timestamp)
- Botón "Probar conexión"
- Botón "Sincronizar ahora"

**Tarea 5.10.2: components/admin/CiscoSyncLogs.jsx**
- Tabla de logs de sincronización
- Columnas: fecha, tipo, productos sincronizados, errores, status
- Filtros: tipo, status, rango de fechas
- Paginación
- Expandir row para ver detalles de errores

**Tarea 5.10.3: components/admin/CiscoConfigForm.jsx**
- Form para configurar integración:
  - API URL
  - API Key (input password)
  - API Secret (input password)
  - Frecuencia sincronización (select: 1h, 6h, 12h, 24h)
  - Sincronizar al guardar (checkbox)
- Botón "Probar conexión" antes de guardar
- Validaciones

**Tarea 5.10.4: components/admin/SyncStatsCards.jsx**
- Cards con estadísticas:
  - Total sincronizaciones (este mes)
  - Sincronizaciones exitosas (porcentaje)
  - Productos sincronizados (total)
  - Última actualización

**Tarea 5.10.5: components/admin/ProductMappingTable.jsx**
- Tabla de mapeo SKU Cisco → SKU interno
- Columnas: SKU Cisco, Nombre Cisco, SKU interno, Nombre interno, Estado
- Permite editar mapeos
- Agregar nuevo mapeo manual
- Eliminar mapeo

### Fase 5.11: Componentes Reportes

**Tarea 5.11.1: components/admin/SalesReportTable.jsx**
- Tabla con datos de ventas
- Filtros: rango de fechas
- Columnas configurables
- Totales al final
- Botón "Exportar" (Excel/PDF)

**Tarea 5.11.2: components/admin/InventoryReportTable.jsx**
- Tabla de inventario
- Filtros: categoría, stock bajo
- Columnas: producto, SKU, stock, valor
- Totales
- Exportar

**Tarea 5.11.3: components/admin/DateRangePicker.jsx**
- Selector de rango de fechas
- Presets: Hoy, Esta semana, Este mes, Últimos 3 meses
- Calendarios inicio/fin
- Validación (fin > inicio)

**Tarea 5.11.4: components/admin/ExportMenu.jsx**
- Dropdown button "Exportar"
- Opciones: Excel, PDF, CSV
- Click descarga el archivo

### Fase 5.12: Componentes Configuración

**Tarea 5.12.1: components/admin/SettingsForm.jsx**
- Form con tabs:
  - General (nombre empresa, logo, contacto)
  - Tienda (moneda, impuestos, envío)
  - Emails (SMTP, plantillas)
  - Integración Cisco (CiscoConfigForm)
- Guardar por sección
- Toast de confirmación

**Tarea 5.12.2: components/admin/EmailTemplateEditor.jsx**
- Editor simple para plantillas de email
- Variables disponibles mostradas
- Preview del email
- Guardar plantilla

### Fase 5.13: Páginas Dashboard Mejorado

**Tarea 5.13.1: Rediseñar pages/admin/Dashboard.jsx**
- Layout de 3 columnas
- Columna 1 (ancha):
  - DashboardOverview (4 cards)
  - SalesChart
- Columna 2 (media):
  - TopProductsWidget
  - RecentOrdersWidget
- Columna 3 (estrecha):
  - LowStockWidget
  - CiscoConnectionStatus
- Responsive: stack en móvil

**Tarea 5.13.2: pages/admin/CiscoIntegration.jsx**
- Título "Integración Cisco"
- Tabs:
  - Configuración (CiscoConfigForm)
  - Estado (CiscoConnectionStatus + SyncStatsCards)
  - Logs (CiscoSyncLogs)
  - Mapeo (ProductMappingTable)
- Breadcrumbs

**Tarea 5.13.3: pages/admin/Reports.jsx**
- Título "Reportes"
- Tabs:
  - Ventas (SalesReportTable)
  - Inventario (InventoryReportTable)
  - Órdenes (tabla similar)
- DateRangePicker global
- ExportMenu en cada tab

**Tarea 5.13.4: pages/admin/Settings.jsx**
- SettingsForm con todas las configuraciones
- Breadcrumbs
- Botón "Guardar cambios" sticky

### Fase 5.14: Actualizar Navegación

**Tarea 5.14.1: Actualizar AdminSidebar**
- Reorganizar items:
  - Dashboard (con ícono Home)
  - Contenido (expandible):
    - Páginas
    - Medios
  - E-commerce (expandible):
    - Categorías
    - Productos
    - Inventario
    - Órdenes
  - Reportes (nuevo)
  - Integración Cisco (nuevo)
  - Configuración (nuevo)
- Íconos con lucide-react
- Highlight item activo

**Tarea 5.14.2: Agregar NotificationBell.jsx**
- Ícono de campana en header
- Badge con número de notificaciones
- Dropdown con notificaciones recientes:
  - Orden nueva
  - Stock bajo
  - Error de sincronización Cisco
- Mark as read
- Link "Ver todas"

### Fase 5.15: Rutas

**Tarea 5.15.1: Agregar rutas en App.jsx**
- /admin/cisco → CiscoIntegration (ProtectedRoute admin)
- /admin/reports → Reports (ProtectedRoute admin)
- /admin/settings → Settings (ProtectedRoute admin)

---

## PRUEBAS FRONTEND MÓDULO 5

### Fase 5.16: Testing Frontend Dashboard y Cisco

**Tarea 5.16.1: Dashboard mejorado**
- Login como admin
- Ir a /admin
- ✅ Verificar:
  - 4 cards con métricas se cargan
  - Gráfica de ventas muestra datos
  - Top productos visible
  - Órdenes recientes listadas
  - Widgets responsive

**Tarea 5.16.2: Integración Cisco - Configuración**
- Ir a /admin/cisco
- Tab "Configuración"
- Llenar credenciales Cisco
- Click "Probar conexión"
- ✅ Verificar: mensaje de conexión exitosa o error claro

**Tarea 5.16.3: Sincronización manual**
- En tab "Estado"
- Click "Sincronizar ahora"
- ✅ Verificar:
  - Botón cambia a "Sincronizando..."
  - Progress o spinner
  - Toast de éxito/error
  - Stats se actualizan

**Tarea 5.16.4: Logs de sincronización**
- Tab "Logs"
- ✅ Verificar:
  - Lista de sincronizaciones anteriores
  - Filtros funcionan
  - Expandir row muestra detalles
  - Paginación funciona

**Tarea 5.16.5: Mapeo de productos**
- Tab "Mapeo"
- Agregar mapeo manual
- Editar mapeo existente
- ✅ Verificar: cambios se guardan

**Tarea 5.16.6: Reportes de ventas**
- Ir a /admin/reports
- Tab "Ventas"
- Seleccionar rango de fechas (último mes)
- ✅ Verificar:
  - Tabla muestra datos correctos
  - Totales calculados
  - Filtros funcionan

**Tarea 5.16.7: Exportar reporte**
- En reporte de ventas
- Click "Exportar" → Excel
- ✅ Verificar:
  - Archivo descarga
  - Contiene los datos correctos
  - Formato legible

**Tarea 5.16.8: Configuración general**
- Ir a /admin/settings
- Tab "General"
- Actualizar nombre empresa
- Guardar
- ✅ Verificar:
  - Toast de éxito
  - Cambio persiste al recargar

**Tarea 5.16.9: Configuración de emails**
- Tab "Emails"
- Configurar SMTP
- Editar plantilla de confirmación de orden
- Guardar
- ✅ Verificar: configuración guardada

**Tarea 5.16.10: Notificaciones**
- Verificar campana de notificaciones en header
- ✅ Verificar:
  - Badge con número correcto
  - Dropdown muestra notificaciones
  - Click en notificación navega al detalle
  - Mark as read funciona

**Tarea 5.16.11: Cron job en acción**
- Esperar 1 hora (o ajustar frecuencia en .env a 5 min para testing)
- ✅ Verificar:
  - Sincronización automática se ejecuta
  - Log nuevo aparece en /admin/cisco
  - Sin errores en consola del servidor

**Tarea 5.16.12: Performance del dashboard**
- Cargar dashboard con 100+ productos, 50+ órdenes
- ✅ Verificar:
  - Carga en < 3 segundos
  - Gráficas renderizan bien
  - Sin lag al hacer scroll

**Tarea 5.16.13: Responsive dashboard**
- Probar dashboard en:
  - Móvil (375px)
  - Tablet (768px)
  - Desktop (1920px)
- ✅ Verificar:
  - Widgets se reorganizan
  - Todo es accesible
  - Sidebar colapsa en móvil

---

## ✅ CHECKLIST MÓDULO 5 COMPLETO

### Backend
- [ ] Modelos CiscoSyncLog, Settings
- [ ] Migración ejecutada
- [ ] CiscoService implementado
- [ ] Mapper de productos Cisco
- [ ] Cron jobs configurados
- [ ] Controladores Cisco completos
- [ ] Controladores Dashboard completos
- [ ] Controladores Settings completos
- [ ] Controladores Reportes completos
- [ ] Validadores
- [ ] Rutas configuradas
- [ ] Tests pasando
- [ ] Sincronización manual funciona
- [ ] Cron jobs ejecutándose

### Frontend Servicios
- [ ] ciscoService completo
- [ ] dashboardService completo
- [ ] reportService completo
- [ ] settingsService completo

### Frontend Dashboard
- [ ] DashboardOverview component
- [ ] SalesChart component
- [ ] TopProductsWidget
- [ ] RecentOrdersWidget
- [ ] LowStockWidget
- [ ] InventoryValueCard
- [ ] Dashboard rediseñado

### Frontend Cisco
- [ ] CiscoConnectionStatus
- [ ] CiscoSyncLogs
- [ ] CiscoConfigForm
- [ ] SyncStatsCards
- [ ] ProductMappingTable
- [ ] Página CiscoIntegration completa

### Frontend Reportes
- [ ] SalesReportTable
- [ ] InventoryReportTable
- [ ] DateRangePicker
- [ ] ExportMenu
- [ ] Página Reports completa

### Frontend Configuración
- [ ] SettingsForm
- [ ] EmailTemplateEditor
- [ ] Página Settings completa

### Frontend General
- [ ] AdminSidebar actualizado
- [ ] NotificationBell
- [ ] Rutas configuradas

### Testing
- [ ] Dashboard carga correctamente
- [ ] Cisco configuración funciona
- [ ] Probar conexión OK
- [ ] Sincronización manual OK
- [ ] Logs visibles
- [ ] Mapeo de productos OK
- [ ] Reportes generan datos
- [ ] Exportar funciona
- [ ] Configuración se guarda
- [ ] Notificaciones funcionan
- [ ] Cron job ejecuta
- [ ] Performance OK
- [ ] Responsive OK

### Final
- [ ] Git commit
- [ ] Backup BD
- [ ] Documentación actualizada
- [ ] Variables .env documentadas

---

## 🎉 ¡PROYECTO COMPLETO!

### ✅ VERIFICACIÓN FINAL DE TODO EL PROYECTO

**Tarea Final 1: Testing E2E completo**
- Como usuario público:
  - [ ] Navegar catálogo
  - [ ] Ver producto
  - [ ] Agregar al carrito
  - [ ] Hacer checkout
  - [ ] Recibir confirmación
- Como admin:
  - [ ] Login
  - [ ] Ver dashboard con métricas
  - [ ] Crear producto
  - [ ] Procesar orden
  - [ ] Cambiar status orden
  - [ ] Ver reportes
  - [ ] Configurar Cisco
  - [ ] Sincronizar productos

**Tarea Final 2: Performance**
- [ ] Lighthouse score > 85 en todas las páginas
- [ ] Backend responde en < 500ms
- [ ] Frontend carga en < 3 segundos
- [ ] Imágenes optimizadas
- [ ] Sin memory leaks

**Tarea Final 3: Seguridad**
- [ ] Todas las rutas admin protegidas
- [ ] Inputs validados en frontend y backend
- [ ] SQL injection prevenido (Prisma)
- [ ] XSS prevenido
- [ ] CORS configurado correctamente
- [ ] Rate limiting activo
- [ ] Secrets en .env, no en código

**Tarea Final 4: Documentación**
- [ ] README.md completo con:
  - Descripción del proyecto
  - Instalación paso a paso
  - Variables de entorno necesarias
  - Comandos útiles
  - Estructura del proyecto
- [ ] API documentation (opcional: Swagger)
- [ ] Guía de usuario para admin
- [ ] Troubleshooting

**Tarea Final 5: Deploy Preparation**
- [ ] .env.production con valores de producción
- [ ] Scripts de build funcionando
- [ ] Migraciones revisadas
- [ ] Seeds para datos iniciales (categorías, admin user)
- [ ] Plan de backup automatizado
- [ ] Monitoreo configurado (logs, errores)

**Tarea Final 6: Git y Versionado**
- [ ] .gitignore completo
- [ ] Commits organizados
- [ ] Tags de versiones (v1.0.0)
- [ ] Branches: main, develop, feature/*
- [ ] README con badges (build, coverage)

---

## 📊 RESUMEN DEL PROYECTO COMPLETO

### Módulos Implementados
1. ✅ **Autenticación y Usuarios** - JWT, roles, permisos
2. ✅ **CMS** - Páginas dinámicas, editor, gestor medios
3. ✅ **E-commerce** - Productos, categorías, inventario, filtros
4. ✅ **Carrito y Órdenes** - Checkout, emails, gestión órdenes
5. ✅ **Cisco y Dashboard** - Integración API, sincronización, reportes

### Tecnologías Utilizadas
**Backend:**
- Node.js 18+ con Express
- PostgreSQL 15+ con Prisma ORM
- JWT para autenticación
- Bcrypt para passwords
- Multer + Sharp para imágenes
- Nodemailer para emails
- Node-cron para jobs
- Jest + Supertest para testing

**Frontend:**
- React 18 con Vite
- React Router DOM
- TailwindCSS
- Ant Design
- Axios con interceptors
- Context API
- React Hook Form
- Recharts para gráficas
- Lucide React para íconos

**Base de Datos:**
- 12 tablas principales
- Relaciones completas
- Índices optimizados
- Triggers automáticos
- Backups programados

### Funcionalidades Principales
- 🔐 Sistema de autenticación completo
- 📄 CMS con editor visual
- 🛍️ E-commerce full stack
- 📦 Gestión de inventario
- 🛒 Carrito de compras
- 📧 Sistema de emails
- 📊 Dashboard con métricas
- 🔄 Integración Cisco API
- ⏰ Sincronización automática
- 📈 Reportes exportables
- ⚙️ Panel de configuración

### Estadísticas del Proyecto
- **Tiempo estimado desarrollo:** 18 semanas (~4.5 meses)
- **Líneas de código estimadas:** ~15,000 (backend + frontend)
- **Endpoints API:** ~60+
- **Componentes React:** ~80+
- **Páginas:** ~25+
- **Tests:** ~100+

---

## 🚀 DEPLOYMENT

### Opción 1: Servidor Propio (VPS)

**Paso 1: Preparar servidor**
- Ubuntu 22.04 LTS
- Instalar Node.js 18+
- Instalar PostgreSQL 15+
- Instalar Nginx
- Instalar PM2
- Configurar firewall (UFW)

**Paso 2: Clonar repositorio**
- Git clone del proyecto
- Instalar dependencias backend y frontend
- Configurar .env de producción

**Paso 3: Base de datos**
- Crear BD en PostgreSQL
- Ejecutar migraciones: `npx prisma migrate deploy`
- Ejecutar seeds si hay

**Paso 4: Build**
- Frontend: `npm run build`
- Mover build a carpeta de Nginx

**Paso 5: Iniciar backend**
- PM2: `pm2 start server.js --name its-systems-api -i max`
- PM2: `pm2 startup` y `pm2 save`

**Paso 6: Configurar Nginx**
- Proxy reverso para API
- Servir frontend estático
- Servir carpeta uploads/
- Configurar SSL con Let's Encrypt

**Paso 7: Dominio y SSL**
- Apuntar DNS al servidor
- Certbot para SSL: `certbot --nginx -d its-systems.mx`

### Opción 2: Cloud (Railway / Render / DigitalOcean)

**Railway (Recomendado para inicio):**
- Conectar repositorio GitHub
- Railway detecta Node.js automáticamente
- Agregar PostgreSQL database addon
- Configurar variables de entorno
- Deploy automático en cada push

**Render:**
- Crear Web Service (backend)
- Crear Static Site (frontend)
- PostgreSQL managed
- Variables de entorno
- Auto-deploy desde Git

**DigitalOcean App Platform:**
- Similar a Railway/Render
- Droplet + Managed PostgreSQL
- Auto-scaling disponible

### Configuración Post-Deploy

**Tarea Deploy 1: Verificar funcionamiento**
- [ ] Backend responde en /health
- [ ] Frontend carga correctamente
- [ ] Login funciona
- [ ] Base de datos accesible
- [ ] Uploads/ funcionando

**Tarea Deploy 2: Monitoreo**
- Configurar logging (Winston o similar)
- Error tracking (Sentry opcional)
- Uptime monitoring (UptimeRobot)
- Performance monitoring

**Tarea Deploy 3: Backups**
- Script de backup automático de BD (diario)
- Backup de uploads/ (semanal)
- Guardar en storage externo (S3, Backblaze)

**Tarea Deploy 4: Seguridad**
- Cambiar todos los secrets
- Configurar rate limiting
- HTTPS forzado
- Headers de seguridad
- Actualizar dependencias

---

## 📞 SOPORTE Y MANTENIMIENTO

### Tareas Post-Launch

**Primera Semana:**
- Monitoreo intensivo 24/7
- Corrección de bugs críticos inmediatos
- Ajustes de performance si es necesario
- Capacitación al equipo admin

**Primer Mes:**
- Recolectar feedback de usuarios
- Ajustes menores de UI/UX
- Optimización de queries lentas
- Ajuste de sincronización Cisco

**Mantenimiento Continuo:**
- Actualización de dependencias mensual
- Backups verificados semanalmente
- Monitoreo de logs y errores
- Actualizaciones de seguridad

### Checklist Semanal
- [ ] Verificar backups
- [ ] Revisar logs de errores
- [ ] Monitorear performance
- [ ] Verificar sincronización Cisco
- [ ] Revisar órdenes pendientes
- [ ] Verificar emails enviados

### Checklist Mensual
- [ ] Actualizar dependencias (npm outdated)
- [ ] Revisar y optimizar BD
- [ ] Análisis de métricas de uso
- [ ] Backup completo a storage externo
- [ ] Revisión de seguridad

---

## 🎓 RECURSOS DE APRENDIZAJE

### Documentación Oficial
- [Prisma](https://www.prisma.io/docs)
- [Express](https://expressjs.com/)
- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)

---

# 📖 APÉNDICES

## APÉNDICE A: MEJORES PRÁCTICAS

### Código
- Usar nombres descriptivos para variables y funciones
- Funciones pequeñas con una sola responsabilidad
- Evitar código duplicado (DRY - Don't Repeat Yourself)
- Comentar solo lo necesario, el código debe ser auto-explicativo
- Usar async/await en lugar de callbacks
- Manejar todos los errores con try/catch
- Validar inputs en backend siempre, no confiar en frontend

### Base de Datos
- Usar transacciones para operaciones múltiples relacionadas
- Crear índices en campos de búsqueda y filtrado
- No guardar información sensible sin encriptar
- Hacer backups regulares automatizados
- Usar migraciones para todos los cambios en schema
- Documentar relaciones entre tablas

### Seguridad
- Nunca commitear .env o secrets al repositorio
- Usar variables de entorno para toda configuración sensible
- Validar y sanitizar todos los inputs del usuario
- Implementar rate limiting en endpoints públicos
- Loggear intentos de acceso sospechosos
- Mantener dependencias actualizadas regularmente
- Usar HTTPS en producción siempre

### Performance
- Paginar todos los listados grandes
- Usar índices en BD para queries frecuentes
- Comprimir respuestas HTTP
- Optimizar imágenes antes de servir
- Implementar lazy loading en frontend
- Usar select específico en queries (no traer campos innecesarios)

### Testing
- Escribir tests para funcionalidad crítica
- Mantener coverage > 70%
- Tests deben ser independientes entre sí
- Usar datos de prueba, nunca datos reales
- Ejecutar tests antes de cada commit importante

---

## APÉNDICE B: TROUBLESHOOTING COMÚN

### Problemas de Conexión a BD
**Error: Can't reach database server**
- Verificar que PostgreSQL esté corriendo
- Verificar DATABASE_URL en .env
- Verificar credenciales y permisos del usuario
- Probar conexión con: `npx prisma studio`

### Problemas con Prisma
**Error: Prisma Client not generated**
- Ejecutar: `npx prisma generate`
- Verificar que @prisma/client esté instalado

**Error en migración**
- Verificar sintaxis en schema.prisma
- Resetear BD de desarrollo: `npx prisma migrate reset`
- Aplicar migraciones: `npx prisma migrate dev`

### Problemas con JWT
**Error: jwt malformed**
- Verificar que token se envíe en header Authorization
- Formato correcto: "Bearer <token>"
- Verificar JWT_SECRET en .env

**Error: jwt expired**
- Token expiró, usuario debe hacer login nuevamente
- Ajustar JWT_EXPIRES_IN si es muy corto

### Problemas con Uploads
**Error: File too large**
- Verificar MAX_FILE_SIZE en .env
- Verificar configuración de multer limits

**Error: Invalid file type**
- Verificar MIME type del archivo
- Verificar fileFilter en config/storage.js

**Uploads no se guardan**
- Verificar que carpeta uploads/ exista
- Verificar permisos de escritura en carpeta

### Problemas de CORS
**Error: CORS policy blocked**
- Verificar CORS_ORIGIN en .env
- Verificar configuración de cors en server.js
- En desarrollo usar: `CORS_ORIGIN=http://localhost:3000`

### Problemas de Performance
**Queries muy lentas**
- Verificar índices en BD
- Usar EXPLAIN en queries problemáticas
- Optimizar con select específico

**Frontend lento**
- Verificar bundle size con herramientas de build
- Implementar lazy loading de componentes
- Optimizar imágenes (tamaño y formato)

### Problemas en Producción
**Error 500 genérico**
- Revisar logs en logs/error-*.log
- Verificar todas las variables de entorno
- Verificar conexión a BD

**Emails no se envían**
- Verificar configuración SMTP en .env
- Verificar credenciales de email
- Revisar logs de nodemailer
- Probar con servicio de testing como Mailtrap

---

**FIN DEL DOCUMENTO**
