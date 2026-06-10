"use client";

export default function StatsCard({ icon: Icon, label, value }) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-10 h-10 bg-erode-green/10 rounded-lg flex items-center justify-center">
            <Icon className="size-5 text-erode-green" />
          </div>
        )}
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-erode-black">{value}</p>
        </div>
      </div>
    </div>
  );
}
