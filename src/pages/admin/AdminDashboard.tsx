import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Building2, MessageSquare, TrendingUp } from 'lucide-react';
import { propertyService, inquiryService } from '../../services/api';

export function AdminDashboard() {
  const { data: properties } = useQuery({
    queryKey: ['properties'],
    queryFn: () => propertyService.getProperties({ limit: 5 }),
  });

  const { data: inquiries } = useQuery({
    queryKey: ['inquiries'],
    queryFn: () => inquiryService.getInquiries({ limit: 5 }),
  });

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">Total Properties</p>
                <p className="text-3xl font-bold">
                  {properties?.data.pagination.total || 0}
                </p>
              </div>
              <Building2 className="h-12 w-12 text-primary-600" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">New Inquiries</p>
                <p className="text-3xl font-bold">
                  {inquiries?.data.pagination.total || 0}
                </p>
              </div>
              <MessageSquare className="h-12 w-12 text-primary-600" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">Active Listings</p>
                <p className="text-3xl font-bold">
                  {properties?.data.properties.filter(p => p.status === 'AVAILABLE').length || 0}
                </p>
              </div>
              <TrendingUp className="h-12 w-12 text-primary-600" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                to="/admin/properties"
                className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Manage Properties
              </Link>
              <Link
                to="/admin/inquiries"
                className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                View Inquiries
              </Link>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Recent Inquiries</h2>
            <div className="space-y-3">
              {inquiries?.data.inquiries.slice(0, 3).map((inquiry) => (
                <div key={inquiry.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">{inquiry.name}</p>
                  <p className="text-sm text-gray-600">{inquiry.email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
