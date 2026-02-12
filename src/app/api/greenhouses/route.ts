import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const greenhouseSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
});

export async function GET() {
  const greenhouses = await prisma.greenhouse.findMany({
    include: {
      zones: {
        include: {
          devices: {
            include: { sensors: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(greenhouses);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = greenhouseSchema.parse(body);
    const greenhouse = await prisma.greenhouse.create({ data });
    return NextResponse.json(greenhouse, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
