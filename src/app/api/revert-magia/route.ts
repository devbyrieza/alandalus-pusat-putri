import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const magia = await prisma.pendaftar.findFirst({
      where: { nama_lengkap: { contains: "Magia", mode: "insensitive" } },
      include: { pengumuman: true },
    });

    if (!magia) {
      return NextResponse.json({ success: false, message: "Magia not found in the database." });
    }

    // Revert status_pendaftaran to 'tested'
    await prisma.pendaftar.update({
      where: { id: magia.id },
      data: { status_pendaftaran: "tested" },
    });

    // Update or Create Pengumuman Draft
    if (magia.pengumuman) {
      await prisma.pengumuman.update({
        where: { pendaftar_id: magia.id },
        data: {
          is_published: false,
          published_at: null,
          published_by: null,
          status_kelulusan: "Cadangan",
        },
      });
    } else {
      await prisma.pengumuman.create({
        data: {
          pendaftar_id: magia.id,
          status_kelulusan: "Cadangan",
          is_published: false,
          tahun_ajaran_id: magia.tahun_ajaran_id || "TA2627",
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully reverted data for ${magia.nama_lengkap} (ID: ${magia.id}) to tested/draft.`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
