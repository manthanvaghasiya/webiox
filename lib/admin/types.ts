export type LeadStatus = 'New' | 'Contacted' | 'In Progress' | 'Closed';
export type ServiceType = 'Website' | 'Custom Software' | 'Automation';

export interface Lead {
  id: string;
  date: string;
  clientName: string;
  phone: string;
  email: string;
  service: ServiceType;
  status: LeadStatus;
  notes?: string;
  company?: string;
}

export interface Metric {
  title: string;
  value: string | number;
  change: number; // Percentage change
  isPositive: boolean;
}

export interface Activity {
  id: string;
  description: string;
  timestamp: string;
  type: 'lead' | 'system' | 'content';
}
