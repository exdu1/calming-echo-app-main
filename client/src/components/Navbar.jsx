/* /client/src/components/Navbar.jsx */

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const observer = new ResizeObserver(([entry]) => {
      const height = entry.borderBoxSize?.[0]?.blockSize
        ?? entry.target.offsetHeight;
      document.documentElement.style.setProperty(
        '--ce-height-navbar',
        `${height}px`
      );
    });

    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="brand">Calming Echo</Link>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;