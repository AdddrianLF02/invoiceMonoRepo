/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Preset de ts-jest para ESM
  preset: 'ts-jest/presets/default-esm',
  // Configuración moderna de ts-jest
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
      // Asegúrate que apunte al tsconfig correcto (relativo a ESTE archivo)
      tsconfig: 'tsconfig.json',
    }],
  },
  // Entorno Node
  testEnvironment: 'node',
  // Raíz del paquete 'core'
  rootDir: '.',

  // Mapeo de alias MUY simple (ajusta si es necesario)
  // Solo mapea el alias principal si lo usas internamente.
  // Quitamos los mapeos '.js' que causaron el error 'Could not locate module'.
  moduleNameMapper: {
    '^@repo/core/(.*)$': '<rootDir>/src/$1',
  },

  // Ignorar 'dist' y 'node_modules' al BUSCAR tests
  testPathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
  ],

  // NO ignorar 'uuid' para la TRANSFORMACIÓN
  transformIgnorePatterns: [
    // La clave es no ignorar uuid
    '/node_modules/(?!uuid)/',
  ],

  // Dónde encontrar los tests (solo en src)
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.test.ts',
  ],

  // Extensiones (incluir mjs)
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'mjs', 'json', 'node'],

  clearMocks: true,
};