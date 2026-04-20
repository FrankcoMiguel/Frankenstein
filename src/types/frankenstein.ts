/* Frankenstein Lab Component Types */

export interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  slug?: string;
  color?: 'green' | 'purple' | 'blue' | 'red';
}

export interface IncubationCapsuleProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  index?: number;
  color?: string;
  onClick?: () => void;
}

export interface VoltageButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ComponentType<{ className?: string }>;
}

export interface GlitchTextProps {
  children: string;
  className?: string;
  intensity?: number;
}

export interface ElectricParticlesProps {
  color?: string;
  speed?: number;
  density?: number;
}

export interface FrankensteinLabProps {
  projects?: ProjectData[];
  onProjectClick?: (project: ProjectData, index: number) => void;
  title?: string;
  subtitle?: string;
  showFooter?: boolean;
  showStats?: boolean;
}

export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'circIn' | 'circOut' | 'circInOut';
}

export interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  glow?: string;
}

// Default color themes
export const colorThemes = {
  neon: {
    primary: '#39ff14',
    secondary: '#00ffff',
    accent: '#ff006e',
    background: '#050505',
    text: '#ffffff',
    glow: '#39ff14',
  },
  cyber: {
    primary: '#00ff00',
    secondary: '#ffff00',
    accent: '#ff0080',
    background: '#0a0a0a',
    text: '#00ff00',
    glow: '#00ff00',
  },
  synthwave: {
    primary: '#ff006e',
    secondary: '#00d9ff',
    accent: '#ffbe0b',
    background: '#0a0015',
    text: '#ffffff',
    glow: '#ff006e',
  },
};

export type ColorThemeName = keyof typeof colorThemes;
