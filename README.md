# Portofolio Pribadi — Selvano Sena A.P

Website portofolio pribadi bergaya **editorial-brutalist yang hangat** untuk **Selvano Sena A.P**, pelajar Rekayasa Perangkat Lunak (RPL) Kelas 12 di **SMK Telkom Banjarbaru**, dengan fokus **Software Engineer & IoT Enthusiast**.

---

## ⚡ Fitur Utama & Desain

- **Desain Editorial-Brutalist**: Tipografi display besar, grid terstruktur, garis pemisah 1px yang bersih, dan warna aksen tunggal yang tegas.
- **Warna Aksen & Mode Gelap**:
  - Light mode utama (kertas krem `#F2EEE6`) & Dark mode (`#0E0E0E`).
  - Dilengkapi pemilih warna aksen (Oranye `#FF4D1C`, Lime `#B8E817`, Kobalt `#3D5AFE`).
- **Smooth Scroll & Animasi Mulus**: Didukung oleh **Lenis** dan **Framer Motion** (60 FPS, menghormati `prefers-reduced-motion`).
- **Mikro-Interaksi**:
  - Typewriter effect pada peran/keahlian.
  - Floating image preview yang mengikuti kursor pada tabel proyek.
  - Modal detail proyek dengan daftar tools & link demo/GitHub.
  - Asymmetric Bento Grid pada bagian Tentang Saya dengan counter statistik angka animasi.
  - Custom fluid cursor (otomatis nonaktif di layar sentuh).
  - Tombol salin email instan dengan toast notification & confetti burst.
  - Preloader minimalis dengan indikator persen 0–100%.

---

## 📁 Struktur Direktori

```
portofolio/
├── public/                 # Aset publik statis (foto pribadi, favicon, dsb.)
│   └── profile.jpg         # (Tempat kamu menaruh foto diri)
├── src/
│   ├── components/         # Komponen UI
│   │   ├── animations/     # Reusable animations (Typewriter, SplitText, Reveal, Counter, Magnetic)
│   │   ├── Navbar.tsx      # Navbar sticky dengan sembunyi saat scroll turun
│   │   ├── Hero.tsx        # Hero section dengan tipografi display
│   │   ├── Projects.tsx    # Tabel arsip proyek (Hover cursor preview)
│   │   ├── ProjectModal.tsx# Modal pop-up detail proyek
│   │   ├── About.tsx       # Bento grid tentang diri, sekolah, skills, hobi
│   │   ├── Contact.tsx     # Section kontak raksasa & salin email
│   │   ├── CustomCursor.tsx# Kursor interaktif
│   │   ├── Preloader.tsx   # Animasi loading pembuka
│   │   └── Toast.tsx       # Notifikasi toast saat email disalin
│   ├── data.ts             # SATU TEMPAT UNTUK SEMUA DATA (Biodata, Proyek, Link)
│   ├── index.css           # Design tokens, variabel warna, & Tailwind CSS
│   ├── App.tsx             # Root layout & setup Lenis smooth scroll
│   └── main.tsx            # Entry point React
└── package.json
```

---

## 🛠️ Cara Mengubah Isi Data (Sangat Mudah!)

Semua teks, proyek, bio, sekolah, dan link sosial media tersimpan di **satu file**:
👉 [`src/data.ts`](file:///c:/Users/USER/portofolio/src/data.ts)

### 1. Menambahkan Foto Diri Kamu:
Sesuai permintaan, area foto saat ini disiapkan dalam keadaan placeholder yang rapi. Untuk memasang fotomu:
1. Simpan foto kamu ke dalam folder `public/` dengan nama file `profile.jpg` (contoh path: `public/profile.jpg`).
2. Buka [`src/data.ts`](file:///c:/Users/USER/portofolio/src/data.ts) lalu ubah:
   ```ts
   photoUrl: "/profile.jpg",
   ```
*(Foto otomatis akan tampil dengan efek grayscale yang menjadi berwarna saat di-hover).*

### 2. Mengubah Biodata & Kontak:
Cukup edit bagian `portfolioData` di [`src/data.ts`](file:///c:/Users/USER/portofolio/src/data.ts):
```ts
export const portfolioData: PersonalInfo = {
  name: "Selvano Sena A.P",
  nickname: "Vano",
  email: "selvanosena@gmail.com",
  // sesuaikan link sosial media:
  socials: [
    { name: "GitHub", handle: "@selvanosena", url: "https://github.com/username-kamu" },
    { name: "Instagram", handle: "@selvano_sena", url: "https://instagram.com/username-kamu" },
    { name: "LinkedIn", handle: "Selvano Sena A.P", url: "https://linkedin.com/in/username-kamu" },
  ]
  ...
}
```

### 3. Mengubah atau Menambah Proyek:
Edit daftar `projectsData` di [`src/data.ts`](file:///c:/Users/USER/portofolio/src/data.ts):
```ts
{
  id: "agrosense-iot",
  number: "01",
  title: "AgroSense IoT Monitor",
  category: "IoT & Cloud Web",
  year: "2025",
  description: "Sistem monitoring hidroponik otomatis berbasis ESP32...",
  tools: ["ESP32", "C++", "MQTT", "React", "Node.js"],
  image: "https://...",
  demoUrl: "https://...",
  githubUrl: "https://github.com/..."
}
```

---

## 🚀 Menjalankan di Komputer Lokal

1. Buka terminal di folder proyek:
   ```bash
   npm install
   ```
2. Jalankan server lokal:
   ```bash
   npm run dev
   ```
3. Buka browser di [http://localhost:5173](http://localhost:5173).

---

## 🌐 Cara Deploy Gratis ke Internet

### Opsi 1: Vercel (Paling Direkomendasikan & Termudah)
1. Upload folder ini ke repository akun **GitHub** kamu.
2. Buka [vercel.com](https://vercel.com) dan login dengan akun GitHub kamu.
3. Klik tombol **"Add New Project"** lalu pilih repository portofolio ini.
4. Framework Preset akan otomatis terdeteksi sebagai **Vite**.
5. Klik **"Deploy"**! Dalam ~30 detik websitemu sudah aktif dengan domain gratis `*.vercel.app`.

### Opsi 2: Netlify
1. Buka [netlify.com](https://netlify.com) dan login.
2. Drag-and-drop folder `dist/` (setelah menjalankan `npm run build`), atau hubungkan langsung dengan GitHub kamu.
3. Build command: `npm run build`, Publish directory: `dist`.
