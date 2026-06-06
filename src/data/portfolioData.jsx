import { FaShoppingCart, FaCode, FaLinkedin,FaInstagram,FaRegNewspaper,FaAngular } from "react-icons/fa"
import { FaRegAddressCard,FaGithub,FaFilm} from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import { GiCoffeeCup } from "react-icons/gi";

export const projects = [
  {
    icon: <FaRegAddressCard  size={40} color="#6366f1" />,
    title: "Landing Page",
    desc: "This Landing Page, collaborated with Coding Studio during the event",
    tags: ["TypeScript", "CSS", "JavaScript"],
    link: "https://coding-studio-landing-page.vercel.app/",
  },
  {
    icon: <MdAttachMoney size={40} color="306D29"/>,
    title: "Finance App",
    desc: "This application is designed to track Income and Expenses from anywhere.",
    tags: ["JavaScript", "HTML", "CSS"],
    link: "finannce-app-three.vercel.app",
  },
  {
    icon: <GiCoffeeCup size={40} color="FBF6F6"/>,
    title: "Coffe Shop",
    desc: "Interactive data visualization dashboard with charts and automated reports.",
    tags: ["React", "D3.js", "Python", "FastAPI"],
    link: "https://come-coffe.vercel.app/",
  },
  {
    icon: <FaFilm size={40} color="2F578A"/>,
    title: "Al Movie",
    desc: "Mini movie creat with OMDB, and just show info films",
    tags: ["JavaScript", "CSS", "HTML"],
    link: "https://mini-movie-beryl.vercel.app/",
  },
  // {
  //   icon: "🤖",
  //   title: "AI Content Generator",
  //   desc: "Aplikasi berbasis AI untuk membuat konten blog dan media sosial otomatis.",
  //   tags: ["React", "OpenAI API", "Next.js"],
  //   link: "#",
  // },
  // {
  //   icon: "📱",
  //   title: "Mobile Banking App",
  //   desc: "Aplikasi mobile banking dengan fitur transfer, mutasi, dan notifikasi.",
  //   tags: ["React Native", "Redux", "TypeScript"],
  //   link: "#",
  // },
];

export const certificates = [
  {
    icon: <FaRegNewspaper size={25} color="6984A9"/>,
    title: "Lembaga Sertifikasi Profesi (LSP)",
    issuer: "Obtain a license from the National Professional Certification Agency",
    date: "Jun 2024",
  },
  {
    icon: <FaAngular size={25} color="CE2626"/>,
    title: "Angular Course",
    issuer: "Completed the course",
    date: "Mar 2025",
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
  { number: "2+", description: "Years of Experience" },
  { number: "15+", description: "Project Completed" },
];

export const navLinks = ["Home", "About", "Project", "Sertifikat", "Contact"];

export const socials = [
  { icon: <FaGithub size={15} />, label: "GitHub", href: "https://github.com/alippps" },
  { icon: <FaLinkedin size={15} />, label: "LinkedIn", href: "https://linkedin.com/in/username" },
  { icon: <FaInstagram size={15} />, label: "Instagram", href: "https://instagram.com/username" },
  // { icon: "📧", label: "Email", href: "#" },
];

export default projects