// src/components/Navbar.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    const handleAuth = () => setLoggedIn(isLoggedIn());
    // window.addEventListener('storage', handleStorage);
    window.addEventListener('authChange', handleAuth);
    // return () => window.removeEventListener('storage', handleStorage);
    return () => window.removeEventListener('authChange', handleAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0F0F0F] border-b border-[#E88C3A]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="group flex items-baseline select-none"
          >
            <span className="font-serif text-white text-2xl sm:text-3xl leading-none">
              EventSphere
            </span>
            <span className="ml-3 text-[#AAAAAA] text-xs sm:text-sm font-mono">
              / events for real people
            </span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            {!loggedIn ? (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-3 py-2 text-white hover:text-[#E88C3A] font-mono border border-transparent rounded-none focus:outline-none focus:ring-2 focus:ring-[#E88C3A] focus:ring-offset-2 focus:ring-offset-[#0F0F0F] transition-colors duration-200"
                >
                  login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-3 py-2 bg-[#E88C3A] hover:bg-[#F09A4D] text-black font-mono border border-[#2A2A2A] rounded-none focus:outline-none focus:ring-2 focus:ring-[#E88C3A] focus:ring-offset-2 focus:ring-offset-[#0F0F0F] transition-colors duration-200"
                >
                  register →
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/my-tickets')}
                  className="px-3 py-2 bg-[#E88C3A] hover:bg-[#F09A4D] text-black font-mono border border-[#2A2A2A] rounded-none focus:outline-none focus:ring-2 focus:ring-[#E88C3A] focus:ring-offset-2 focus:ring-offset-[#0F0F0F] transition-colors duration-200"
                >
                  my tickets
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-white hover:text-[#E88C3A] font-mono border border-transparent rounded-none focus:outline-none focus:ring-2 focus:ring-[#E88C3A] focus:ring-offset-2 focus:ring-offset-[#0F0F0F] transition-colors duration-200"
                >
                  logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
