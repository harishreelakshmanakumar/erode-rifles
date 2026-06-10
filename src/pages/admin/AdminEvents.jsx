"use client";

import { useState } from "react";
import { events as mockEvents } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Calendar, MapPin, Clock } from "lucide-react";

const eventTypes = ["Competition", "Training", "Event", "Workshop"];

export default function AdminEvents() {
  const [eventList, setEventList] = useState(mockEvents);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState({
    title: "",
    type: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  const resetForm = () => {
    setForm({ title: "", type: "", date: "", time: "", location: "", description: "" });
    setEditingEvent(null);
  };

  const openAdd = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEdit = (event) => {
    setEditingEvent(event);
    setForm({
      title: event.title,
      type: event.type,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description || "",
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.title || !form.type || !form.date) return;

    if (editingEvent) {
      setEventList((prev) =>
        prev.map((e) =>
          e.id === editingEvent.id ? { ...e, ...form } : e
        )
      );
    } else {
      setEventList((prev) => [
        ...prev,
        { id: Date.now(), isFeatured: false, ...form },
      ]);
    }

    setDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEventList((prev) => prev.filter((e) => e.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-2xl text-erode-black">Events</h2>
        <Button
          onClick={openAdd}
          className="bg-erode-green hover:bg-erode-green/90 text-erode-black font-semibold gap-2"
        >
          <Plus className="size-4" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {eventList.map((event) => (
          <div
            key={event.id}
            className="border border-gray-200 rounded-lg p-4 bg-white"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-erode-black">{event.title}</h3>
                <span className="inline-block px-2 py-0.5 bg-erode-green/10 text-erode-green text-xs font-medium rounded mt-1">
                  {event.type}
                </span>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => openEdit(event)}
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500"
                  onClick={() => handleDelete(event.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-1 text-sm text-gray-500 mt-3">
              <div className="flex items-center gap-2">
                <Calendar className="size-3.5" />
                {event.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-3.5" />
                {event.time}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5" />
                {event.location}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? "Edit Event" : "Add Event"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Event title"
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={form.type}
                onValueChange={(v) => setForm({ ...form, type: v })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  placeholder="Aug 15, 2025"
                />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  placeholder="9:00 AM - 5:00 PM"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Event location"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Event description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-erode-green hover:bg-erode-green/90 text-erode-black font-semibold"
            >
              {editingEvent ? "Save Changes" : "Add Event"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
