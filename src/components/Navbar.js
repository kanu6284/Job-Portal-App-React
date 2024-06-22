import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from 'react-icons/fa6';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase.config'; // Make sure this path is correct
import Logout from './Logout';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    return () => unsubscribe();
  }, []);

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    const newTheme = !isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary Estimate" },
    { path: "/post-job", title: "Post A Job" },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex items-center justify-between py-4">
        <a href="/" className="flex items-center gap-2 text-2xl text-black dark:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 29 30" fill="none">
            <circle cx="12.5" cy="15" r="12.0143" fill="#3575E2" fillOpacity="0.4" />
            <circle cx="16.5" cy="15" r="17.4857" fill="#3575E2" fillOpacity="0.4" />
          </svg>
          <span>JobPortal</span>
        </a>
        {/* nav items for large devices */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary dark:text-white">
              <NavLink to={path} className={({ isActive }) => (isActive ? 'active' : '')}>
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* sign up and login/logout button */}
        <div className="text-primary font-medium space-x-5 hidden lg:flex items-center">
          <button 
            onClick={handleThemeToggle} 
            className="py-2 px-5 border rounded"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="py-2 px-5 border rounded">Login</Link>
              <Link to="/signup" className="py-2 px-5 border rounded bg-blue text-white">Sign-up</Link>
            </>
          ) : (
            <Logout />
          )}
        </div>

        {/* mobile menu */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? <FaXmark className="w-5 h-5 text-primary" /> : <FaBarsStaggered className="w-5 h-5 text-primary" />}
          </button>
        </div>
      </nav>
      {/* mobile menu items */}
      {isMenuOpen && (
        <div className="px-4 bg-black py-5 rounded-sm md:hidden">
          <ul className="flex flex-col gap-4">
            {navItems.map(({ path, title }) => (
              <li key={path} className="text-base text-white py-1">
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? 'active text-blue-500' : 'text-white')}
                  onClick={handleMenuToggler} // Close the menu when an item is clicked
                >
                  {title}
                </NavLink>
              </li>
            ))}
            <li className="text-white font-medium">
              <button 
                onClick={handleThemeToggle} 
                className="py-2 px-5 border rounded block"
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
            {!isLoggedIn ? (
              <>
                <li className="text-white font-medium">
                  <Link to="/login" className="py-2 px-5 border rounded block">Login</Link>
                </li>
                <li className="text-white font-medium">
                  <Link to="/signup" className="py-2 px-5 border rounded bg-blue text-white block">Sign-up</Link>
                </li>
              </>
            ) : (
              <li className="text-white font-medium">
                <Logout />
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
