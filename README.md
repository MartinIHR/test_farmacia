# test_farmacia

Frontend demo de ecommerce tipo farmacia (React + Vite + Tailwind v4).

Características principales
- Productos con stock por comuna
- Subida de recetas y cola de revisión (mock)
- Selector de ubicación (comuna) y visualización de stock por sucursal
- Opciones de entrega (pickup / envío) y UI de suscripción (auto-refill)
- Carrito con persistencia en localStorage y notificaciones (react-hot-toast)

Stack
- React 19 (Vite)
- Tailwind CSS v4
- react-router-dom
- react-hot-toast

Instalación

1. Clona el repo:

```powershell
git clone https://github.com/MartinIHR/test_farmacia.git
cd test_farmacia
```

2. Instala dependencias:

```powershell
npm install
```

3. Arranca el servidor de desarrollo:

```powershell
npm run dev
```

Abrir http://localhost:5173/

Notas de desarrollo
- Las recetas se guardan en localStorage y pasan por una cola de revisión simulada (uploaded → in_review → approved) para demo.
- Para permitir comprar productos que requieren receta necesitas subir una receta y (por ahora manualmente o por la simulación) esperar a que pase a `approved`.

Próximos pasos sugeridos
- Asociar recetas a productos desde la UI de subida (marcar productos cubiertos por la receta).
- Validar en checkout que los productos con receta tienen una receta aprobada asociada.
- Añadir tests (Vitest) y CI (GitHub Actions).
- Mejorar accesibilidad y legal (T&C, políticas).

Contribuir
- Abre un issue o un PR con cambios. Mantén pequeñas ramas por feature.

Licencia
- (Agregar la licencia que prefieras)
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
