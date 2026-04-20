/**
 * Frankenstein Lab - Custom Patterns & Recipes
 * 
 * This file contains ready-to-use patterns and combinations
 * of components for common use cases
 */

import { motion } from 'framer-motion';
import { 
  IncubationCapsule, 
  VoltageButton,
  GlitchText 
} from '../components';
import type { ProjectData } from '../types/frankenstein';

/**
 * Pattern 1: Minimal Portfolio
 * A cleaner version focusing on projects only
 */
export const MinimalPortfolio = ({ projects }: { projects: ProjectData[] }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.h1
          className="text-6xl font-black mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlitchText>MY PROJECTS</GlitchText>
        </motion.h1>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {projects.map((project, index) => (
            <IncubationCapsule
              key={index}
              {...project}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

/**
 * Pattern 2: Timeline Portfolio
 * Projects displayed in a timeline fashion
 */
export const TimelinePortfolio = ({ projects }: { projects: ProjectData[] }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-6xl font-black mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          PROJECT <span className="text-[#39FF14]">TIMELINE</span>
        </motion.h1>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#39FF14] to-transparent" />

          {/* Timeline items */}
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`mb-12 ${index % 2 === 0 ? 'mr-auto pr-8 text-right' : 'ml-auto pl-8'} w-1/2`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#39FF14] rounded-full border-4 border-slate-950" />

              {/* Content */}
              <div className="p-6 rounded-lg border-2 border-slate-700 bg-slate-900/40 backdrop-blur">
                <h3 className="text-xl font-bold text-[#39FF14] mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-3">
                  {project.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Pattern 3: Feature Spotlight
 * Highlight one project with full details
 */
export const FeatureSpotlight = ({ project }: { project: ProjectData }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-20 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          {project.imageUrl && (
            <motion.img
              src={project.imageUrl}
              alt={project.title}
              className="rounded-2xl border-2 border-[#39FF14] w-full h-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-5xl font-black mb-4">
              {project.title}
            </h2>
            <p className="text-xl text-slate-300 mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mb-8">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full border-2 border-[#39FF14] text-[#39FF14] font-mono text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex gap-4">
              <VoltageButton variant="primary" size="lg">
                View Project
              </VoltageButton>
              <VoltageButton variant="secondary" size="lg">
                Learn More
              </VoltageButton>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/**
 * Pattern 4: Gallery Portfolio
 * Image-focused gallery with minimal text
 */
export const GalleryPortfolio = ({ projects }: { projects: ProjectData[] }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-6xl font-black mb-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="text-[#39FF14]">EXPERIMENTAL</span> GALLERY
        </motion.h1>

        {/* Masonry-like grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-max gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`rounded-xl overflow-hidden border-2 border-slate-700 hover:border-[#39FF14] transition-colors group cursor-pointer ${
                index % 3 === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              {/* Image */}
              {project.imageUrl && (
                <div className="relative h-64 md:h-80 overflow-hidden bg-slate-800">
                  <motion.img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-slate-300 text-sm mb-4">
                        {project.description}
                      </p>
                      <div className="flex gap-2">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 rounded bg-[#39FF14]/20 text-[#39FF14]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

/**
 * Pattern 5: Side-by-Side Hero
 * Hero with projects side by side
 */
export const SideBySideHero = ({
  projects,
  heroTitle,
}: {
  projects: ProjectData[];
  heroTitle?: string;
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-4">
      <div className="max-w-7xl mx-auto py-20">
        {/* Hero Section */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-7xl font-black mb-6">
            <GlitchText>{heroTitle || 'CREATIVE WORKS'}</GlitchText>
          </h1>
          <p className="text-xl text-slate-400">
            A curated selection of experimental projects and innovations
          </p>
        </motion.div>

        {/* Projects in pairs */}
        <div className="space-y-20">
          {Array.from(
            { length: Math.ceil(projects.length / 2) },
            (_, i) => projects.slice(i * 2, i * 2 + 2)
          ).map((pair, idx) => (
            <motion.div
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              {pair.map((project, pairIdx) => (
                <IncubationCapsule
                  key={pairIdx}
                  {...project}
                  index={idx * 2 + pairIdx}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Pattern 6: Stats + Projects
 * Display statistics along with projects
 */
export const StatsPortfolio = ({ projects }: { projects: ProjectData[] }) => {
  const stats = [
    { label: 'Projects', value: projects.length.toString() },
    { label: 'Technologies', value: '15+' },
    { label: 'Hours Coded', value: '∞' },
    { label: 'Ideas', value: '∞' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="p-6 rounded-lg border-2 border-slate-700 bg-slate-900/40 text-center hover:border-[#39FF14] transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="text-3xl font-black text-[#39FF14] mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {projects.map((project, index) => (
            <IncubationCapsule
              key={index}
              {...project}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

/**
 * Export all patterns
 */
export const FrankensteinPatterns = {
  MinimalPortfolio,
  TimelinePortfolio,
  FeatureSpotlight,
  GalleryPortfolio,
  SideBySideHero,
  StatsPortfolio,
};

export default FrankensteinPatterns;
