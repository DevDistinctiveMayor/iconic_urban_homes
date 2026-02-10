import { Link } from "react-router-dom";
import { Building2, Search, Shield, TrendingUp } from "lucide-react";

export function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 text-white bg-[url('/public/bg-hero.jpg')] bg-cover bg-center">
  {/* Darker overlay for better text contrast */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect Property
            </h1>

            <p className="text-lg mb-4 text-primary-100">
              Iconic Urban Homes A Division of Iconic Holdings Limited
            </p>

            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Lands, Buildings, and Construction Services
            </p>

            <Link
              to="/properties"
              className="inline-block bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-lg font-semibold"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
              <p className="text-gray-600">
                Find properties that match your exact requirements with our
                advanced search
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Service</h3>
              <p className="text-gray-600">
                Years of experience in real estate with verified properties
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Competitive pricing and great investment opportunities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Property Types
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {["Land", "Residential", "Commercial", "Industrial"].map((type) => (
              <Link
                key={type}
                to={`/properties?type=${type.toUpperCase()}`}
                className="card hover:shadow-lg transition-shadow text-center"
              >
                <Building2 className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">{type}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Browse our properties or get in touch with us for personalized
            assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/properties"
              className="btn btn-primary text-lg px-8 py-3"
            >
              View Properties
            </Link>
            <Link to="/contact" className="btn btn-secondary text-lg px-8 py-3">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
