import { useEffect, useState } from 'react';

interface GlitchTextProps {
  children: string;
  className?: string;
  intensity?: number;
}

export const GlitchText = ({ 
  children, 
  className = '',
  intensity = 0.3 
}: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const triggerGlitch = () => {
      if (Math.random() < intensity) {
        setIsGlitching(true);
        const duration = Math.random() * 200 + 100;
        setTimeout(() => setIsGlitching(false), duration);
      }
    };

    const interval = setInterval(triggerGlitch, Math.random() * 3000 + 2000);
    return () => clearInterval(interval);
  }, [intensity]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>

      {isGlitching && (
        <>
          <span
            className="absolute left-0 top-0 z-20 text-transparent"
            style={{
              color: 'rgb(57, 255, 20)',
              textShadow: '2px 0 0 rgba(57, 255, 20, 0.7)',
              clipPath: `polygon(${Math.random() * 100}% 0, 100% 0, 100% ${Math.random() * 100}%, 0 ${Math.random() * 100}%)`,
              animation: 'glitch-anim 0.2s infinite',
            }}
          >
            {children}
          </span>
          <span
            className="absolute left-0 top-0 z-20 text-transparent"
            style={{
              color: 'rgb(255, 0, 150)',
              textShadow: '-2px 0 0 rgba(255, 0, 150, 0.7)',
              clipPath: `polygon(0 ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}%, 100% 0, 100% 100%)`,
              animation: 'glitch-anim 0.2s infinite reverse',
            }}
          >
            {children}
          </span>
        </>
      )}

      <style>{`
        @keyframes glitch-anim {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </span>
  );
};
