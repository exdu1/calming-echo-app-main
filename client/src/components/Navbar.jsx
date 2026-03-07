import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">Calming Echo</Link>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;