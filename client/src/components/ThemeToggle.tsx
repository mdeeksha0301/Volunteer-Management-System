import React, { useEffect, useState } from 'react';
import { FaMoon } from 'react-icons/fa';
import { BsSunFill } from 'react-icons/bs';

const ThemeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Initialize dark mode based on the value stored in localStorage, if available
    const savedMode = localStorage.getItem('theme');
    return savedMode === 'dark';
  });

  useEffect(() => {
    // Update HTML root element class based on dark mode state
    document.documentElement.classList.toggle('dark', darkMode);
    // Save current theme to localStorage
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div
      className="relative w-16 h-8 flex items-center bg-primary dark:bg-fourth cursor-pointer rounded-full p-1"
      onClick={() => setDarkMode((prevMode) => !prevMode)}
    >
      <FaMoon className="text-white" size={18} />
      <div
        className="absolute bg-white dark:bg-black w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
        style={{ left: darkMode ? '2px' : 'auto', right: darkMode ? 'auto' : '2px' }}
      ></div>
      <BsSunFill className="ml-auto text-yellow-400" size={18} />
    </div>
  );
};

export default ThemeToggle;
