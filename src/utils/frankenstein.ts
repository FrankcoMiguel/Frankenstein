/**
 * Frankenstein Lab - Utility Functions & Helpers
 */

/**
 * Animation Presets
 */
export const animationPresets = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 },
  },

  // Slide animations
  slideInUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },

  slideInDown: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },

  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  },

  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  },

  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6 },
  },

  // Rotate animations
  rotateIn: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
    transition: { duration: 0.6 },
  },

  // Stagger animations
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },

  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  },
};

/**
 * Color utilities
 */
export const colorUtils = {
  /**
   * Generate a glowing shadow based on color
   */
  getGlowShadow: (color: string, intensity: number = 1) => {
    return `0 0 ${20 * intensity}px ${color}`;
  },

  /**
   * Convert hex to RGB
   */
  hexToRgb: (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  },

  /**
   * Convert RGB to hex
   */
  rgbToHex: (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  },

  /**
   * Lighten color by percentage
   */
  lighten: (color: string, amount: number) => {
    const rgb = colorUtils.hexToRgb(color);
    if (!rgb) return color;
    return colorUtils.rgbToHex(
      Math.min(255, Math.round(rgb.r + rgb.r * (amount / 100))),
      Math.min(255, Math.round(rgb.g + rgb.g * (amount / 100))),
      Math.min(255, Math.round(rgb.b + rgb.b * (amount / 100)))
    );
  },

  /**
   * Darken color by percentage
   */
  darken: (color: string, amount: number) => {
    const rgb = colorUtils.hexToRgb(color);
    if (!rgb) return color;
    return colorUtils.rgbToHex(
      Math.max(0, Math.round(rgb.r - rgb.r * (amount / 100))),
      Math.max(0, Math.round(rgb.g - rgb.g * (amount / 100))),
      Math.max(0, Math.round(rgb.b - rgb.b * (amount / 100)))
    );
  },
};

/**
 * Easing functions for animations
 */
export const easings = {
  linear: [0, 0, 1, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  easeInQuad: [0.55, 0.085, 0.68, 0.53],
  easeInCubic: [0.55, 0.055, 0.675, 0.19],
  easeOutQuad: [0.25, 0.46, 0.45, 0.94],
  easeOutCubic: [0.215, 0.61, 0.355, 1],
  easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
  easeInOutCubic: [0.645, 0.045, 0.355, 1],
};

/**
 * Delay utilities
 */
export const delayUtils = {
  /**
   * Generate staggered delays for a list
   */
  generateStaggeredDelays: (count: number, baseDelay: number = 0.05) => {
    return Array.from({ length: count }, (_, i) => i * baseDelay);
  },

  /**
   * Get delay for specific index
   */
  getDelayForIndex: (index: number, baseDelay: number = 0.05) => {
    return index * baseDelay;
  },
};

/**
 * Responsive utilities
 */
export const responsiveUtils = {
  /**
   * Get grid columns based on screen size
   */
  getGridCols: (isMobile: boolean, isTablet: boolean) => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  },

  /**
   * Get font size based on screen size
   */
  getFontSize: (baseSize: number, isMobile: boolean) => {
    return isMobile ? Math.floor(baseSize * 0.85) : baseSize;
  },

  /**
   * Get padding based on screen size
   */
  getPadding: (basePadding: number, isMobile: boolean) => {
    return isMobile ? Math.floor(basePadding * 0.75) : basePadding;
  },
};

/**
 * Performance utilities
 */
export const performanceUtils = {
  /**
   * Debounce function
   */
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  /**
   * Throttle function
   */
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  /**
   * Request animation frame wrapper
   */
  requestFrame: (callback: () => void, count: number = 1) => {
    if (count === 0) {
      callback();
      return;
    }
    requestAnimationFrame(() => performanceUtils.requestFrame(callback, count - 1));
  },
};

/**
 * Validation utilities
 */
export const validationUtils = {
  /**
   * Check if value is a valid hex color
   */
  isValidHexColor: (color: string) => {
    return /^#[0-9A-F]{6}$/i.test(color);
  },

  /**
   * Check if value is a valid RGB color
   */
  isValidRgbColor: (color: string) => {
    return /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(color);
  },

  /**
   * Check if element is in viewport
   */
  isInViewport: (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
};

/**
 * DOM utilities
 */
export const domUtils = {
  /**
   * Add class with animation
   */
  addClassWithAnimation: (element: HTMLElement, className: string, duration: number = 300) => {
    element.classList.add(className);
    setTimeout(() => {
      element.classList.remove(className);
    }, duration);
  },

  /**
   * Get computed style value
   */
  getComputedStyleValue: (element: HTMLElement, property: string) => {
    return window.getComputedStyle(element).getPropertyValue(property);
  },

  /**
   * Smoothly scroll to element
   */
  smoothScrollTo: (element: HTMLElement, duration: number = 1000) => {
    const target = element.offsetTop;
    const start = window.scrollY;
    const distance = target - start;
    const startTime = Date.now();

    const scroll = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollY = start + distance * progress;

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  },
};

/**
 * Export all utilities as namespace
 */
export const FrankensteinUtils = {
  animations: animationPresets,
  colors: colorUtils,
  easing: easings,
  delays: delayUtils,
  responsive: responsiveUtils,
  performance: performanceUtils,
  validation: validationUtils,
  dom: domUtils,
};

export default FrankensteinUtils;
