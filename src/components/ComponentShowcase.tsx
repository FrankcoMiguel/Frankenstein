import { motion } from 'framer-motion';
import { GlitchText } from './GlitchText';
import { VoltageButton } from './VoltageButton';
import { IncubationCapsule } from './IncubationCapsule';
import { Code, Zap, Layers, Sparkles } from 'lucide-react';

export const ComponentShowcase = () => {
  const showcaseItems = [
    {
      title: 'GlitchText Component',
      description: 'Dynamic glitch effect on text with configurable intensity',
      icon: Code,
    },
    {
      title: 'VoltageButton Component',
      description: 'Interactive buttons with electrical spark animations',
      icon: Zap,
    },
    {
      title: 'IncubationCapsule Component',
      description: 'Project cards with bubble animations and neon glow effects',
      icon: Sparkles,
    },
    {
      title: 'ElectricParticles Component',
      description: 'Canvas-based particle system for dynamic backgrounds',
      icon: Layers,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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
    <div className="w-full py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">
            <span className="text-[#39FF14]">COMPONENT</span> SHOWCASE
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Explore the powerful components that make Frankenstein's Lab come alive
          </p>
        </motion.div>

        {/* Showcase Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {showcaseItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div className="p-8 rounded-2xl border-2 border-slate-700 bg-slate-900/40 backdrop-blur hover:border-[#39FF14] hover:bg-slate-900/60 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/30">
                      <Icon className="w-6 h-6 text-[#39FF14]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Code Examples */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center">
            Quick Start Examples
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GlitchText Example */}
            <motion.div
              className="p-6 rounded-xl border border-slate-700 bg-slate-900/50"
              whileHover={{ borderColor: '#39FF14' }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="font-mono text-sm text-[#39FF14] mb-4">
                &lt;GlitchText /&gt;
              </h4>
              <div className="mb-6 p-4 bg-slate-800/50 rounded">
                <GlitchText intensity={0.4} className="text-2xl font-bold">
                  GLITCH EFFECT
                </GlitchText>
              </div>
              <pre className="text-xs text-slate-300 overflow-x-auto">
{`import { GlitchText } from './components';

<GlitchText intensity={0.3}>
  Your Text Here
</GlitchText>`}
              </pre>
            </motion.div>

            {/* VoltageButton Example */}
            <motion.div
              className="p-6 rounded-xl border border-slate-700 bg-slate-900/50"
              whileHover={{ borderColor: '#39FF14' }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="font-mono text-sm text-[#39FF14] mb-4">
                &lt;VoltageButton /&gt;
              </h4>
              <div className="mb-6 p-4 bg-slate-800/50 rounded flex flex-wrap gap-3">
                <VoltageButton variant="primary" size="sm">
                  Primary
                </VoltageButton>
                <VoltageButton variant="secondary" size="sm">
                  Secondary
                </VoltageButton>
                <VoltageButton variant="ghost" size="sm">
                  Ghost
                </VoltageButton>
              </div>
              <pre className="text-xs text-slate-300 overflow-x-auto">
{`import { VoltageButton } from './components';

<VoltageButton variant="primary">
  Click Me
</VoltageButton>`}
              </pre>
            </motion.div>

            {/* IncubationCapsule Example */}
            <motion.div
              className="p-6 rounded-xl border border-slate-700 bg-slate-900/50 lg:col-span-2"
              whileHover={{ borderColor: '#39FF14' }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="font-mono text-sm text-[#39FF14] mb-4">
                &lt;IncubationCapsule /&gt;
              </h4>
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <IncubationCapsule
                  title="Sample Project"
                  description="This is a project capsule with animations"
                  tags={['React', 'Animation']}
                  index={0}
                />
              </div>
              <pre className="text-xs text-slate-300 overflow-x-auto">
{`import { IncubationCapsule } from './components';

<IncubationCapsule
  title="My Project"
  description="Project description..."
  tags={['React', 'Framer Motion']}
  imageUrl="/image.jpg"
/>`}
              </pre>
            </motion.div>
          </div>
        </motion.div>

        {/* Features List */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { title: 'Fully Responsive', desc: 'Mobile-first design' },
            { title: 'GPU Accelerated', desc: 'Smooth animations' },
            { title: 'Accessible', desc: 'WCAG compliant' },
            { title: 'Customizable', desc: 'Easy to theme' },
            { title: 'TypeScript', desc: 'Full type safety' },
            { title: 'No Dependencies', desc: 'Minimal bundle size' },
            { title: 'Dark Theme', desc: 'Professional aesthetic' },
            { title: 'Documented', desc: 'Clear examples' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="p-4 rounded-lg border border-slate-700 bg-slate-900/30 text-center hover:border-[#39FF14] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <h4 className="font-bold text-white mb-1">{feature.title}</h4>
              <p className="text-xs text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
