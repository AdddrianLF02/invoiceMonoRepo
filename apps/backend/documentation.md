## DOCUMENTACIÓN ARQUITECTURA INCIAL DE PROYECTO

src/
├── domain/           # Entidades, value objects, reglas de negocio
│   ├── entities/
│   ├── value-objects/
│   └── repositories/ # Interfaces de repositorios
├── application/      # Casos de uso e interfaces de puertos
│   ├── use-cases/
│   ├── dtos/         # DTOs como parte de los puertos de entrada/salida
│   └── ports/        # Interfaces de puertos de entrada/salida
├── infrastructure/   # Implementaciones concretas
│   ├── persistence/  # Implementaciones de repositorios con Drizzle
│   ├── external/     # Servicios externos
│   └── config/       # Configuraciones
└── interface/        # Adaptadores de interfaz
    ├── api/          # Controladores REST
    ├── adapters/     # Adaptadores para los puertos
    └── middlewares/  # Middlewares de NestJS