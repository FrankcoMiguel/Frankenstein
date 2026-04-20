import { FaFlask, FaCode, FaDatabase, FaCloud, FaTerminal, FaCogs, FaLightbulb, FaBook, FaPen, FaFileAlt } from 'react-icons/fa';
import { BiAtom } from 'react-icons/bi';

// Animated Flask with bubbles
export const BoilingFlask = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <div className="relative">
      <FaFlask className="text-green-500/20 animate-flask-wobble" />
      {/* Bubbles */}
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2">
        <span className="absolute w-1.5 h-1.5 bg-green-400/40 rounded-full animate-bubble-1"></span>
        <span className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-bubble-2 left-1"></span>
        <span className="absolute w-2 h-2 bg-green-400/20 rounded-full animate-bubble-3 -left-1"></span>
      </div>
    </div>
  </div>
);

// Spinning Atom
export const SpinningAtom = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <BiAtom className="text-green-500/20 animate-spin-slow" />
  </div>
);

// Orbiting Code brackets
export const FloatingCode = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <FaCode className="text-green-500/20 animate-code-float" />
  </div>
);

// Pulsing Database with data flow
export const PulsingDatabase = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <div className="relative">
      <FaDatabase className="text-indigo-500/20 animate-db-pulse" />
      {/* Data particles */}
      <span className="absolute top-0 left-1/2 w-0.5 h-0.5 bg-teal-400/50 rounded-full animate-data-flow-1"></span>
      <span className="absolute top-0 left-1/3 w-0.5 h-0.5 bg-teal-400/40 rounded-full animate-data-flow-2"></span>
      <span className="absolute top-0 right-1/3 w-0.5 h-0.5 bg-teal-400/30 rounded-full animate-data-flow-3"></span>
    </div>
  </div>
);

// Floating Cloud with drift
export const DriftingCloud = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <FaCloud className="text-green-500/20 animate-cloud-drift" />
  </div>
);

// Blinking Terminal
export const BlinkingTerminal = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <div className="relative">
      <FaTerminal className="text-green-500/20 animate-terminal-glow" />
      {/* Cursor blink */}
      <span className="absolute bottom-1/4 right-1/4 w-0.5 h-2 bg-green-400/50 animate-cursor-blink"></span>
    </div>
  </div>
);

// Spinning Cogs/Gears
export const SpinningCogs = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <FaCogs className="text-green-500/20 animate-spin-slow" style={{ animationDuration: '12s' }} />
  </div>
);

// Pulsing Lightbulb (for ideas)
export const PulsingLightbulb = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <div className="relative">
      <FaLightbulb className="text-yellow-500/20 animate-lightbulb-glow" />
      {/* Light rays */}
      <span className="absolute -top-1 left-1/2 w-0.5 h-2 bg-yellow-400/20 rounded-full animate-ray-pulse"></span>
      <span className="absolute top-0 -right-1 w-2 h-0.5 bg-yellow-400/20 rounded-full animate-ray-pulse" style={{ animationDelay: '0.2s' }}></span>
      <span className="absolute top-0 -left-1 w-2 h-0.5 bg-yellow-400/20 rounded-full animate-ray-pulse" style={{ animationDelay: '0.4s' }}></span>
    </div>
  </div>
);

// Floating Book (for publications)
export const FloatingBook = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <FaBook className="text-green-500/20 animate-book-float" />
  </div>
);

// Writing Pen
export const WritingPen = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <FaPen className="text-indigo-500/20 animate-pen-write" />
  </div>
);

// Floating Document
export const FloatingDocument = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <FaFileAlt className="text-indigo-500/20 animate-document-float" />
  </div>
);

// Pre-configured layouts for different pages
export const ExperimentsBackgroundIcons = () => (
  <>
    <BoilingFlask className="top-20 left-[5%] text-4xl md:text-6xl" />
    <FloatingCode className="top-32 right-[10%] text-3xl md:text-5xl" />
    <SpinningCogs className="bottom-40 left-[8%] text-3xl md:text-5xl" />
    <SpinningAtom className="bottom-24 right-[5%] text-4xl md:text-6xl" />
    <DriftingCloud className="top-1/4 left-[20%] text-2xl md:text-4xl" />
    <PulsingDatabase className="top-1/3 right-[15%] text-2xl md:text-4xl" />
  </>
);

export const ExperimentDetailBackgroundIcons = () => (
  <>
    <FloatingCode className="top-32 left-[3%] text-3xl md:text-5xl" />
    <SpinningAtom className="top-48 right-[5%] text-4xl md:text-6xl" />
    <PulsingDatabase className="bottom-1/3 left-[5%] text-2xl md:text-4xl" />
    <BlinkingTerminal className="bottom-1/4 right-[8%] text-3xl md:text-4xl" />
  </>
);

export const PublicationsBackgroundIcons = () => (
  <>
    <FloatingBook className="top-20 left-[5%] text-4xl md:text-6xl" />
    <WritingPen className="top-32 right-[10%] text-3xl md:text-5xl" />
    <PulsingLightbulb className="bottom-40 left-[8%] text-3xl md:text-5xl" />
    <FloatingDocument className="bottom-24 right-[5%] text-4xl md:text-6xl" />
    <DriftingCloud className="top-1/4 left-[20%] text-2xl md:text-4xl" />
    <FloatingCode className="top-1/3 right-[15%] text-2xl md:text-4xl" />
  </>
);

export const PublicationDetailBackgroundIcons = () => (
  <>
    <FloatingBook className="top-32 left-[3%] text-3xl md:text-5xl" />
    <WritingPen className="top-48 right-[5%] text-3xl md:text-4xl" />
    <PulsingLightbulb className="bottom-1/3 left-[5%] text-2xl md:text-4xl" />
    <FloatingDocument className="bottom-1/4 right-[8%] text-3xl md:text-4xl" />
  </>
);
