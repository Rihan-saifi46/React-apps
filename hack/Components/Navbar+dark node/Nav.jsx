import { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={isDark ? 'bg-gray-900 min-h-screen' : 'bg-white min-h-screen'}>
      <nav className={isDark ? 'bg-gray-800 shadow-lg' : 'bg-white shadow-lg'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                MyBrand
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition`}>
                Home
              </a>
              <a href="#about" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition`}>
                About
              </a>
              <a href="#services" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition`}>
                Services
              </a>
              <a href="#contact" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition`}>
                Contact
              </a>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${isDark ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-700'} hover:scale-110 transition`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Dark Mode Toggle Mobile */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${isDark ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-700'}`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button
                onClick={toggleMenu}
                className={`p-2 rounded-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`md:hidden ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#home"
                className={`block px-3 py-2 rounded-md ${isDark ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-200'} transition`}
              >
                Home
              </a>
              <a
                href="#about"
                className={`block px-3 py-2 rounded-md ${isDark ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-200'} transition`}
              >
                About
              </a>
              <a
                href="#services"
                className={`block px-3 py-2 rounded-md ${isDark ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-200'} transition`}
              >
                Services
              </a>
              <a
                href="#contact"
                className={`block px-3 py-2 rounded-md ${isDark ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-200'} transition`}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Demo Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Welcome to My Website
        </h1>
        <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          This is a responsive navbar with dark mode toggle. Try resizing your browser window to see the mobile menu, 
          and click the sun/moon icon to toggle between light and dark modes!
        </p>
      </div>
    </div>
  );
}