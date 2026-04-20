import { FrankensteinLabHero } from '../components/FrankensteinLabHero';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { motion } from 'framer-motion';
import { Code, ExternalLink } from 'lucide-react';
import { VoltageButton } from '../components/VoltageButton';

/**
 * Complete Frankenstein Lab Demo Page
 * 
 * This page showcases:
 * - FrankensteinLabHero: Complete landing page with hero, projects, stats, and footer
 * - ComponentShowcase: Individual component demonstrations
 * - Integration examples
 */

const FrankensteinLabDemo = () => {
  const handleProjectClick = (project: any) => {
    console.log(`🔬 Experiment Activated:`, project.title);
    // Add your navigation or modal logic here
  };

  const customProjects = [
    {
      title: 'Quantum Encryption Engine',
      description: 'Advanced encryption system using quantum-inspired algorithms. Transforms sensitive data through neural network architecture for maximum security.',
      tags: ['Cryptography', 'ML', 'Python', 'Quantum'],
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop',
    },
    {
      title: 'Neural Network Interface',
      description: 'Brain-computer interface prototype with real-time signal processing. Achieves 99.8% accuracy in command recognition and interpretation.',
      tags: ['AI', 'Neural Networks', 'Hardware', 'Biotech'],
      imageUrl: 'https://images.unsplash.com/photo-1677442d019cecf8978b4f184e550e2a069e4aa2?w=500&h=300&fit=crop',
    },
    {
      title: 'Temporal Simulation Lab',
      description: 'Experimental framework for parallel timeline hypothesis testing. Simulates temporal branches and probability outcomes with precision.',
      tags: ['Physics', 'Simulation', 'Web3', 'Research'],
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324ef6e9?w=500&h=300&fit=crop',
    },
    {
      title: 'Genetic Sequence Optimizer',
      description: 'Bio-synthesis core capable of processing millions of gene combinations per second using advanced optimization algorithms.',
      tags: ['Biotech', 'Big Data', 'ML', 'Biology'],
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop',
    },
    {
      title: 'Dark Matter Visualization',
      description: 'Visualization system for invisible matter distribution. Uses gravitational anomaly mapping and predictive modeling for cosmic insights.',
      tags: ['Astronomy', '3D Visualization', 'Data Analysis', 'Physics'],
      imageUrl: 'https://images.unsplash.com/photo-1462331940975-9c418f4f0767?w=500&h=300&fit=crop',
    },
    {
      title: 'Consciousness Emulation',
      description: 'Sentience simulation framework exploring consciousness emergence patterns in distributed systems and neural architectures.',
      tags: ['Philosophy', 'AI', 'Distributed Systems', 'Research'],
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324ef6e9?w=500&h=300&fit=crop',
    },
  ];

  return (
    <div className="w-full bg-slate-950 text-white">
      {/* Main Hero Section */}
      <FrankensteinLabHero
        projects={customProjects}
        onProjectClick={handleProjectClick}
      />

      {/* Component Showcase Section */}
      <section className="relative py-20 px-4 border-t border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900">
        <ComponentShowcase />
      </section>

      {/* Integration Guide */}
      <section className="relative py-32 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">
              INTEGRATION GUIDE
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Everything you need to implement Frankenstein's Lab in your own projects
            </p>
          </motion.div>

          {/* Integration Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                step: '01',
                title: 'Install Dependencies',
                code: 'npm install framer-motion lucide-react',
                description: 'Add the required animation and icon libraries to your project',
              },
              {
                step: '02',
                title: 'Import Components',
                code: 'import { FrankensteinLabHero } from \'./components\'',
                description: 'Import the main component or individual components as needed',
              },
              {
                step: '03',
                title: 'Customize & Deploy',
                code: '<FrankensteinLabHero projects={data} />',
                description: 'Add your data and customize colors, animations, and layout',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-8 rounded-xl border-2 border-slate-700 bg-slate-900/40 backdrop-blur hover:border-[#39FF14] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="text-4xl font-black text-[#39FF14] mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <code className="block bg-slate-800/50 p-4 rounded text-xs text-[#39FF14] mb-4 overflow-x-auto">
                  {item.code}
                </code>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Code Block Example */}
          <motion.div
            className="mb-20 p-8 rounded-xl border-2 border-slate-700 bg-slate-900/40 backdrop-blur overflow-x-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-bold mb-4 text-[#39FF14]">Complete Example</h3>
            <pre className="text-sm text-slate-300 font-mono">
{`import { FrankensteinLabHero } from './components/FrankensteinLabHero';

const MyPortfolio = () => {
  const projects = [
    {
      title: 'My Project',
      description: 'Amazing project description...',
      tags: ['React', 'TypeScript'],
      imageUrl: '/image.jpg'
    },
    // ... more projects
  ];

  const handleProjectClick = (project, index) => {
    console.log('Project activated:', project.title);
    // Navigate or open modal
  };

  return (
    <FrankensteinLabHero
      projects={projects}
      onProjectClick={handleProjectClick}
    />
  );
};

export default MyPortfolio;`}
            </pre>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Fully Responsive', value: '✓' },
              { label: 'Dark Theme', value: '✓' },
              { label: 'Animations', value: '✓' },
              { label: 'TypeScript', value: '✓' },
              { label: 'Accessible', value: '✓' },
              { label: 'GPU Optimized', value: '✓' },
              { label: 'Customizable', value: '✓' },
              { label: 'Production Ready', value: '✓' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-4 rounded-lg border border-slate-700 bg-slate-900/30 text-center hover:border-[#39FF14] transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-bold text-[#39FF14] mb-2">
                  {item.value}
                </div>
                <div className="text-sm text-slate-400">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources & Links */}
      <section className="relative py-20 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black mb-12 tracking-tighter">
              EXPLORE & CONTRIBUTE
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 justify-center flex-wrap">
              <VoltageButton variant="primary" size="lg">
                <Code className="w-5 h-5" />
                View Source Code
              </VoltageButton>
              <VoltageButton variant="secondary" size="lg">
                <ExternalLink className="w-5 h-5" />
                Full Documentation
              </VoltageButton>
            </div>

            <p className="text-slate-400 mt-12 text-sm">
              Made with ⚡ and ❤️ by a mad scientist engineer
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FrankensteinLabDemo;
