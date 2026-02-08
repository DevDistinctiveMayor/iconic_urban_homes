import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { MapPin, Home, DollarSign } from 'lucide-react';
import { propertyService } from '../services/api';
import { PropertyType, PropertyStatus } from '../types';

export function PropertiesPage() {
  const [filters, setFilters] = useState({
    type: '' as PropertyType | '',
    city: '',
    minPrice: '',
    maxPrice: '',
    page: 1,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['properties', filters],
    queryFn: () => propertyService.getProperties(filters),
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Available Properties</h1>

        {/* Filters */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Property Type</label>
              <select
                className="input"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="LAND">Land</option>
                <option value="RESIDENTIAL">Residential</option>
                <option value="COMMERCIAL">Commercial</option>
                <option value="INDUSTRIAL">Industrial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <input
                type="text"
                className="input"
                placeholder="Enter city"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Min Price</label>
              <input
                type="number"
                className="input"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Max Price</label>
              <input
                type="number"
                className="input"
                placeholder="Any"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
          </div>
        )}

        {/* Properties Grid */}
        {data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {data.data.properties.map((property) => (
                <Link
                  key={property.id}
                  to={`/properties/${property.id}`}
                  className="card hover:shadow-lg transition-shadow overflow-hidden p-0"
                >
                  <div className="aspect-video bg-gray-200">
                    {property.images[0] ? (
                      <img
                        src={property.images[0].url}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Home className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{property.title}</h3>
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">
                        {property.type}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.city}, {property.state}
                    </div>
                    <div className="flex items-center text-primary-600 font-bold text-xl">
                      <DollarSign className="h-5 w-5" />
                      {Number(property.price).toLocaleString()}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {property.area} sq m
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {data.data.pagination.pages > 1 && (
              <div className="flex justify-center gap-2">
                {Array.from({ length: data.data.pagination.pages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handleFilterChange('page', page)}
                    className={`px-4 py-2 rounded ${
                      filters.page === page
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
