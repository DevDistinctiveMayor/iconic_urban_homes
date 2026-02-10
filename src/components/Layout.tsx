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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
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
              <Link to="/about" className="text-gray-700 hover:text-[#9d8c2d]">
                About
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
              className="md:hidden p-2 hover:bg-gray-100 rounded-md transition-colors relative z-50"
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

      {/* Mobile Menu - Slide-in from right with backdrop blur */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Blurred Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Slide-in Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Menu Header */}
          <div className="px-6 py-1 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="Logo" className="h-12 w-12" />
              <span className="text-sm font-bold text-gray-900">
                ICONIC URBAN HOMES
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="px-4 py-6 space-y-2">
            <Link
              to="/"
              className="block py-3 px-4 text-gray-700 hover:text-[#9d8c2d] hover:bg-[#9d8c2d]/5 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/properties"
              className="block py-3 px-4 text-gray-700 hover:text-[#9d8c2d] hover:bg-[#9d8c2d]/5 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Properties
            </Link>
            <Link
              to="/about"
              className="block py-3 px-4 text-gray-700 hover:text-[#9d8c2d] hover:bg-[#9d8c2d]/5 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-3 px-4 text-gray-700 hover:text-[#9d8c2d] hover:bg-[#9d8c2d]/5 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {isAuthenticated && (
              <Link
                to="/admin"
                className="block py-3 px-4 text-gray-700 hover:text-[#9d8c2d] hover:bg-[#9d8c2d]/5 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Auth Button - Fixed at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-white">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="btn btn-secondary w-full"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary w-full block text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

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
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Properties
                </Link>
                <Link
                  to="/contact"
                  className="block text-gray-400 hover:text-white transition-colors"
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
