"use client";

import { useState } from "react";
import { trainingApplications as mockTraining } from "@/data/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function AdminTraining() {
  const [applications, setApplications] = useState(mockTraining);

  const handleApprove = (id) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Approved" } : a))
    );
  };

  const handleReject = (id) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Rejected" } : a))
    );
  };

  const statusColor = (status) => {
    if (status === "Approved") return "bg-erode-green text-erode-black";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-800";
  };

  return (
    <div>
      <h2 className="font-heading text-2xl text-erode-black mb-4">
        Training Applications
      </h2>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium text-erode-black">
                  {app.name}
                </TableCell>
                <TableCell className="text-gray-500">{app.phone}</TableCell>
                <TableCell>{app.program}</TableCell>
                <TableCell className="text-gray-500">{app.date}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusColor(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>
                </TableCell>
                <TableCell>
                  {app.status === "Pending" ? (
                    <div className="flex gap-1">
                      <Button
                        onClick={() => handleApprove(app.id)}
                        className="bg-erode-green hover:bg-erode-green/90 text-erode-black h-8 text-xs"
                      >
                        <Check className="size-3.5 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleReject(app.id)}
                        className="h-8 text-xs"
                      >
                        <X className="size-3.5 mr-1" />
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
