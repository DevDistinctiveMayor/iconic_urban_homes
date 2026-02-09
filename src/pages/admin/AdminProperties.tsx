import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { propertyService } from '../../services/api';
import { Property } from '../../types';

export function AdminProperties() {
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-properties'],
    queryFn: () => propertyService.getProperties({ limit: 50 }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => propertyService.deleteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Properties</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Property
          </button>
        </div>

        {showForm && (
          <div className="card mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingProperty ? 'Edit Property' : 'Add New Property'}
            </h2>
            <PropertyForm
              property={editingProperty}
              onSuccess={() => {
                setShowForm(false);
                setEditingProperty(null);
                queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
              }}
              onCancel={() => {
                setShowForm(false);
                setEditingProperty(null);
              }}
            />
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
          </div>
        ) : (
          <div className="card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="text-left py-3 px-4">City</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.data.properties.map((property) => (
                  <tr key={property.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{property.title}</td>
                    <td className="py-3 px-4">{property.type}</td>
                    <td className="py-3 px-4">${Number(property.price).toLocaleString()}</td>
                    <td className="py-3 px-4">{property.city}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        property.status === 'AVAILABLE' 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingProperty(property);
                            setShowForm(true);
                          }}
                          className="p-2 hover:bg-gray-200 rounded"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="p-2 hover:bg-red-100 text-red-600 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Property Form Component
function PropertyForm({ 
  property, 
  onSuccess, 
  onCancel 
}: { 
  property: Property | null; 
  onSuccess: () => void; 
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: property?.title || '',
    description: property?.description || '',
    type: property?.type || 'LAND',
    status: property?.status || 'AVAILABLE',
    price: property?.price || '',
    area: property?.area || '',
    location: property?.location || '',
    address: property?.address || '',
    city: property?.city || '',
    state: property?.state || '',
    zipCode: property?.zipCode || '',
    bedrooms: property?.bedrooms || '',
    bathrooms: property?.bathrooms || '',
  });

  const [images, setImages] = useState<File[]>([]);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      // First create/update the property
      const response = property
        ? await propertyService.updateProperty(property.id, data)
        : await propertyService.createProperty(data);
      
      // Then upload images if any
      if (images.length > 0 && response.data.id) {
        const formData = new FormData();
        images.forEach((image) => {
          formData.append('files', image);
        });

        try {
          await fetch(`/api/properties/${response.data.id}/images`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData,
          });
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          // Property is created, just images failed
        }
      }
      
      return response;
    },
    onSuccess: () => {
      setImages([]); // Clear images
      onSuccess();
    },
    onError: (error: any) => {
      console.error('Full error object:', error);
      console.error('Error response:', error.response?.data);
      const errorMessage = error.response?.data?.details || error.response?.data?.error || error.message || 'Failed to save property';
      alert(`Error: ${errorMessage}\n\nCheck console for details.`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.location || !formData.address || !formData.city || !formData.state) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Convert string values to numbers for backend
    const submitData = {
      ...formData,
      price: Number(formData.price),
      area: Number(formData.area),
      bedrooms: formData.bedrooms ? Number(formData.bedrooms) : undefined,
      bathrooms: formData.bathrooms ? Number(formData.bathrooms) : undefined,
    };
    
    console.log('Submitting property data:', submitData);
    mutation.mutate(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mutation.isError && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          Failed to save property. Please check all required fields.
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            className="input"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Type *</label>
          <select
            className="input"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
            required
          >
            <option value="LAND">Land</option>
            <option value="RESIDENTIAL">Residential</option>
            <option value="COMMERCIAL">Commercial</option>
            <option value="INDUSTRIAL">Industrial</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Price *</label>
          <input
            type="number"
            className="input"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Area (sq m) *</label>
          <input
            type="number"
            className="input"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">City *</label>
          <input
            type="text"
            className="input"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">State *</label>
          <input
            type="text"
            className="input"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Bedrooms</label>
          <input
            type="number"
            className="input"
            value={formData.bedrooms}
            onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Bathrooms</label>
          <input
            type="number"
            className="input"
            value={formData.bathrooms}
            onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Address *</label>
        <input
          type="text"
          className="input"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Location/Area *</label>
        <input
          type="text"
          className="input"
          placeholder="e.g., Kabusa, Gwarinpa, etc."
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description *</label>
        <textarea
          className="input"
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Property Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          className="input file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
          onChange={(e) => {
            if (e.target.files) {
              setImages(Array.from(e.target.files));
            }
          }}
        />
        {images.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-green-600 font-medium">
              ✓ {images.length} image(s) selected - will be uploaded when you save
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {images.map((file, index) => (
                <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {file.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <button type="submit" className="btn btn-primary" disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : property ? 'Update Property' : 'Create Property'}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
}