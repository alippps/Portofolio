import { FaAngular, FaGithub, FaInstagram, FaLinkedin, FaRegNewspaper, FaShieldAlt, FaPython, FaDocker, FaLaptopCode, FaCode, FaWhatsapp } from "react-icons/fa";
import { FaFilm, FaRegAddressCard } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import { GiCoffeeCup } from "react-icons/gi";
import { IoNewspaper } from "react-icons/io5";
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs,
  SiExpress, SiPostgresql, SiTailwindcss, SiDocker, SiGit, SiFigma, SiPython,
} from "react-icons/si";

export const projects = [
  {
    icon: <FaRegAddressCard size={34} color="#818cf8" />,
    title: "Landing Page",
    subtitle: "Event landing page",
    desc: "A responsive landing page built for a Coding Studio collaboration event.",
    impact: "Focused on clear event messaging, mobile layout, and fast loading.",
    tags: ["TypeScript", "CSS", "JavaScript"],
    liveLink: "https://coding-studio-landing-page.vercel.app/",
    sourceLink: "https://github.com/alippps",
    preview: "landing",
    image:"/project/studio-coding.png",
    features: ["Responsive hero section", "Event-focused call to action", "Clean section structure"],
    challenge: "Keeping the layout polished across mobile and desktop while preserving simple content flow.",
  },
  {
    icon: <MdAttachMoney size={34} color="#6ee7b7" />,
    title: "Finance App",
    subtitle: "Income and expense tracker",
    desc: "A finance tracker for recording income, expenses, and daily balance changes.",
    impact: "Designed to make personal cash flow easier to review at a glance.",
    tags: ["JavaScript", "HTML", "CSS"],
    liveLink: "https://finannce-app-three.vercel.app/",
    sourceLink: "https://github.com/alippps",
    image:"/project/finance-app.png",
    preview: "finance",
    features: ["Transaction input", "Income and expense summary", "Simple dashboard view"],
    challenge: "Making the finance summary readable without overwhelming the main interaction.",
  },
  {
    icon: <GiCoffeeCup size={34} color="#f8fafc" />,
    title: "Coffee Shop",
    subtitle: "Cafe website",
    desc: "A modern coffee shop website with product highlights and a warm browsing flow.",
    impact: "Built to present menu items and brand personality in a concise single-page experience.",
    tags: ["React", "CSS", "JavaScript"],
    liveLink: "https://come-coffe.vercel.app/",
    sourceLink: "https://github.com/alippps",
    image:"/project/come-coffe.png",
    preview: "coffee",
    features: ["Product showcase", "Responsive menu layout", "Strong visual hierarchy"],
    challenge: "Balancing a cozy brand feel with a clean and performant frontend.",
  },
  {
    icon: <FaFilm size={34} color="#93c5fd" />,
    title: "Al Movie",
    subtitle: "Movie search app",
    desc: "A mini movie app using OMDB data to search and display film information.",
    impact: "Turns raw movie data into a lightweight browsing experience.",
    tags: ["JavaScript", "CSS", "HTML"],
    liveLink: "https://mini-movie-beryl.vercel.app/",
    sourceLink: "https://github.com/alippps",
    image:"/project/al-cinema.png",
    preview: "movie",
    features: ["Movie search", "Film detail display", "API-driven content"],
    challenge: "Handling API data states while keeping the interface simple for quick lookup.",
  },

  {
    icon: <FaWhatsapp size={34} color="#25D366" />,
    title: "WhatsApp Clone",
    subtitle: "Real-time chat application",
    desc: "A full-stack chat application replicating core WhatsApp features with real-time messaging powered by WebSockets.",
    impact: "Demonstrates full-stack capability with live user presence, group chat rooms, and persistent message history.",
    tags: ["React", "Socket.io", "Node.js", "Express"],
    liveLink: "https://github.com/alippps",
    sourceLink: "https://github.com/alippps",
    preview: "whatsapp",
    image: "",
    features: ["Real-time messaging via Socket.io", "Multiple chat rooms", "Online/offline user status", "Persistent message history"],
    challenge: "Synchronizing WebSocket connection state across multiple clients and handling disconnects cleanly without message loss.",
  },
  {
    icon: <MdAttachMoney size={34} color="#34d399" />,
    title: "FinanceOS",
    subtitle: "Personal finance dashboard",
    desc: "A personal finance app for tracking daily income, expenses, budget, and account balance in one workspace — with a login system and improved UI over v1.",
    impact: "Makes personal cash flow easier to manage with a cleaner interface and user authentication.",
    tags: ["TypeScript", "CSS", "JavaScript"],
    liveLink: "https://finance-app-v2-wine.vercel.app",
    sourceLink: "https://github.com/alippps/finance-appV2",
    image: "/project/finance-appv2.png",
    preview: "financeos",
    features: ["User login and authentication", "Income and expense tracking", "Budget and balance dashboard"],
    challenge: "Redesigning the v1 layout into a more structured dashboard while adding auth without overcomplicating the flow.",
  },
];

export const certificates = [
  {
    icon: <FaRegNewspaper size={25} color="#93c5fd" />,
    title: "Lembaga Sertifikasi Profesi (LSP)",
    issuer: "Certified by the National Professional Certification Agency",
    date: "Jun 2024",
  },
  {
    icon: <FaAngular size={25} color="#ef4444" />,
    title: "Angular Course",
    issuer: "Course completion certificate",
    date: "Mar 2025",
  },

  {
    icon: <IoNewspaper size={25} color="#efdecd" />,
    title: "Colloquium",
    issuer: "Career Expolaration 2026 x Coding Studio",
    date: "Juni 2026",
  },
];

export const skills = [
  { name: "JavaScript",  icon: <SiJavascript  size={22} color="#f7df1e" /> },
  { name: "TypeScript",  icon: <SiTypescript  size={22} color="#3178c6" /> },
  { name: "React",       icon: <SiReact       size={22} color="#61dafb" /> },
  { name: "Next.js",     icon: <SiNextdotjs   size={22} color="#ffffff" /> },
  { name: "Node.js",     icon: <SiNodedotjs   size={22} color="#43a047" /> },
  { name: "Express",     icon: <SiExpress     size={22} color="#aaaaaa" /> },
  { name: "PostgreSQL",  icon: <SiPostgresql  size={22} color="#4169e1" /> },
  { name: "TailwindCSS", icon: <SiTailwindcss size={22} color="#06b6d4" /> },
  { name: "Docker",      icon: <SiDocker      size={22} color="#2496ed" /> },
  { name: "Git",         icon: <SiGit         size={22} color="#f05032" /> },
  { name: "Figma",       icon: <SiFigma       size={22} color="#f24e1e" /> },
  { name: "Python",      icon: <SiPython      size={22} color="#ffd43b" /> },
  { name: "REST API",    icon: <FaCode        size={22} color="#22d3ee" /> },
];

export const stats = [
  { number: "2+", description: "Years of Experience" },
  { number: "15+", description: "Projects Completed" },
  { number: "4", description: "Featured Case Studies" },
];

export const navLinks = ["Home", "About", "Project", "Certificate", "Contact"];

export const socials = [
  { icon: <FaGithub size={15} />, label: "GitHub", href: "https://github.com/alippps" },
  { icon: <FaLinkedin size={15} />, label: "LinkedIn", href: "https://linkedin.com/in/alif-Farhan" },
  { icon: <FaInstagram size={15} />, label: "Instagram", href: "https://instagram.com/alippps" },
];

export const contact = {
  cv: "/alif-farhan-cv.html",
};

export default projects;
