import { LeadsTable } from '@/components/admin/leads/LeadsTable';

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Lead Management</h1>
        <p className="mt-2 text-sm text-gray-400">
          Track and manage all incoming agency inquiries and project requests.
        </p>
      </div>

      <LeadsTable />
    </div>
  );
}
