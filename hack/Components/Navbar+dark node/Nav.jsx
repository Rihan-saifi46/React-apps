import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react"; // optional icons (install below)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // load theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // handle dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          MySite
        </h1>

        {/* Menu for desktop */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Home</a>
          <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">About</a>
          <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">Contact</a>
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-3">
          <button onClick={toggleDarkMode} className="text-gray-800 dark:text-gray-200">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-800 dark:text-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 space-y-2">
          <a href="#" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">Home</a>
          <a href="#" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">About</a>
          <a href="#" className="block text-gray-700 dark:text-gray-300 hover:text-blue-500">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
