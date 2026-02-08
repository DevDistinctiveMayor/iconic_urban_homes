import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Home, Calendar, Ruler } from 'lucide-react';
import { propertyService } from '../services/api';

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  const { data: property, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: () => propertyService.getPropertyById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!property) {
    return <div className="text-center py-12">Property not found</div>;
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {property.data.images.length > 0 ? (
            property.data.images.map((image) => (
              <div key={image.id} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={image.url}
                  alt={property.data.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center col-span-2">
              <Home className="h-24 w-24 text-gray-400" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{property.data.title}</h1>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  {property.data.address}, {property.data.city}, {property.data.state}
                </div>
              </div>
              <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-semibold">
                {property.data.type}
              </span>
            </div>

            <div className="text-3xl font-bold text-primary-600 mb-6">
              ${Number(property.data.price).toLocaleString()}
            </div>

            <div className="card mb-6">
              <h2 className="text-xl font-semibold mb-4">Property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="flex items-center text-gray-600 mb-1">
                    <Ruler className="h-4 w-4 mr-2" />
                    Area
                  </div>
                  <div className="font-semibold">{property.data.area} sq m</div>
                </div>
                {property.data.bedrooms && (
                  <div>
                    <div className="text-gray-600 mb-1">Bedrooms</div>
                    <div className="font-semibold">{property.data.bedrooms}</div>
                  </div>
                )}
                {property.data.bathrooms && (
                  <div>
                    <div className="text-gray-600 mb-1">Bathrooms</div>
                    <div className="font-semibold">{property.data.bathrooms}</div>
                  </div>
                )}
                {property.data.yearBuilt && (
                  <div>
                    <div className="flex items-center text-gray-600 mb-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Year Built
                    </div>
                    <div className="font-semibold">{property.data.yearBuilt}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{property.data.description}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="card sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Interested in this property?</h2>
              <p className="text-gray-600 mb-6">
                Contact us for more information or to schedule a viewing.
              </p>
              <a
                href={`/contact?property=${property.data.id}`}
                className="btn btn-primary w-full text-center"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
