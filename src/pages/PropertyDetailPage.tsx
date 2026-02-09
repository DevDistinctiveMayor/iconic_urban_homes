import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { propertyService } from '../services/api';
import { API_CONFIG } from '../config/api.config';
import { MapPin, Home, DollarSign, Bed, Bath } from 'lucide-react';

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  const { data: property, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: () => propertyService.getPropertyById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!property) {
    return <div className="text-center py-12">Property not found</div>;
  }

  const propertyData = property.data;
  const primaryImage = propertyData.images?.find(img => img.isPrimary) || propertyData.images?.[0];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {/* Main Image */}
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            {primaryImage ? (
              <img
                src={API_CONFIG.getImageUrl(primaryImage.url)}
                alt={propertyData.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Failed to load image');
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Home className="h-24 w-24 text-gray-400" />
              </div>
            )}
          </div>

          {/* Thumbnail Grid */}
          {propertyData.images && propertyData.images.length > 1 && (
            <div className="grid grid-cols-2 gap-4">
              {propertyData.images.slice(1, 5).map((image) => (
                <div key={image.id} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={API_CONFIG.getImageUrl(image.url)}
                    alt={propertyData.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{propertyData.title}</h1>
            
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              {propertyData.address}, {propertyData.city}, {propertyData.state}
            </div>

            <div className="flex items-center text-primary-600 font-bold text-3xl mb-6">
              <DollarSign className="h-8 w-8" />
              {Number(propertyData.price).toLocaleString()}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="card text-center">
                <div className="text-2xl font-bold">{propertyData.area}</div>
                <div className="text-sm text-gray-600">sq m</div>
              </div>
              {propertyData.bedrooms && (
                <div className="card text-center">
                  <Bed className="h-6 w-6 mx-auto mb-2 text-primary-600" />
                  <div className="text-2xl font-bold">{propertyData.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
              )}
              {propertyData.bathrooms && (
                <div className="card text-center">
                  <Bath className="h-6 w-6 mx-auto mb-2 text-primary-600" />
                  <div className="text-2xl font-bold">{propertyData.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
              )}
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{propertyData.description}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Property Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Type:</span>
                  <span className="ml-2 font-medium">{propertyData.type}</span>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className="ml-2 font-medium">{propertyData.status}</span>
                </div>
                {propertyData.yearBuilt && (
                  <div>
                    <span className="text-gray-600">Year Built:</span>
                    <span className="ml-2 font-medium">{propertyData.yearBuilt}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}