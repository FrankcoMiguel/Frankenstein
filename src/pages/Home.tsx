import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaFlask, FaCode, FaDatabase, FaCloud, FaRocket } from 'react-icons/fa';
import Layout from '../components/Layout';
import Skill from '../components/Skill';
import { 
  BoilingFlask, 
  SpinningAtom, 
  FloatingCode, 
  PulsingDatabase, 
  DriftingCloud, 
  BlinkingTerminal 
} from '../components/BackgroundIcons';
import type { SkillsCategory } from '../types';
import landingData from '../data/landing.json';

const Home = () => {
  const skills = (landingData as SkillsCategory[])[0].items;

  useEffect(() => {
    AOS.init({ duration: 900 });
  }, []);

  return (
    <Layout title="Home">
      {/* Hero Section - The Lab */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Animated background icons */}
        <BoilingFlask className="top-20 left-10 text-4xl md:text-6xl" />
        <FloatingCode className="top-40 right-20 text-3xl md:text-5xl" />
        <PulsingDatabase className="bottom-32 left-20 text-3xl md:text-5xl" />
        <SpinningAtom className="bottom-20 right-10 text-4xl md:text-6xl" />
        <DriftingCloud className="top-1/3 left-1/4 text-2xl md:text-4xl" />
        <BlinkingTerminal className="bottom-1/3 right-1/4 text-2xl md:text-4xl" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 data-aos="zoom-in" className="text-5xl md:text-7xl font-bold text-slate-100 mb-6">
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
              Frankenstein
            </span>
          </h1>
          
          <p data-aos="fade-up" data-aos-delay="200" className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Welcome to my digital laboratory — will be documenting my experiments, 
            projects, and discoveries in the world of software engineering.
          </p>
          
          <div data-aos="fade-up" data-aos-delay="400" className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
              <FaFlask className="text-green-400" />
              <span className="text-slate-300">Experiments</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
              <FaCode className="text-emerald-400" />
              <span className="text-slate-300">Full Stack</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
              <FaDatabase className="text-teal-400" />
              <span className="text-slate-300">Data</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
              <FaCloud className="text-cyan-400" />
              <span className="text-slate-300">Cloud</span>
            </div>
          </div>
          
          <p data-aos="fade-up" data-aos-delay="600" className="text-slate-500 text-sm">
            Engineered by <span className="text-green-400 font-semibold">Frank Orozco</span> • Senior Software Engineer
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-100 mb-4">
            Lab Equipment
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            The tools and technologies I use to build, experiment, and create.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <Skill
                key={skill.id}
                title={skill.name}
                icons={skill.icons}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experiment Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">
                Currently Building
              </h2>
              <p className="text-slate-400">
                What's cooking in the lab right now.
              </p>
            </div>
            <Link
              to="/experiments"
              className="hidden md:inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-medium transition-colors"
            >
              View all experiments →
            </Link>
          </div>
          
          <div
            data-aos="fade-up"
            className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl overflow-hidden border border-slate-700 hover:border-green-500/50 transition-all group relative"
          >
            {/* Status Badge */}
            <div className="absolute top-6 right-6 z-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full border border-green-500/30 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                In Development
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="/backpackpro-project.svg"
                    alt="BackPack Pro logo"
                    className="w-16 h-16 rounded-2xl"
                  />
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
                      BackPack Pro
                    </h3>
                    <p className="text-green-400 font-medium">Mobile App Remake</p>
                  </div>
                </div>
                
                <p className="text-xl text-slate-300 mb-4 font-medium">
                  Your school bag, but in your phone.
                </p>
                
                <p className="text-slate-400 mb-6 text-lg leading-relaxed">
                  The original BackPack Pro was an Android app built to help students manage homework and track college progress. Now, it's being rebuilt from the ground up with React Native, Expo, and modern cloud services — bringing it to both iOS and Android with a fresh, intuitive design.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 text-sm bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                    React Native
                  </span>
                  <span className="px-3 py-1 text-sm bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                    Expo
                  </span>
                  <span className="px-3 py-1 text-sm bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                    TypeScript
                  </span>
                  <span className="px-3 py-1 text-sm bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                    Cross-Platform
                  </span>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/experiments/backpack-pro"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
                  >
                    <FaRocket />
                    View Experiment
                  </Link>
                </div>
              </div>
              
              <div className="aspect-video lg:aspect-auto lg:h-full overflow-hidden order-1 lg:order-2 bg-gradient-to-br from-green-900/50 to-teal-900/50 flex items-center justify-center p-12">
                <div className="relative">
                  {/* Phone mockup */}
                  <div className="w-48 md:w-64 h-96 md:h-[480px] bg-slate-900 rounded-[3rem] border-4 border-slate-700 shadow-2xl overflow-hidden relative">
                    {/* Dynamic Island */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-10"></div>
                    {/* Screen content */}
                    <div className="w-full h-full bg-gradient-to-b from-green-600 to-teal-700 p-4 pt-8">
                      <div className="text-center text-white mb-6">
                        <p className="text-xs opacity-70">Welcome back</p>
                        <p className="font-bold">Student</p>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-white/20 backdrop-blur rounded-xl p-3">
                          <p className="text-white text-xs font-medium">📚 Math Assignment</p>
                          <p className="text-white/70 text-xs">Due Tomorrow</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur rounded-xl p-3">
                          <p className="text-white text-xs font-medium">📝 Physics Quiz</p>
                          <p className="text-white/70 text-xs">Due in 3 days</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur rounded-xl p-3">
                          <p className="text-white text-xs font-medium">📖 History Essay</p>
                          <p className="text-white/70 text-xs">Due next week</p>
                        </div>
                      </div>
                      <div className="absolute bottom-8 left-4 right-4">
                        <div className="bg-white/10 backdrop-blur rounded-full py-2 px-4 flex items-center justify-center gap-2">
                          <span className="text-white text-xs">+ Add Assignment</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-indigo-500/30 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/30 rounded-full blur-xl"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link
              to="/experiments"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              View all experiments →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
