import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Boxes, Cpu } from "lucide-react";

interface GreenhouseCardProps {
  greenhouse: {
    id: string;
    name: string;
    location: string;
    description: string | null;
    zones: { id: string; devices: { id: string; sensors: { id: string }[] }[] }[];
  };
}

export function GreenhouseCard({ greenhouse }: GreenhouseCardProps) {
  const totalDevices = greenhouse.zones.reduce(
    (acc, z) => acc + z.devices.length,
    0
  );

  return (
    <Link href={`/greenhouses/${greenhouse.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{greenhouse.name}</CardTitle>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="text-sm">{greenhouse.location}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Badge variant="secondary" className="gap-1">
              <Boxes className="h-3 w-3" />
              {greenhouse.zones.length} zones
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Cpu className="h-3 w-3" />
              {totalDevices} devices
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
