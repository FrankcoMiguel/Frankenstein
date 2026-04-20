import { FaHeart, FaReact } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-slate-400 text-sm">Frankenstein 1.0</p>
          <div className="flex items-center space-x-2 text-slate-400 text-sm">
            <span>Made with</span>
            <FaHeart className="text-red-500" />
            <span>using React</span>
            <Tippy content="React" placement="right">
              <a
                href="https://react.dev"
                target="_blank"
                rel="noreferrer"
                className="inline-flex hover:text-indigo-400 transition-colors"
                aria-label="React"
              >
                <FaReact className="text-cyan-400 text-lg" />
              </a>
            </Tippy>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
