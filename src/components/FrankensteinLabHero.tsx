import { motion } from 'framer-motion';
import { ElectricParticles } from './ElectricParticles';
import { GlitchText } from './GlitchText';
import { IncubationCapsule } from './IncubationCapsule';
import { VoltageButton } from './VoltageButton';
import { Zap, Beaker, Code, Globe, Mail } from 'lucide-react';

interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
}

interface FrankensteinLabProps {
  projects?: ProjectData[];
  onProjectClick?: (project: ProjectData, index: number) => void;
}

const defaultProjects: ProjectData[] = [
  {
    title: 'Quantum Encoder',
    description: 'Advanced encryption system with neural network architecture. Transforms sensitive data through quantum-inspired algorithms.',
    tags: ['Cryptography', 'ML', 'Python'],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop',
  },
  {
    title: 'Neural Interface',
    description: 'Brain-computer interface prototype. Real-time signal processing with 99.8% accuracy in command recognition.',
    tags: ['AI', 'Neural Networks', 'Hardware'],
    imageUrl: 'https://images.unsplash.com/photo-1677442d019cecf8978b4f184e550e2a069e4aa2?w=500&h=300&fit=crop',
  },
  {
    title: 'Time Paradox Lab',
    description: 'Temporal simulation engine. Experimental framework for parallel timeline hypothesis testing.',
    tags: ['Physics', 'Simulation', 'Web3'],
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324ef6e9?w=500&h=300&fit=crop',
  },
  {
    title: 'Bio-Synthesis Core',
    description: 'Genetic sequence optimizer using advanced algorithms. Capable of processing millions of gene combinations per second.',
    tags: ['Biotech', 'Big Data', 'ML'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop',
  },
  {
    title: 'Dark Matter Tracker',
    description: 'Visualization system for invisible matter distribution. Uses gravitational anomaly mapping and predictive modeling.',
    tags: ['Astronomy', '3D', 'Data Viz'],
    imageUrl: 'https://images.unsplash.com/photo-1462331940975-9c418f4f0767?w=500&h=300&fit=crop',
  },
  {
    title: 'Consciousness Prime',
    description: 'Sentience simulation framework. Explores consciousness emergence patterns in distributed systems.',
    tags: ['Philosophy', 'AI', 'Distributed'],
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324ef6e9?w=500&h=300&fit=crop',
  },
];

export const FrankensteinLabHero = ({
  projects = defaultProjects,
  onProjectClick,
}: FrankensteinLabProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(57,255,20,0.1),rgba(57,255,20,0))]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#39FF14] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-800 opacity-10 rounded-full blur-3xl" />
      </div>

      {/* Electric Particles */}
      <ElectricParticles />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 pt-32">
        <motion.div
          className="max-w-6xl mx-auto text-center z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated lines above title */}
          <motion.div
            className="mb-8 flex justify-center gap-4"
            variants={itemVariants}
          >
            <motion.div
              className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#39FF14]"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <Beaker className="w-6 h-6 text-[#39FF14]" />
            <motion.div
              className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#39FF14]"
              animate={{ x: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
            variants={itemVariants}
          >
            <GlitchText intensity={0.25}>FRANKENSTEIN</GlitchText>
            <div className="text-5xl md:text-7xl mt-2">
              <span className="text-[#39FF14]">LAB</span>
            </div>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Welcome to the digital laboratory where innovation meets obsession. 
            Here lie the experiments of a mad scientist engineer.
            <span className="block text-[#39FF14] font-mono text-sm mt-4">
              [ STATUS: OPERATIONAL ]
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
            variants={itemVariants}
          >
            <VoltageButton variant="primary" size="lg">
              <Zap className="w-5 h-5" />
              Activate Experiments
            </VoltageButton>
            <VoltageButton variant="secondary" size="lg">
              <Code className="w-5 h-5" />
              View Source Code
            </VoltageButton>
          </motion.div>

          {/* Scrolling indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm text-slate-400 font-mono">SCROLL TO EXPLORE</span>
            <div className="w-6 h-10 border-2 border-[#39FF14] rounded-full flex items-center justify-center">
              <motion.div
                className="w-1 h-2 bg-[#39FF14] rounded-full"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">
              <span className="text-[#39FF14]">CRYOGENIC</span> INCUBATION TANKS
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Active experiments dormant in suspended animation. Hover to activate and witness their full potential.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <IncubationCapsule
                key={index}
                {...project}
                index={index}
                onClick={() => onProjectClick?.(project, index)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { label: 'Experiments', value: '42' },
              { label: 'Successful', value: '89%' },
              { label: 'Years Active', value: '5+' },
              { label: 'Innovations', value: '∞' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl border border-slate-700 bg-slate-900/40 backdrop-blur hover:border-[#39FF14] transition-colors duration-300"
                variants={itemVariants}
              >
                <div className="text-3xl md:text-4xl font-black text-[#39FF14] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 font-mono">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <section className="relative py-20 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-slate-400 mb-8">Connect with the mad scientist</p>
            <div className="flex justify-center gap-6 mb-8">
              {[
                { icon: Code, label: 'GitHub' },
                { icon: Globe, label: 'LinkedIn' },
                { icon: Mail, label: 'Email' },
              ].map(({ icon: Icon, label }) => (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full border-2 border-slate-600 text-slate-400 hover:border-[#39FF14] hover:text-[#39FF14] transition-colors duration-300"
                  aria-label={label}
                >
                  <Icon className="w-6 h-6" />
                </motion.button>
              ))}
            </div>
            <p className="text-xs text-slate-500 font-mono">
              © 2024 FRANKENSTEIN LAB | POWERED BY INNOVATION & CAFFEINE
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
