import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface IncubationCapsuleProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  index?: number;
  onClick?: () => void;
}

export const IncubationCapsule = ({
  title,
  description,
  tags,
  imageUrl,
  index = 0,
  onClick,
}: IncubationCapsuleProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const generateBubbles = () => {
    const newBubbles = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setBubbles(newBubbles);
  };

  const handleHoverStart = () => {
    setIsHovered(true);
    generateBubbles();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div
        onMouseEnter={handleHoverStart}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-500 ${
          isHovered
            ? 'border-[#39FF14] bg-slate-900/80 shadow-[0_0_30px_rgba(57,255,20,0.3)]'
            : 'border-slate-700 bg-slate-950/60 hover:border-slate-600'
        } backdrop-blur-sm p-6 min-h-[420px] flex flex-col justify-between`}
        style={{
          boxShadow: isHovered
            ? '0 0 20px rgba(57, 255, 20, 0.3), inset 0 0 20px rgba(57, 255, 20, 0.05)'
            : 'inset 0 0 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Circuit Border Pattern */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern
                id="circuit-pattern"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0,10 L10,10 M10,0 L10,20 M10,10 L20,10"
                  stroke="rgba(57, 255, 20, 0.1)"
                  strokeWidth="0.5"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
          </svg>
        </div>

        {/* Bubbles Animation */}
        {isHovered &&
          bubbles.map((bubble) => (
            <motion.div
              key={bubble.id}
              className="absolute rounded-full border border-[#39FF14]"
              style={{
                left: `${bubble.x}%`,
                bottom: '-10%',
                width: Math.random() * 20 + 10,
                height: Math.random() * 20 + 10,
                opacity: 0.6,
              }}
              animate={{
                y: [-300, 0],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                ease: 'easeOut',
                delay: bubble.id * 0.1,
              }}
            />
          ))}

        {/* Pulsing Energy Indicator */}
        {isHovered && (
          <motion.div
            className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#39FF14]"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}

        {/* Image Section */}
        {imageUrl && (
          <div className="relative h-48 mb-4 rounded-xl overflow-hidden bg-slate-800">
            <motion.img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              whileHover={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-50" />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 flex-grow">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3
              className={`text-xl font-bold transition-colors duration-300 ${
                isHovered ? 'text-[#39FF14]' : 'text-slate-100'
              }`}
            >
              {title}
            </h3>
            {isHovered && <Zap className="text-[#39FF14] w-5 h-5 flex-shrink-0" />}
          </div>

          <p className="text-slate-400 text-sm mb-4 line-clamp-3">{description}</p>
        </div>

        {/* Tags */}
        <div className="relative z-10 flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`text-xs px-2 py-1 rounded-full border transition-all duration-300 ${
                isHovered
                  ? 'border-[#39FF14] bg-[#39FF14]/10 text-[#39FF14]'
                  : 'border-slate-600 bg-slate-800/50 text-slate-400'
              }`}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Activation Status */}
        <div className="relative z-10 flex items-center gap-2 pt-4 border-t border-slate-700">
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              isHovered ? 'bg-[#39FF14] shadow-[0_0_8px_#39FF14]' : 'bg-slate-600'
            }`}
          />
          <span
            className={`text-xs font-mono transition-colors duration-300 ${
              isHovered ? 'text-[#39FF14]' : 'text-slate-500'
            }`}
          >
            {isHovered ? 'ACTIVATED' : 'INACTIVE'}
          </span>
        </div>

        {/* Circuit connections - top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Circuit connections - bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
};
