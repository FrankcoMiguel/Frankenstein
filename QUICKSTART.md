# Frankenstein's Lab - Quick Start Guide

¡Bienvenido al Laboratorio de Frankenstein! Esta es una guía rápida para comenzar con los componentes ultra-creativos.

## ⚡ 30 Segundos Setup

### 1. Instala dependencias
```bash
npm install framer-motion lucide-react
```

### 2. Importa y usa
```tsx
import { FrankensteinLabHero } from './components';

export default function App() {
  return <FrankensteinLabHero />;
}
```

**¡Listo!** Ya tienes una landing page ultra-creativa.

---

## 📦 Componentes Disponibles

### 1. **FrankensteinLabHero** - Landing Page Completa
La solución todo-en-uno con hero, proyectos, estadísticas y footer.

```tsx
<FrankensteinLabHero
  projects={[
    {
      title: 'Mi Proyecto',
      description: 'Descripción...',
      tags: ['React', 'Motion'],
      imageUrl: '/image.jpg'
    }
  ]}
  onProjectClick={(project, index) => {
    console.log('¡Proyecto activado!');
  }}
/>
```

### 2. **IncubationCapsule** - Tarjetas de Proyectos
Presenta proyectos como "Cápsulas de Incubación" con animaciones.

```tsx
<IncubationCapsule
  title="Mi Proyecto"
  description="Descripción del proyecto..."
  tags={['React', 'TypeScript']}
  imageUrl="/image.jpg"
  index={0}
/>
```

### 3. **VoltageButton** - Botones Eléctricos
Botones con efectos de alto voltaje y chispas.

```tsx
<VoltageButton variant="primary" size="lg">
  <Zap /> Activar
</VoltageButton>
```

**Variantes:** `primary` | `secondary` | `ghost`  
**Tamaños:** `sm` | `md` | `lg`

### 4. **GlitchText** - Efecto Glitch
Efecto de glitch ocasional en texto.

```tsx
<GlitchText intensity={0.3}>
  FRANKENSTEIN LAB
</GlitchText>
```

### 5. **ElectricParticles** - Fondo Animado
Partículas eléctricas dinámicas en el fondo.

```tsx
<ElectricParticles />
```

### 6. **AdvancedProjectsGrid** - Grid Avanzado
Rejilla de proyectos con filtros y animaciones.

```tsx
<AdvancedProjectsGrid
  projects={projects}
  columns={3}
  showFilters={true}
/>
```

### 7. **ComponentShowcase** - Demo de Componentes
Muestra todos los componentes en acción.

```tsx
<ComponentShowcase />
```

---

## 🎨 Personalización de Colores

Cambia los colores editando `src/index.css`:

```css
:root {
  --neon-green: #39ff14;  /* Cambia a tu color neón preferido */
}
```

O usa el **ThemeProvider**:

```tsx
import { FrankensteinThemeProvider, useFrankensteinTheme } from './components';

<FrankensteinThemeProvider initialTheme="cyber">
  <App />
</FrankensteinThemeProvider>
```

**Temas disponibles:** `neon` | `cyber` | `synthwave`

---

## 📱 Responsividad

Los componentes son totalmente responsivos:
- **Mobile:** Optimizado para pantallas pequeñas
- **Tablet:** Layout de 2 columnas
- **Desktop:** Layout de 3 columnas completo

---

## 🚀 Ejemplos Prácticos

### Integración con React Router
```tsx
import { useNavigate } from 'react-router-dom';

function Portfolio() {
  const navigate = useNavigate();
  
  return (
    <FrankensteinLabHero
      onProjectClick={(project, idx) => {
        navigate(`/projects/${idx}`);
      }}
    />
  );
}
```

### Datos desde API
```tsx
import { useEffect, useState } from 'react';

function DynamicPortfolio() {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(setProjects);
  }, []);
  
  return <FrankensteinLabHero projects={projects} />;
}
```

### Con TypeScript
```tsx
import { FrankensteinLabHero } from './components';
import type { ProjectData } from './types/frankenstein';

const projects: ProjectData[] = [
  {
    title: 'Mi Proyecto',
    description: 'Descripción...',
    tags: ['React'],
    imageUrl: '/image.jpg'
  }
];

export default function App() {
  return <FrankensteinLabHero projects={projects} />;
}
```

---

## ⚙️ Optimizaciones Incluidas

✅ **Canvas Rendering** - Partículas en Canvas HTML5  
✅ **GPU Acceleration** - Animaciones con transform y opacity  
✅ **Lazy Loading** - Carga bajo demanda de imágenes  
✅ **Motion Preferences** - Respeta `prefers-reduced-motion`  
✅ **Mobile Optimized** - Rendimiento en dispositivos móviles  

---

## 🎬 Animaciones Clave

| Efecto | Ubicación | Descripción |
|--------|-----------|-------------|
| **Fade-in** | Entrada de elementos | Desvanecimiento progresivo |
| **Glitch** | Título principal | Distorsión visual ocasional |
| **Neon Glow** | Proyectos hover | Brillo eléctrico |
| **Burbujas** | Proyectos hover | Burbujas flotantes |
| **Spark** | Botones | Chispas al interactuar |
| **Pulse** | Indicadores | Pulsación de energía |

---

## 🛠️ Utilidades Disponibles

En `src/utils/frankenstein.ts` encontrarás:

```tsx
import { FrankensteinUtils } from './utils/frankenstein';

// Animaciones preestablecidas
FrankensteinUtils.animations.slideInUp

// Utilidades de color
FrankensteinUtils.colors.lighten('#39ff14', 20)

// Funciones de rendimiento
FrankensteinUtils.performance.debounce(fn, 300)

// Y mucho más...
```

---

## 📚 Recursos Adicionales

- **Documentación Completa**: Ver `FRANKENSTEIN_LAB_README.md`
- **Código de Ejemplo**: Disponible en `/src/pages/FrankensteinLabDemo.tsx`
- **Tipos TypeScript**: Definidos en `/src/types/frankenstein.ts`

---

## 🐛 Resolución de Problemas

### Las animaciones se ven lentas
- Verifica que no haya muchas animaciones simultáneas
- Usa `prefers-reduced-motion` para debugging
- Asegúrate que `framer-motion` está actualizado

### Los colores no se aplican
- Revisa que CSS custom properties estén definidas
- Limpia el cache del navegador
- Verifica el orden de imports en `index.css`

### Problemas de responsividad
- Verifica que Tailwind CSS esté configurado correctamente
- Usa DevTools para revisar breakpoints
- Comprueba que no hay estilos en línea que causen conflictos

---

## 📞 Soporte

¿Problemas? Revisa:
1. La documentación completa
2. Los ejemplos en `/src/pages/`
3. Las pruebas de los componentes

---

## 🎉 ¡Listo para Crear!

Ya tienes todo lo que necesitas para crear una landing page ultra-creativa. 

**Próximos pasos:**
1. Reemplaza los proyectos de ejemplo con los tuyos
2. Personaliza los colores y animaciones
3. Integra con tu router y APIs
4. ¡Despliega y disfruta!

---

**Made with ⚡ and creativity**
