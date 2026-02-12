"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { GreenhouseCard } from "@/components/greenhouses/greenhouse-card";
import { GreenhouseForm } from "@/components/greenhouses/greenhouse-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Greenhouse {
  id: string;
  name: string;
  location: string;
  description: string | null;
  zones: { id: string; devices: { id: string; sensors: { id: string }[] }[] }[];
}

export default function GreenhousesPage() {
  const [greenhouses, setGreenhouses] = useState<Greenhouse[]>([]);
  const [open, setOpen] = useState(false);

  async function loadGreenhouses() {
    const res = await fetch("/api/greenhouses");
    const data = await res.json();
    setGreenhouses(data);
  }

  useEffect(() => {
    loadGreenhouses();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Greenhouses</h1>
          <p className="text-muted-foreground">Manage your greenhouses and zones</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Greenhouse
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Greenhouse</DialogTitle>
            </DialogHeader>
            <GreenhouseForm
              onSuccess={() => {
                setOpen(false);
                loadGreenhouses();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {greenhouses.map((gh) => (
          <GreenhouseCard key={gh.id} greenhouse={gh} />
        ))}
      </div>
      {greenhouses.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No greenhouses yet. Add your first greenhouse to get started.
        </div>
      )}
    </div>
  );
}
