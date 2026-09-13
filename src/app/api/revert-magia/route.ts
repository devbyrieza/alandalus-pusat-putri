import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const confirm = searchParams.get("confirm");

    if (confirm !== "yes") {
      return NextResponse.json({ 
        message: "Warning: This will revert ALL published pendaftar back to 'tested' (Draft). Add ?confirm=yes to the URL to execute." 
      });
    }

    // Find all pendaftar that are already accepted, rejected, cadangan, or announced
    const affectedPendaftar = await prisma.pendaftar.findMany({
      where: {
        status_pendaftaran: { in: ["accepted", "rejected", "cadangan", "announced"] }
      },
      select: { id: true, nama_lengkap: true }
    });

    const affectedIds = affectedPendaftar.map(p => p.id);

    if (affectedIds.length === 0) {
      return NextResponse.json({ success: true, message: "No pendaftar found to revert." });
    }

    // 1. Revert status_pendaftaran in Pendaftar table
    await prisma.pendaftar.updateMany({
      where: { id: { in: affectedIds } },
      data: { status_pendaftaran: "tested" },
    });

    // 2. Revert Pengumuman to Draft (is_published = false)
    await prisma.pengumuman.updateMany({
      where: { pendaftar_id: { in: affectedIds } },
      data: {
        is_published: false,
        published_at: null,
      },
    });

    return NextResponse.json({
      success: true,
      revertedCount: affectedIds.length,
      message: `Successfully reverted ${affectedIds.length} pendaftar back to 'tested' (Draft).`,
      names: affectedPendaftar.map(p => p.nama_lengkap)
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
