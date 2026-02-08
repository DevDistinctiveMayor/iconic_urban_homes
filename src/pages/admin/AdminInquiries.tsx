import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Mail, Phone, Trash2 } from 'lucide-react';
import { inquiryService } from '../../services/api';

export function AdminInquiries() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-inquiries'],
    queryFn: () => inquiryService.getInquiries({ limit: 50 }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      inquiryService.updateInquiryStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => inquiryService.deleteInquiry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Contact Inquiries</h1>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {data?.data.inquiries.map((inquiry) => (
              <div key={inquiry.id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{inquiry.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {inquiry.email}
                      </div>
                      {inquiry.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {inquiry.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      className="input py-1"
                      value={inquiry.status}
                      onChange={(e) =>
                        updateStatusMutation.mutate({
                          id: inquiry.id,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                    <button
                      onClick={() => handleDelete(inquiry.id)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{inquiry.message}</p>
                </div>
                
                <div className="mt-3 text-sm text-gray-500">
                  Received: {new Date(inquiry.createdAt).toLocaleString()}
                </div>
              </div>
            ))}

            {data?.data.inquiries.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No inquiries yet
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
