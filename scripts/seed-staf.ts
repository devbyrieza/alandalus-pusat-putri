import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Format password default: Andalus2026!
// Admin Super masing-masing dapat langsung ganti password setelah login pertama

const stafList = [
  // === ADMIN SUPER ===
  {
    username: 'ibnuauliabakir96',
    email: 'ibnuauliabakir96@gmail.com',
    full_name: 'Ibnu Aulia Bakir',
    role: 'admin_super',
    phone: '081212533532',
    plain_password: 'Andalus2026!'
  },
  {
    username: 'dede2026',
    email: 'humasalandalusputri@gmail.com',
    full_name: 'Dede Andri Aditya',
    role: 'admin_super',
    phone: '085718965409',
    plain_password: 'Andalus2026!'
  },
  // === ADMIN KEUANGAN ===
  {
    username: 'keuanganpi',
    email: 'keu.alandalus@gmail.com',
    full_name: 'Abdul Rahman Hidayat',
    role: 'admin_keuangan',
    phone: '085883873000',
    plain_password: 'Andalus2026!'
  },
  // === ADMIN BERKAS ===
  {
    username: 'falah2026',
    email: 'sekretaris.alandalusputri@gmail.com',
    full_name: 'Muhammad Falah',
    role: 'admin_berkas',
    phone: '081383261911',
    plain_password: 'Andalus2026!'
  },
  // === PENGUJI QURAN ===
  {
    username: 'diyupi',
    email: 'ayu28464@gmail.com',
    full_name: 'Dyah Ayu Kusuma Dewi',
    role: 'penguji',
    phone: '085772138770',
    plain_password: 'Andalus2026!'
  },
  // === PEWAWANCARA CALON SANTRI ===
  {
    username: 'rayaarinjani',
    email: 'rayaarinjani@gmail.com',
    full_name: 'Raya Putri Rinjani',
    role: 'pewawancara_calsan',
    phone: '085198553175',
    plain_password: 'Andalus2026!'
  },
  // === PEWAWANCARA CALON WALI SANTRI ===
  {
    username: 'rikanurfauziah30',
    email: 'kawzia05@gmail.com',
    full_name: 'Rika Nur Fauziah',
    role: 'pewawancara_cawalsan',
    phone: '081296963625',
    plain_password: 'Andalus2026!'
  },
];

async function main() {
  console.log('Seeding staff accounts for PPDB Al-Andalus Pusat Putri...');
  
  for (const staf of stafList) {
    const existing = await prisma.profile.findFirst({
      where: {
        OR: [
          { email: staf.email },
          { username: staf.username.toLowerCase() },
        ]
      }
    });

    if (existing) {
      console.log(`  [SKIP] ${staf.full_name} (${staf.email}) - sudah ada`);
      continue;
    }

    const password_hash = await bcrypt.hash(staf.plain_password, 10);

    await prisma.profile.create({
      data: {
        username: staf.username.toLowerCase(),
        email: staf.email.toLowerCase(),
        full_name: staf.full_name,
        role: staf.role,
        phone: staf.phone,
        password_hash,
        must_change_password: true,
        plain_password: staf.plain_password,
      }
    });

    console.log(`  [OK] ${staf.full_name} - ${staf.role} - ${staf.email}`);
  }

  console.log('\nSeeding selesai!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
