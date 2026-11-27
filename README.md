# Dashboard Keuangan & Aset Daerah — BKAD Kulon Progo

## 1. Brief

Dashboard eksekutif untuk memantau **Realisasi Anggaran (LRA)**, **Pajak PBB**, dan **Aset Daerah** Kabupaten Kulon Progo, ditambah fitur **Catatan** satu arah dari Pimpinan. Data masuk lewat impor Excel oleh Admin BKAD.

| Pengguna | Bisa apa |
|---|---|
| Pimpinan | Melihat semua data, menulis Catatan ke Wilayah/OPD |
| Wilayah / OPD | Melihat data wilayahnya sendiri, membaca Catatan |
| Admin BKAD | Impor data Excel, kelola akun & grup |

**Aturan penting dari dokumen (jangan dilanggar):**

- **Scope dicek di server**, bukan hanya menyembunyikan menu. Wilayah/OPD hanya melihat kode prefiksnya (mis. `34.01.110` → `34.01.110.xxx`). Di luar scope → 403.
- Dashboard hanya membaca **batch impor yang aktif** (impor disimpan sebagai draft dulu, tampil setelah diaktifkan Admin).
- **Total aset kabupaten diambil dari baris OPD-00**, bukan dijumlah semua baris.
- Setiap tampilan menunjukkan **tanggal data**.
- **Catatan satu arah**: Pimpinan menulis, penerima hanya membaca, tanpa balasan. Setiap catatan menyimpan snapshot angka saat ditulis.
- **Halaman publik** tanpa login, dibatasi 60 request/menit per IP, tidak menampilkan aset dan catatan.
- **Tidak ada registrasi mandiri**: akun dibuat oleh Admin BKAD.
- Uang disimpan sebagai `DECIMAL(20,2)`, diformat hanya di frontend.

Dokumen acuan (PDF flow & sequence diagram, ekspor Figma) **tidak ada di git**. Minta ke tim, lalu simpan di `docs/reference/`.

---

## 2. Tech Stack

| Bagian | Teknologi |
|---|---|
| Backend | Laravel 13 (PHP ≥ 8.3) |
| Frontend | Inertia.js + React + TypeScript |
| UI | Tailwind CSS v4 |
| Database | PostgreSQL |
| Testing & kualitas | Pest, PHPStan, Pint, `vp check`, `tsc` |
| Auth | *(rencana, dibangun di `feat/auth-scope`)* |
| Komponen UI | shadcn/ui *(rencana)* |
| Grafik | Recharts *(rencana)* |
| Impor Excel | maatwebsite/excel *(rencana)* |

---

## 3. Arsitektur

**Satu aplikasi Laravel**, bukan monorepo. Frontend React dan backend Laravel ada di repo yang sama, dihubungkan oleh Inertia, jadi tidak perlu REST API terpisah.

```
URL → routes/web.php → Controller → Service → Model (DB)
                           │
                           └─ Inertia::render('halaman', data) → halaman React
```

**Saat ini repo masih kosong**: hanya satu halaman `welcome` di `/`, tanpa login. Struktur di bawah adalah target, dibuat oleh tim sesuai modul masing-masing.

```
app/
├── Http/Controllers/              Controller per menu (tipis)
├── Services/<Modul>/              Logika & query (Keuangan, Pbb, Aset, Catatan, Impor)
├── Imports/                       Parser Excel
└── Models/                        Model Eloquent
database/migrations/               Struktur tabel
routes/web.php                     Daftar URL

resources/js/
├── pages/<menu>/                  Satu folder per menu (ringkasan, pajak-pbb, ...)
├── layouts/                       Layout halaman
├── components/                    Komponen bersama
└── lib/                           Helper bersama (mis. format Rupiah & persen)
```

**Tiga aturan:**

1. Controller tipis: semua query dan perhitungan ada di **Service**.
2. Setiap query data wilayah **wajib** memakai scope pengguna.
3. Komponen khusus satu halaman tetap di folder halaman itu. Pindahkan ke `components/dashboard/` hanya jika dipakai 2+ halaman.

**Pembagian modul:**

| Modul | Branch | Backend | Frontend |
|---|---|---|---|
| Auth & scope (**merge pertama**) | `feat/auth-scope` | Login, role, middleware scope, `User.php` | `pages/auth/` |
| Impor data (**merge awal**) | `feat/impor` | `Imports/`, `Services/Impor/` | `pages/admin/impor/` |
| Layout & navigasi | `feat/layout` | | `layouts/`, `components/` |
| Ringkasan | `feat/ringkasan` | `Controllers/Dashboard/` | `pages/ringkasan/` |
| Realisasi Anggaran | `feat/realisasi` | `Services/Keuangan/` | `pages/realisasi-anggaran/` |
| Pajak PBB | `feat/pbb` | `Services/Pbb/` | `pages/pajak-pbb/` |
| Aset Daerah | `feat/aset` | `Services/Aset/` | `pages/aset-daerah/` |
| Catatan | `feat/catatan` | `Services/Catatan/` | `pages/catatan/` |
| Kelola akun & grup | `feat/admin-pengguna` | `Controllers/Admin/` | `pages/admin/pengguna/` |
| Publik (setelah CR disetujui) | `feat/publik` | `Controllers/Publik/` | `pages/publik/` |

**File bersama** (kabari tim sebelum mengubah): `resources/js/layouts/`, `resources/js/components/`, `resources/js/lib/`, `resources/css/app.css`, `routes/web.php`, `.github/`.

---

## 4. Workflow

### Prasyarat

Semua orang butuh: **PHP ≥ 8.3, Composer, Node 22, pnpm, PostgreSQL 14+**.

**Windows**
1. Install [Laravel Herd](https://herd.laravel.com) (sudah termasuk PHP & Composer).
2. Install [Node 22](https://nodejs.org), lalu `npm install -g pnpm`.
3. Install [PostgreSQL](https://www.postgresql.org/download/windows/) (catat password user `postgres`).
4. Buat database: `psql -U postgres -c "CREATE DATABASE dinas_keuangan;"` (atau lewat pgAdmin).

**macOS**
```bash
brew install php composer node@22 postgresql@16
brew services start postgresql@16
npm install -g pnpm
createdb dinas_keuangan
```

**Linux (Ubuntu)**
```bash
sudo apt install php-cli php-pgsql php-xml php-mbstring php-curl php-zip php-bcmath php-intl composer postgresql
# Node 22 lewat nvm: https://github.com/nvm-sh/nvm
npm install -g pnpm
sudo -u postgres createdb dinas_keuangan
```

### Menjalankan (sama untuk semua OS)

```bash
git clone https://github.com/SyuraMoons/dinas-Keuangan.git
cd dinas-Keuangan
git checkout development

cp .env.example .env        # isi DB_USERNAME dan DB_PASSWORD sesuai PostgreSQL kamu
composer setup              # install dependency, generate key, migrate, build
composer run dev            # jalankan server + Vite
```

Buka http://localhost:8000. Yang tampil masih halaman kosong (welcome), belum ada login.

### Perintah harian

| Perintah | Fungsi |
|---|---|
| `composer run dev` | Jalankan aplikasi |
| `composer ci:check` | Semua pengecekan CI, **wajib lulus sebelum PR** |
| `composer lint` | Rapikan kode PHP |
| `pnpm run check:fix` | Rapikan kode JS/TS |
| `php artisan migrate` | Jalankan migration baru setelah `git pull` |

### Alur Git

```
main               stabil, hanya menerima PR dari development
 └─ development    integrasi, semua PR fitur masuk ke sini
     ├─ feat/pbb
     └─ fix/format-rupiah
```

1. Mulai dari `development` terbaru:
   ```bash
   git checkout development && git pull
   git checkout -b feat/<modul>
   ```
2. Commit kecil dan sering.
3. Sebelum PR: `git pull origin development`, lalu `composer ci:check`.
4. Buka PR **ke `development`**. Minimal 1 teman review, CI harus hijau.
5. `development → main` di-merge setiap akhir milestone.

**Jangan push langsung ke `main` atau `development`.**

### Aturan commit & PR (dicek CI)

- Format: `type(scope): pesan`, contoh `feat(pbb): add capaian per kalurahan`, `fix(impor): reject empty sheet`.
  Type: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `style`, `perf`, `ci`, `build`, `revert`.
- **Judul PR** juga pakai format ini (dipakai sebagai pesan commit saat squash merge).
- **Tanpa atribusi AI**: tidak ada `Co-Authored-By` dari tool AI atau footer "Generated with …". CI akan menolak.
- Jangan commit `.env`, `docs/reference/`, atau data asli BKAD (file Excel, dump).
- Boleh pakai AI assistant, dengan aturan di `AGENTS.md`. Kamu tetap bertanggung jawab atas setiap baris yang di-commit.

Pesan commit salah? Perbaiki di branch fitur: `git rebase -i origin/development` → `reword` → `git push --force-with-lease`.
