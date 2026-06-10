"use client";

import { useState } from "react";
import { orders as mockOrders } from "@/data/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statuses = [
  "Order Placed",
  "Payment Verified",
  "Packed",
  "Dispatched",
  "Out for Delivery",
  "Delivered",
];

export default function OrderTable() {
  const [orderList, setOrderList] = useState(mockOrders);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? orderList
    : orderList.filter((o) => o.status === filter);

  const updateStatus = (orderId, newStatus) => {
    setOrderList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-2xl text-erode-black">Orders</h2>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-erode-black">
                    {order.id}
                  </TableCell>
                  <TableCell className="text-gray-500">Customer</TableCell>
                  <TableCell className="text-gray-500">{order.date}</TableCell>
                  <TableCell>₹{order.total.toLocaleString("en-IN")}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-erode-green text-erode-black"
                          : "bg-erode-black text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(v) => updateStatus(order.id, v)}
                    >
                      <SelectTrigger className="w-40 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
