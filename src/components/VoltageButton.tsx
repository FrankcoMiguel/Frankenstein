import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface VoltageButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const VoltageButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}: VoltageButtonProps) => {
  const baseStyles = `
    relative font-mono font-bold uppercase tracking-wider 
    transition-all duration-300 cursor-pointer overflow-hidden
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  const variantStyles = {
    primary: `
      border-2 border-[#39FF14] bg-[#39FF14]/10 text-[#39FF14]
      hover:bg-[#39FF14]/20 hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]
    `,
    secondary: `
      border-2 border-slate-600 bg-slate-900/50 text-slate-300
      hover:border-[#39FF14] hover:text-[#39FF14] hover:bg-[#39FF14]/5
    `,
    ghost: `
      border-2 border-transparent text-slate-300
      hover:border-[#39FF14] hover:text-[#39FF14]
    `,
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Voltage spark effect on hover */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
      >
        <motion.div
          className="absolute -top-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#39FF14] to-transparent"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      </motion.span>

      {/* Main content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-sm bg-[#39FF14] opacity-0 -z-10"
        initial={{ opacity: 0 }}
        whileHover={!disabled ? { opacity: 0.05 } : {}}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};
