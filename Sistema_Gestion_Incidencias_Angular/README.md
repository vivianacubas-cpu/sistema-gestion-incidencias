# Sistema de Gestión de Incidencias

Aplicación web CRUD desarrollada con Angular 20 y TypeScript. El proyecto cumple el alcance del reto: listar, registrar, visualizar, actualizar, eliminar y buscar/filtrar incidencias.

## Requisitos
- Node.js 20.19+ o 22+
- npm 10+

## Instalación y ejecución
```bash
npm install
npm start
```
La aplicación se abrirá en `http://localhost:4200`.

## Funcionalidades
- Registrar incidencias con código, título, descripción, prioridad, estado, responsable y fecha.
- Listar incidencias en una tabla.
- Ver todos los detalles de una incidencia.
- Editar incidencias existentes.
- Eliminar con confirmación previa.
- Buscar por título o código y filtrar por prioridad y estado.
- Persistencia local mediante `localStorage` (sin backend).

## Estructura
```text
src/
├── app/
│   ├── core/models/incidencia.model.ts
│   ├── core/services/incidencia.service.ts
│   ├── features/incidencias/incidencias.component.ts
│   ├── features/incidencias/incidencias.component.html
│   ├── features/incidencias/incidencias.component.css
│   ├── app.component.ts
│   └── app.config.ts
├── index.html
├── main.ts
└── styles.css
```

## Nota
Los datos se guardan en el navegador del usuario. Al borrar los datos del sitio o cambiar de navegador, el almacenamiento local no se comparte con otros equipos.
