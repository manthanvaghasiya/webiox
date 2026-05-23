'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Save, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ServiceItem {
  id: string;
  name: string;
  isActive: boolean;
  minPriceINR: number;
  maxPriceINR: number;
  deliveryTimeline: string;
}

// Mock initial data
const initialServices: ServiceItem[] = [
  { id: '1', name: 'Premium Business Websites', isActive: true, minPriceINR: 15000, maxPriceINR: 50000, deliveryTimeline: '1-2 weeks' },
  { id: '2', name: 'Custom Business Software / CRMs / SaaS', isActive: true, minPriceINR: 50000, maxPriceINR: 200000, deliveryTimeline: '2-6 weeks' },
  { id: '3', name: 'AI & Automation Systems', isActive: true, minPriceINR: 20000, maxPriceINR: 100000, deliveryTimeline: '3-4 weeks' },
];

const fetchServices = async (): Promise<ServiceItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [...initialServices];
};

export default function ServicesManager() {
  const queryClient = useQueryClient();
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
    staleTime: Infinity // Keep it fresh for local edits in this mock
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ServiceItem | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof ServiceItem, string>>>({});

  const saveService = useMutation({
    mutationFn: async (updatedService: ServiceItem) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return updatedService;
    },
    onSuccess: (updatedService) => {
      queryClient.setQueryData<ServiceItem[]>(['services'], (old) => {
        if (!old) return old;
        return old.map(s => s.id === updatedService.id ? updatedService : s);
      });
      setEditingId(null);
      setEditForm(null);
    }
  });

  const handleEdit = (service: ServiceItem) => {
    setEditingId(service.id);
    setEditForm({ ...service });
    setErrors({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
    setErrors({});
  };

  const validateAndSave = () => {
    if (!editForm) return;
    
    const newErrors: any = {};
    if (!editForm.name) newErrors.name = 'Service name is required';
    if (editForm.minPriceINR < 0) newErrors.minPriceINR = 'Min price must be positive';
    if (editForm.maxPriceINR < editForm.minPriceINR) newErrors.maxPriceINR = 'Max price must be greater than min price';
    if (!editForm.deliveryTimeline) newErrors.deliveryTimeline = 'Timeline is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    saveService.mutate(editForm);
  };

  const toggleActive = useMutation({
    mutationFn: async ({ id, isActive }: { id: string, isActive: boolean }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { id, isActive };
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ['services'] });
      const previous = queryClient.getQueryData<ServiceItem[]>(['services']);
      queryClient.setQueryData<ServiceItem[]>(['services'], old => {
        if (!old) return old;
        return old.map(s => s.id === variables.id ? { ...s, isActive: variables.isActive } : s);
      });
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['services'], context.previous);
      }
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Services & Pricing Manager</h1>
        <p className="mt-2 text-sm text-gray-400">Manage your agency offerings, pricing, and active status.</p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="h-32 border rounded-lg bg-white/5 border-white/10 animate-pulse" />
          ))
        ) : (
          services?.map(service => (
            <div key={service.id} className="p-6 border rounded-lg bg-[#0a0a0a] border-white/10">
              {editingId === service.id && editForm ? (
                // Edit Mode
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-sm text-gray-400">Service Name</label>
                      <input
                        type="text"
                        className={twMerge(
                          clsx("block w-full px-3 py-2 bg-[#1a1a1a] border rounded-md text-white focus:ring-blue-500 sm:text-sm",
                          errors.name ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-blue-500")
                        )}
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        disabled={saveService.isPending}
                      />
                      {errors.name && <p className="text-xs text-red-500 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1"/> {errors.name}</p>}
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm text-gray-400">Min Price (₹)</label>
                      <input
                        type="number"
                        className={twMerge(
                          clsx("block w-full px-3 py-2 bg-[#1a1a1a] border rounded-md text-white focus:ring-blue-500 sm:text-sm",
                          errors.minPriceINR ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-blue-500")
                        )}
                        value={editForm.minPriceINR}
                        onChange={(e) => setEditForm({...editForm, minPriceINR: Number(e.target.value)})}
                        disabled={saveService.isPending}
                      />
                      {errors.minPriceINR && <p className="text-xs text-red-500 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1"/> {errors.minPriceINR}</p>}
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm text-gray-400">Max Price (₹)</label>
                      <input
                        type="number"
                        className={twMerge(
                          clsx("block w-full px-3 py-2 bg-[#1a1a1a] border rounded-md text-white focus:ring-blue-500 sm:text-sm",
                          errors.maxPriceINR ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-blue-500")
                        )}
                        value={editForm.maxPriceINR}
                        onChange={(e) => setEditForm({...editForm, maxPriceINR: Number(e.target.value)})}
                        disabled={saveService.isPending}
                      />
                      {errors.maxPriceINR && <p className="text-xs text-red-500 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1"/> {errors.maxPriceINR}</p>}
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-sm text-gray-400">Delivery Timeline</label>
                      <input
                        type="text"
                        placeholder="e.g. 1-2 weeks"
                        className={twMerge(
                          clsx("block w-full px-3 py-2 bg-[#1a1a1a] border rounded-md text-white focus:ring-blue-500 sm:text-sm",
                          errors.deliveryTimeline ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-blue-500")
                        )}
                        value={editForm.deliveryTimeline}
                        onChange={(e) => setEditForm({...editForm, deliveryTimeline: e.target.value})}
                        disabled={saveService.isPending}
                      />
                      {errors.deliveryTimeline && <p className="text-xs text-red-500 flex items-center mt-1"><AlertCircle className="w-3 h-3 mr-1"/> {errors.deliveryTimeline}</p>}
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      onClick={handleCancel}
                      disabled={saveService.isPending}
                      className="px-4 py-2 text-sm font-medium text-gray-300 bg-transparent border border-white/10 rounded-md hover:bg-white/5"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={validateAndSave}
                      disabled={saveService.isPending}
                      className="flex items-center px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-500 disabled:opacity-50"
                    >
                      {saveService.isPending ? 'Saving...' : <><Save className="w-4 h-4 mr-2" /> Save</>}
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-medium text-white">{service.name}</h3>
                      <span className={twMerge(
                        clsx("px-2 py-0.5 text-xs font-medium rounded-full",
                        service.isActive ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-gray-500/10 text-gray-400 border border-gray-500/20")
                      )}>
                        {service.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Pricing: ₹{service.minPriceINR.toLocaleString('en-IN')} - ₹{service.maxPriceINR.toLocaleString('en-IN')}
                    </div>
                    <div className="text-sm text-gray-400">
                      Timeline: {service.deliveryTimeline}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4 sm:mt-0">
                    <button
                      onClick={() => toggleActive.mutate({ id: service.id, isActive: !service.isActive })}
                      className="px-3 py-1.5 text-sm font-medium text-gray-300 border border-white/10 rounded hover:bg-white/5"
                    >
                      {service.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleEdit(service)}
                      className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-500"
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
