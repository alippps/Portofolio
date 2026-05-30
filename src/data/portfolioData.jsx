import { FaShoppingCart, FaCode } from "react-icons/fa"
import { FaRegAddressCard } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";

export const projects = [
  {
    icon: <FaRegAddressCard  size={40} color="#6366f1" />,
    title: "Landing Page",
    desc: "Landing Page ini, berkolaborasi dengan Coding Studio pada saat event",
    tags: ["TypeScript", "CSS", "JavaScript"],
    link: "https://coding-studio-landing-page.vercel.app/",
  },
  {
    icon: <MdAttachMoney size={40} color="306D29"/>,
    title: "Finance App",
    desc: "Aplikasi ini di rancang untuk mentracker Pemasukan dan Pengeluaran dari manapun",
    tags: ["JavaScript", "HTML", "CSS"],
    link: "finannce-app-three.vercel.app",
  },
  {
    icon: "📊",
    title: "Analytics Dashboard",
    desc: "Dashboard interaktif visualisasi data dengan chart dan laporan otomatis.",
    tags: ["React", "D3.js", "Python", "FastAPI"],
    link: "#",
  },
  {
    icon: "🎨",
    title: "Design System",
    desc: "Komponen UI library yang reusable dengan dokumentasi Storybook.",
    tags: ["React", "Storybook", "Tailwind", "TypeScript"],
    link: "#",
  },
  {
    icon: "🤖",
    title: "AI Content Generator",
    desc: "Aplikasi berbasis AI untuk membuat konten blog dan media sosial otomatis.",
    tags: ["React", "OpenAI API", "Next.js"],
    link: "#",
  },
  {
    icon: "📱",
    title: "Mobile Banking App",
    desc: "Aplikasi mobile banking dengan fitur transfer, mutasi, dan notifikasi.",
    tags: ["React Native", "Redux", "TypeScript"],
    link: "#",
  },
];

export const certificates = [
  {
    icon: "☁️",
    title: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "Jun 2024",
  },
  {
    icon: "⚛️",
    title: "React Advanced Patterns",
    issuer: "Frontend Masters",
    date: "Mar 2024",
  },
  {
    icon: "🔐",
    title: "Cybersecurity Fundamentals",
    issuer: "CompTIA Security+",
    date: "Jan 2024",
  },
  {
    icon: "🐍",
    title: "Python for Data Science",
    issuer: "Coursera – Google",
    date: "Nov 2023",
  },
  {
    icon: "🎓",
    title: "Full Stack Web Development",
    issuer: "Dicoding Indonesia",
    date: "Aug 2023",
  },
  {
    icon: "📦",
    title: "Docker & Kubernetes",
    issuer: "Linux Foundation",
    date: "May 2023",
  },
];

export const skills = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
  "Express", "PostgreSQL", "TailwindCSS",
  "Docker", "Git", "Figma", "Python", "REST API",
];

export const stats = [
  { number: "2+", description: "Tahun Pengalaman" },
  { number: "20+", description: "Proyek Selesai" },
];

export const navLinks = ["Home", "About", "Project", "Sertifikat", "Contact"];

export const socials = [
  { icon: "🐙", label: "GitHub", href: "https://github.com/username" },
  { icon: "💼", label: "LinkedIn", href: "https://linkedin.com/in/username" },
  { icon: "🐦", label: "Twitter", href: "https://twitter.com/username" },
  { icon: "📧", label: "Email", href: "mailto:Alif@email.com" },
];

export default projects