export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tools: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  figmaUrl?: string;
}

export interface SocialLink {
  name: string;
  handle: string;
  url: string;
}

export interface PersonalInfo {
  name: string;
  nickname: string;
  initials: string;
  role: string[];
  headline: {
    prefix: string;
    nameHighlight: string;
    middle: string;
    accentHighlight: string;
  };
  learningBadge: string;
  bio: string;
  school: {
    institution: string;
    major: string;
    grade: string;
  };
  // Photo placeholder: User requested to leave it empty for now.
  // When ready, place an image in public/profile.jpg and set photoUrl: "/profile.jpg"
  photoUrl: string | null;
  skills: string[];
  interests: string[];
  stats: {
    value: number;
    suffix: string;
    label: string;
  }[];
  email: string;
  socials: SocialLink[];
  footerNote: string;
}

export const portfolioData: PersonalInfo = {
  name: "Selvano Sena A.P",
  nickname: "Vano",
  initials: "V",
  role: [
    "Software Engineer",
    "IoT Enthusiast",
    "Pelajar yang suka ngulik",
    "RPL @ SMK Telkom"
  ],
  headline: {
    prefix: "Halo, saya",
    nameHighlight: "Selvano Sena A.P",
    middle: "— Junior Software Engineer & IoT Enthusiast",
    accentHighlight: "Siswa SMK Telkom Banjarbaru"
  },
  learningBadge: "Sedang mendalami ESP32, MQTT & Web Architecture",
  bio: "Pelajar kelas 12 RPL di SMK Telkom Banjarbaru yang gemar mengeksplorasi software engineering dan IoT. Senang mengutak-atik mikrokontroler, merancang web modern, dan menciptakan solusi teknologi yang aplikatif.",
  school: {
    institution: "SMK Telkom Banjarbaru",
    major: "Rekayasa Perangkat Lunak (RPL)",
    grade: "Kelas 12"
  },
  // Photo path
  photoUrl: "/me.jpeg",
  skills: [
    "ESP32",
    "Arduino C++",
    "Node.js",
    "Python",
    "MQTT / IoT",
    "Git & GitHub",
    "REST API",
    "Figma",
    "Flutter",
    "Dart",
    "PostgreSQL",
    
  ],
  interests: [
    "project inovation IoT basis AI",
    "Home automation eksperimental",
    "Game",
    "Riset dan Inovasi Teknologi"
  ],
  stats: [
    {
      value: 32,
      suffix: "+",
      label: "Proyek & Repositori"
    },
    {
      value: 3,
      suffix: "+",
      label: "Tahun Belajar Coding"
    },
    {
      value: 219,
      suffix: "+",
      label: "Total Commit GitHub"
    }
  ],
  email: "vanoaji402@gmail.com",
  socials: [
    {
      name: "GitHub",
      handle: "@veswwaaa",
      url: "https://github.com/veswwaaa"
    },
    {
      name: "Instagram",
      handle: "as_nodt___",
      url: "https://www.instagram.com/as_nodt___/"
    },
    {
      name: "LinkedIn",
      handle: "Selvano Sena A.P",
      url: "https://linkedin.com"
    }
  ],
  footerNote: "Dibuat dengan dedikasi, kopi, dan rasa ingin tahu."
};

export const projectsData: ProjectItem[] = [
  {
    id: "agrosense-iot",
    number: "01",
    title: "AgroSense IoT Monitor",
    category: "IoT & Cloud Web",
    year: "2025",
    description: "Sistem monitoring hidroponik otomatis berbasis ESP32, sensor pH, suhu, dan TDS dengan dashboard telemetri web realtime via MQTT broker.",
    tools: ["ESP32", "C++", "MQTT", "React", "Node.js", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "#",
    githubUrl: "https://github.com"
  },
  {
    id: "telkom-rfid-gate",
    number: "02",
    title: "Smart RFID School Gate",
    category: "Hardware & Web API",
    year: "2025",
    description: "Sistem presensi cerdas gerbang sekolah menggunakan modul RFID RC522, terhubung ke REST API backend dengan sinkronisasi basis data real-time.",
    tools: ["ESP8266", "RC522", "Express.js", "PostgreSQL", "Next.js"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "#",
    githubUrl: "https://github.com"
  },
  {
    id: "ecowatt-energy",
    number: "03",
    title: "EcoWatt Power Tracker",
    category: "IoT Platform",
    year: "2024",
    description: "Alat pengukur konsumsi daya listrik per perangkat rumah tangga menggunakan sensor PZEM-004T dengan kalkulasi estimasi tarif PLN dan limit alert.",
    tools: ["ESP32", "PZEM-004T", "Firebase", "TypeScript", "Chart.js"],
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "#",
    githubUrl: "https://github.com"
  },
  {
    id: "devvault-snippets",
    number: "04",
    title: "DevVault Snippet Hub",
    category: "Web Application",
    year: "2024",
    description: "Platform arsip kode & arsitektur proyek untuk developer dengan fitur instant search, tag indexing, dan sinkronisasi GitHub Gist.",
    tools: ["TypeScript", "React", "Tailwind CSS", "Prisma", "SQLite"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "#",
    githubUrl: "https://github.com"
  },
  {
    id: "wastebot-sorter",
    number: "05",
    title: "WasteBot Autonomous Sorter",
    category: "Robotics & Prototype",
    year: "2024",
    description: "Prototipe tempat sampah cerdas otomatis dengan sensor ultrasonik proximity dan mekanisme servo pemilah logam vs non-logam.",
    tools: ["Arduino Uno", "Ultrasonic", "Inductive Sensor", "Servo C++"],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "#",
    githubUrl: "https://github.com"
  }
];
