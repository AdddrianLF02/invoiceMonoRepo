## DOCUMENTACIÓN ARQUITECTURA DEL PROYECTO

### Estructura de Directorios

src/
├── domain/           # Entidades, value objects, reglas de negocio
│   ├── entities/
│   ├── value-objects/
│   └── repositories/ # Interfaces de repositorios
│   └── services/ 
│   └── schemas/ # Esquemas de validación
├── application/      # Casos de uso e interfaces de puertos
│   ├── use-cases/
│   ├── dtos/         # DTOs como parte de los puertos de entrada/salida
│   └── ports/        # Interfaces de puertos de entrada/salida
├── infrastructure/   # Implementaciones concretas
│   ├── persistence/  # Implementaciones de repositorios con Prisma
│   ├── external/     # Servicios externos
│   └── config/       # Configuraciones
├── modules/          # Módulos de NestJS
│   ├── application.module.ts
│   └── infrastructure.module.ts
├── auth/             # Módulo de autenticación
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── presenters/   # Presenters para el módulo de autenticación
│       ├── create-user.presenter.ts
│       └── validate-user.presenter.ts
└── interface/        # Adaptadores de interfaz
    ├── api/          # Controladores REST
    ├── adapters/     # Adaptadores para los puertos
    └── middlewares/  # Middlewares de NestJS

### Módulo de Autenticación Implementado

Hemos implementado un sistema de autenticación basado en JWT con los siguientes componentes:

1. **Registro de Usuario:**
   - El controlador `AuthController` recibe la solicitud de registro
   - El caso de uso `CreateUserUseCase` procesa la solicitud
   - El presenter `CreateUserPresenter` formatea la respuesta

2. **Login de Usuario:**
   - El controlador `AuthController` recibe la solicitud de login
   - El caso de uso `ValidateUserUseCase` valida las credenciales
   - El presenter `ValidateUserPresenter` genera el token JWT y formatea la respuesta

### Patrón de Inyección de Dependencias

Para resolver los problemas de dependencias circulares, hemos implementado:

1. **Presenters específicos:**
   - Creamos presenters dedicados para cada caso de uso
   - Los presenters implementan los puertos de salida (Output Ports)
   - Cada presenter tiene acceso al objeto Response para enviar la respuesta HTTP

2. **Configuración de providers en módulos:**
   - Utilizamos `useClass` para registrar los providers
   - Separamos claramente las responsabilidades entre controladores y presenters

### Próximos Pasos

1. Implementar el frontend con React 19 y Next.js 15
2. Conectar el frontend con el backend mediante Server Actions
3. Implementar la gestión de facturas en el frontend
4. Añadir funcionalidades adicionales (reportes, exportación, etc.)