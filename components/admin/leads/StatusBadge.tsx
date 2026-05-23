'use client';

import { clsx } from 'clsx';
import { LeadStatus } from '@/lib/admin/types';
import { twMerge } from 'tailwind-merge';

interface StatusBadgeProps {
  status: LeadStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    'New': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Contacted': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    'In Progress': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Closed': 'bg-green-500/10 text-green-400 border-green-500/20',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
          styles[status]
        )
      )}
    >
      {status}
    </span>
  );
}
