import { Outlet, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthStore } from "../stores/authStore";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Logo" className="h-16 w-16" />
              <span className="text-l font-bold text-gray-900">
                ICONIC URBAN HOMES
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-[#9d8c2d]">
                Home
              </Link>
              <Link
                to="/properties"
                className="text-gray-700 hover:text-[#9d8c2d]"
              >
                Properties
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-[#9d8c2d]"
              >
                Contact
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-[#9d8c2d]"
                  >
                    Dashboard
                  </Link>
                  <button onClick={logout} className="btn btn-secondary">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile Navigation Panel */}
          <div className="fixed top-14 left-0 right-0 bottom-0 bg-white z-40 md:hidden overflow-y-auto">
            <div className="px-4 py-4 space-y-2">
              <Link
                to="/"
                className="block py-2 text-lg text-gray-700 hover:text-[#9d8c2d] hover:bg-gray-50 px-4 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/properties"
                className="block py-1 text-lg text-gray-700 hover:text-[#9d8c2d] hover:bg-gray-50 px-4 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Properties
              </Link>
              <Link
                to="/contact"
                className="block py-1 text-lg text-gray-700 hover:text-[#9d8c2d] hover:bg-gray-50 px-4 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/admin"
                    className="block py-3 text-lg text-gray-700 hover:text-[#9d8c2d] hover:bg-gray-50 px-4 rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="pt-4 px-4">
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="btn btn-secondary w-full"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-1 px-14">
                  <Link
                    to="/login"
                    className="btn btn-primary w-full block text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/logo.png" alt="Logo" className="h-16 w-16" />
                <span className="text-lg font-bold text-white">
                  ICONIC URBAN HOMES
                </span>
              </div>
              <p className="text-gray-400">
                Your trusted partner in finding the perfect property.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  to="/properties"
                  className="block text-gray-400 hover:text-white"
                >
                  Properties
                </Link>
                <Link
                  to="/contact"
                  className="block text-gray-400 hover:text-white"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">
                Email: info@realestate.com
                <br />
                Phone: +234 806 486 0707, +234 803 918 8575
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Iconic Urban Homes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}