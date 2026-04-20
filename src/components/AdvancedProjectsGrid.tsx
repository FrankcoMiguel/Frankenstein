import { motion } from 'framer-motion';
import { IncubationCapsule } from './IncubationCapsule';
import type { ProjectData } from '../types/frankenstein';

interface AdvancedProjectsGridProps {
  projects: ProjectData[];
  columns?: number;
  onProjectClick?: (project: ProjectData, index: number) => void;
  showFilters?: boolean;
  filterTags?: string[];
}

export const AdvancedProjectsGrid = ({
  projects,
  columns = 3,
  onProjectClick,
  showFilters = true,
}: AdvancedProjectsGridProps) => {
  
  // Extract all unique tags
  const allTags = Array.from(
    new Set(projects.flatMap(p => p.tags))
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className="w-full">
      {/* Filter Tags */}
      {showFilters && (
        <motion.div
          className="mb-12 flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <button
            className="px-4 py-2 rounded-full border-2 border-slate-600 text-slate-300 hover:border-[#39FF14] hover:text-[#39FF14] transition-colors duration-300 font-mono text-sm"
          >
            ALL
          </button>
          {allTags.map((tag) => (
            <motion.button
              key={tag}
              className="px-4 py-2 rounded-full border-2 border-slate-600 text-slate-300 hover:border-[#39FF14] hover:text-[#39FF14] transition-colors duration-300 font-mono text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Projects Grid */}
      <motion.div
        className={`grid ${gridColsClass[columns as keyof typeof gridColsClass]} gap-6`}
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

      {/* Empty State */}
      {projects.length === 0 && (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-slate-400 text-lg">
            No projects match the selected filter.
          </p>
        </motion.div>
      )}
    </div>
  );
};
