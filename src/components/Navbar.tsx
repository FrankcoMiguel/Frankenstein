import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaGithub, FaStackOverflow, FaInstagram, FaLinkedin } from 'react-icons/fa';
import type { NavItem } from '../types';
import navItems from '../data/navbar.json';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const items = navItems as NavItem[];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const getCurrentPage = () => {
    const path = location.pathname;
    const item = items.find(i => i.url === path);
    return item?.id || 1;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-slate-800 ${isMenuOpen ? 'bg-slate-900' : 'bg-slate-900/95 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
              Frank's Lab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {items.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                className={`text-sm font-medium transition-colors hover:text-indigo-400 ${
                  getCurrentPage() === item.id
                    ? 'text-indigo-400'
                    : 'text-slate-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Social Links */}
            <div className="flex items-center space-x-4 pl-4 border-l border-slate-700">
              <a
                href="https://github.com/FrankcoMiguel"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://stackoverflow.com/users/15623280/franco-js"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
                aria-label="Stack Overflow"
              >
                <FaStackOverflow size={20} />
              </a>
              <a
                href="https://www.instagram.com/franco.js/"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/frankmiguel/"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-slate-300 hover:text-white p-2 z-50 relative"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-full max-w-sm bg-slate-900 z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button inside mobile menu */}
        <div className="flex justify-end p-4">
          <button
            onClick={closeMenu}
            className="text-slate-300 hover:text-white p-2"
            aria-label="Close menu"
          >
            <FaTimes size={24} />
          </button>
        </div>
        
        <div className="flex flex-col items-center pt-16 h-auto space-y-8 px-6">
          {items.map((item) => (
            <Link
              key={item.id}
              to={item.url}
              onClick={closeMenu}
              className={`text-2xl font-medium transition-colors hover:text-indigo-400 ${
                getCurrentPage() === item.id
                  ? 'text-indigo-400'
                  : 'text-slate-300'
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          <div className="flex items-center space-x-6 pt-8 border-t border-slate-700 w-full justify-center">
            <a
              href="https://github.com/FrankcoMiguel"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-indigo-400 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={28} />
            </a>
            <a
              href="https://stackoverflow.com/users/15623280/franco-js"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-indigo-400 transition-colors"
              aria-label="Stack Overflow"
            >
              <FaStackOverflow size={28} />
            </a>
            <a
              href="https://www.instagram.com/franco.js/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-indigo-400 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/frankmiguel/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-indigo-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={28} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
