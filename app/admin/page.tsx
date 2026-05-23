export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard Overview</h1>
        <p className="mt-2 text-sm text-gray-400">
          Welcome to the Webiox Admin Panel.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder Stat Cards */}
        <div className="p-6 border rounded-xl bg-white/5 border-white/10">
          <p className="text-sm font-medium text-gray-400">Total Leads</p>
          <p className="mt-2 text-3xl font-semibold text-white">124</p>
        </div>
        <div className="p-6 border rounded-xl bg-white/5 border-white/10">
          <p className="text-sm font-medium text-gray-400">Active Projects</p>
          <p className="mt-2 text-3xl font-semibold text-white">12</p>
        </div>
        <div className="p-6 border rounded-xl bg-white/5 border-white/10">
          <p className="text-sm font-medium text-gray-400">Conversion Rate</p>
          <p className="mt-2 text-3xl font-semibold text-white">8.4%</p>
        </div>
      </div>
    </div>
  );
}
