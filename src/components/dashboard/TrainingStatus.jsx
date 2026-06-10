"use client";

import { trainingApplications } from "@/data/mockData";
import { Clock, CheckCircle, XCircle } from "lucide-react";

const statusConfig = {
  Pending: {
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  Approved: {
    color: "bg-green-100 text-erode-black",
    icon: CheckCircle,
  },
  Rejected: {
    color: "bg-red-100 text-red-700",
    icon: XCircle,
  },
};

export default function TrainingStatus() {
  if (trainingApplications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No training applications yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {trainingApplications.map((app) => {
        const config = statusConfig[app.status] || statusConfig.Pending;
        const StatusIcon = config.icon;

        return (
          <div
            key={app.id}
            className="border border-gray-200 rounded-lg p-4 bg-white flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold text-erode-black">{app.program} Program</h3>
              <p className="text-sm text-gray-500 mt-1">
                Applied on {app.date}
              </p>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
            >
              <StatusIcon className="size-3.5" />
              {app.status}
            </span>
          </div>
        );
      })}
    </div>
  );
}
