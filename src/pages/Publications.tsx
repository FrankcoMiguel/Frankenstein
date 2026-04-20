import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CgMouse } from 'react-icons/cg';
import { FaCalendar, FaClock } from 'react-icons/fa';
import Layout from '../components/Layout';
import { PublicationsBackgroundIcons } from '../components/BackgroundIcons';
import type { PublicationsCategory } from '../types';
import publicationsData from '../data/publications.json';

const Publications = () => {
  const publications = (publicationsData as PublicationsCategory[])[0].items;

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Layout title="Publications">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center relative overflow-hidden">
        {/* Animated background icons */}
        <PublicationsBackgroundIcons />
        
        <h1 className="text-4xl md:text-6xl font-bold text-slate-100 mb-6 relative z-10">
          Publications
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-12 relative z-10">
          Thoughts, tutorials, and insights from my journey in software engineering.
        </p>
        <div className="flex flex-col items-center text-slate-400 animate-bounce relative z-10">
          <CgMouse size={32} />
          <p className="text-sm mt-2">Scroll down to read more</p>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {publications.map((publication, index) => (
              <article
                key={publication.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-green-500/50 transition-all group"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={publication.image}
                    alt={publication.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <FaCalendar className="text-green-400" />
                      {new Date(publication.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock className="text-green-400" />
                      {publication.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-green-400 transition-colors">
                    {publication.title}
                  </h2>
                  <p className="text-slate-400 mb-4 line-clamp-2">
                    {publication.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {publication.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-slate-700/50 text-slate-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/publications/${publication.id}`}
                    className="inline-flex items-center text-green-400 hover:text-green-300 font-medium transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Publications;
