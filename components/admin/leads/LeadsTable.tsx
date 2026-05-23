'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MoreHorizontal, Filter } from 'lucide-react';
import { Lead, LeadStatus, ServiceType } from '@/lib/admin/types';
import { StatusBadge } from './StatusBadge';
import { LeadSlideOver } from './LeadSlideOver';

// Mock Data
const mockLeads: Lead[] = [
  {
    id: '1',
    date: '2026-05-23T10:00:00Z',
    clientName: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul@example.com',
    service: 'Website',
    status: 'New',
    company: 'Sharma Retail',
    notes: 'Needs a new ecommerce website for his retail business.',
  },
  {
    id: '2',
    date: '2026-05-22T14:30:00Z',
    clientName: 'Priya Patel',
    phone: '+91 91234 56789',
    email: 'priya.patel@gmail.com',
    service: 'Custom Software',
    status: 'In Progress',
    company: 'Patel Clinics',
    notes: 'Looking for a custom patient management system.',
  },
  {
    id: '3',
    date: '2026-05-21T09:15:00Z',
    clientName: 'Amit Desai',
    phone: '+91 99887 76655',
    email: 'amit@logistics.in',
    service: 'Automation',
    status: 'Contacted',
    notes: 'Wants to automate WhatsApp notifications for delivery updates.',
  },
];

const fetchLeads = async (): Promise<Lead[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockLeads;
};

export function LeadsTable() {
  const queryClient = useQueryClient();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [filterService, setFilterService] = useState<ServiceType | 'All'>('All');

  const { data: leads, isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: fetchLeads,
  });

  const updateLeadStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: LeadStatus }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { id, status };
    },
    onMutate: async (newLead) => {
      await queryClient.cancelQueries({ queryKey: ['leads'] });
      const previousLeads = queryClient.getQueryData<Lead[]>(['leads']);
      if (previousLeads) {
        queryClient.setQueryData<Lead[]>(
          ['leads'],
          previousLeads.map((lead) =>
            lead.id === newLead.id ? { ...lead, status: newLead.status } : lead
          )
        );
      }
      return { previousLeads };
    },
    onError: (err, newLead, context) => {
      if (context?.previousLeads) {
        queryClient.setQueryData(['leads'], context.previousLeads);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });

  const handleRowClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsSlideOverOpen(true);
  };

  const filteredLeads = leads?.filter(
    (lead) => filterService === 'All' || lead.service === filterService
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Recent Leads</h2>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            className="bg-[#1a1a1a] border border-white/10 text-sm text-white rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={filterService}
            onChange={(e) => setFilterService(e.target.value as any)}
          >
            <option value="All">All Services</option>
            <option value="Website">Website</option>
            <option value="Custom Software">Custom Software</option>
            <option value="Automation">Automation</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden border rounded-lg border-white/10 bg-[#0a0a0a]">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/5">
            <tr>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                Client
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                Contact
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                Service
              </th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-400 uppercase">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {isLoading ? (
              // Skeleton Loading
              [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4 whitespace-nowrap"><div className="w-24 h-4 bg-gray-800 rounded"></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="w-32 h-4 bg-gray-800 rounded"></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="w-40 h-4 bg-gray-800 rounded"></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="w-20 h-4 bg-gray-800 rounded"></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="w-16 h-6 bg-gray-800 rounded-full"></div></td>
                  <td className="px-6 py-4 whitespace-nowrap"></td>
                </tr>
              ))
            ) : filteredLeads?.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                  No leads found matching the criteria.
                </td>
              </tr>
            ) : (
              filteredLeads?.map((lead) => (
                <tr
                  key={lead.id}
                  className="transition-colors cursor-pointer hover:bg-white/5"
                  onClick={() => handleRowClick(lead)}
                >
                  <td className="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">
                    {new Date(lead.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{lead.clientName}</div>
                    {lead.company && <div className="text-xs text-gray-500">{lead.company}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{lead.phone}</div>
                    <div className="text-xs text-gray-500">{lead.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                    {lead.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <select
                      className="bg-transparent text-sm focus:outline-none cursor-pointer p-0 appearance-none"
                      value={lead.status}
                      onChange={(e) => updateLeadStatus.mutate({ id: lead.id, status: e.target.value as LeadStatus })}
                    >
                      <option className="bg-gray-900 text-white" value="New">New</option>
                      <option className="bg-gray-900 text-yellow-400" value="Contacted">Contacted</option>
                      <option className="bg-gray-900 text-purple-400" value="In Progress">In Progress</option>
                      <option className="bg-gray-900 text-green-400" value="Closed">Closed</option>
                    </select>
                    <div className="mt-1 pointer-events-none">
                       <StatusBadge status={lead.status} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <button className="text-gray-400 hover:text-white">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <LeadSlideOver
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        lead={selectedLead}
      />
    </div>
  );
}
