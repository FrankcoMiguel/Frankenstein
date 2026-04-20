# Frankenstein's Lab - Creative Portfolio Landing Page

Una landing page ultra-creativa construida con React, Tailwind CSS, Framer Motion y Lucide React. Diseñada con una estética "Dark Industrial" con toques de "Mad Scientist".

## 🎨 Características

### Visual Design
- **Paleta de colores**: Negro carbón, grises metálicos y verde neón eléctrico (#39FF14)
- **Efectos visuales**: Glassmorphism oscuro, bordes estilo circuitos eléctricos
- **Partículas dinámicas**: Chispas eléctricas y niebla animada en el fondo
- **Animaciones fluidas**: Transiciones y microinteracciones con Framer Motion

### Componentes Incluidos

#### 1. **ElectricParticles** - Fondo Animado
- Canvas basado en partículas que simulan chispas eléctricas
- Efecto de gravedad y desvanecimiento gradual
- Completamente responsivo

```tsx
import { ElectricParticles } from './components/ElectricParticles';

<ElectricParticles />
```

#### 2. **GlitchText** - Efecto Glitch en Texto
- Efecto de glitch ocasional en el texto
- Personalizable con intensidad
- Perfecto para títulos de impacto

```tsx
import { GlitchText } from './components/GlitchText';

<GlitchText intensity={0.3}>
  FRANKENSTEIN
</GlitchText>
```

#### 3. **IncubationCapsule** - Tarjetas de Proyectos
Presentan proyectos como "Cápsulas de Incubación" o "Tanques de Criogenia"

**Estados**:
- **Inactivo**: Estilo monocromático minimalista
- **Activado** (hover): Verde neón, animación de burbujas, indicador pulsante

**Características**:
- Imagen del proyecto con efecto zoom
- Tags personalizados
- Indicador de estado (INACTIVE/ACTIVATED)
- Animación secuencial de entrada

```tsx
import { IncubationCapsule } from './components/IncubationCapsule';

<IncubationCapsule
  title="Quantum Encoder"
  description="Advanced encryption system..."
  tags={['Cryptography', 'ML', 'Python']}
  imageUrl="https://..."
  index={0}
  onClick={() => console.log('Activated!')}
/>
```

#### 4. **VoltageButton** - Botones de Alto Voltaje
Botones que parecen interruptores de alto voltaje

**Variantes**:
- `primary`: Verde neón con glow
- `secondary`: Gris con hover neón
- `ghost`: Transparente con hover neón

**Tamaños**: `sm`, `md`, `lg`

```tsx
import { VoltageButton } from './components/VoltageButton';

<VoltageButton variant="primary" size="lg">
  <Zap className="w-5 h-5" />
  Activate Experiments
</VoltageButton>
```

#### 5. **FrankensteinLabHero** - Componente Principal Completo
Integra todos los componentes en una landing page completa con:
- Hero section con título y animaciones
- Sección de proyectos (grid responsivo)
- Estadísticas animadas
- Footer con enlaces sociales
- Scroll suave y indicadores visuales

```tsx
import { FrankensteinLabHero } from './components/FrankensteinLabHero';

const projects = [
  {
    title: 'Mi Proyecto',
    description: 'Descripción del proyecto...',
    tags: ['Tech1', 'Tech2'],
    imageUrl: 'https://...'
  }
];

<FrankensteinLabHero 
  projects={projects}
  onProjectClick={(project, index) => {
    console.log(`Proyecto ${index} activado`);
  }}
/>
```

## 🚀 Instalación Rápida

### 1. Instalar dependencias
```bash
npm install framer-motion lucide-react
```

### 2. Importar el componente
```tsx
import { FrankensteinLabHero } from './components/FrankensteinLabHero';

function App() {
  return <FrankensteinLabHero />;
}
```

### 3. Personalizar estilos
Los estilos están en `src/index.css`. Puedes modificar:
- Variables CSS en `:root`
- Paleta de colores (cambiar `--neon-green`)
- Duraciones de animaciones
- Tamaños y espaciado

## 🎯 Personalizaciones Comunes

### Cambiar el color neón
```css
:root {
  --neon-green: #ff006e; /* Rosa neón */
}
```

### Ajustar velocidad de animaciones
```css
@keyframes neon-glow {
  /* Cambiar 2s a 1s para más rápido */
  duration: 1s ease-in-out infinite;
}
```

### Modificar proyectos
```tsx
const customProjects = [
  {
    title: 'Mi Proyecto',
    description: 'Descripción detallada...',
    tags: ['React', 'TypeScript', 'Web3'],
    imageUrl: '/images/proyecto.jpg',
  },
  // ... más proyectos
];

<FrankensteinLabHero projects={customProjects} />
```

## 📱 Responsividad

El componente es completamente responsive (Mobile-First):
- **Mobile**: 1 columna
- **Tablet**: 2 columnas  
- **Desktop**: 3 columnas

Las animaciones se adaptan según `prefers-reduced-motion`.

## ⚡ Optimizaciones de Rendimiento

1. **Canvas rendering**: Las partículas usan Canvas HTML5 para máximo rendimiento
2. **Lazy loading**: Las imágenes de proyectos se cargan bajo demanda
3. **Viewport detection**: Las animaciones se activan solo cuando son visibles
4. **GPU acceleration**: Las animaciones de Framer Motion usan transform y opacity
5. **Motion preferences**: Respeta `prefers-reduced-motion` del usuario

## 🎬 Animaciones Disponibles

### Efectos principales
- **Staggered fade-in**: Entrada secuencial de elementos
- **Glitch effect**: Distorsión visual en texto
- **Neon glow**: Brillo eléctrico en elementos
- **Bubble animation**: Burbujas flotantes en proyectos
- **Circuit borders**: Bordes que parecen circuitos eléctricos
- **Pulse effect**: Pulsación de indicadores

### Microinteracciones
- Hover effects en botones
- Transiciones suaves en colores
- Spark effects en interacciones
- Floating elements
- Scroll animations

## 🛠️ Ejemplos Avanzados

### Integración con enrutador
```tsx
import { useNavigate } from 'react-router-dom';
import { FrankensteinLabHero } from './components/FrankensteinLabHero';

function PortfolioPage() {
  const navigate = useNavigate();
  
  return (
    <FrankensteinLabHero
      onProjectClick={(project, index) => {
        navigate(`/projects/${index}`);
      }}
    />
  );
}
```

### Datos dinámicos desde API
```tsx
import { useEffect, useState } from 'react';
import { FrankensteinLabHero } from './components/FrankensteinLabHero';

function DynamicPortfolio() {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);
  
  return <FrankensteinLabHero projects={projects} />;
}
```

### Tema personalizado
```tsx
// Crear una variante del componente
export function CustomLab() {
  const myProjects = [
    {
      title: 'Proyecto A',
      description: '...',
      tags: ['React'],
      imageUrl: '/img/a.jpg'
    }
  ];
  
  return (
    <div style={{ '--neon-green': '#00ff88' } as React.CSSProperties}>
      <FrankensteinLabHero projects={myProjects} />
    </div>
  );
}
```

## 🔧 Configuración Tailwind

Asegúrate de que tu `tailwind.config.js` incluya:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'neon-green': '#39ff14',
      }
    }
  }
}
```

## 📚 Dependencias

- **React 19+**: Framework principal
- **Framer Motion 11+**: Animaciones avanzadas
- **Lucide React**: Iconos modernos
- **Tailwind CSS 4+**: Estilos utilitarios

## 🎓 Mejores Prácticas

1. **Optimización de imágenes**: Usa imágenes comprimidas y responsivas
2. **Lazy loading**: Implementa lazy loading para imágenes de proyectos
3. **Accessibility**: Los componentes mantienen accesibilidad con estados focus
4. **Performance**: Las animaciones usan GPU acceleration
5. **Mobile-first**: Diseño responsive desde lo más pequeño

## 📄 Licencia

MIT - Libre para uso personal y comercial

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing`)
5. Abre un Pull Request

## 📞 Soporte

Para preguntas o problemas, abre una issue en el repositorio.

---

**Made with ⚡ and ❤️ by a mad scientist engineer**
