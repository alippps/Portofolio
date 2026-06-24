import "./styles/globals.css";

import Navbar  from "./components/Navbar";
import Footer  from "./components/Footer";
import Home    from "./pages/Home";
import About   from "./pages/About";
import Project from "./pages/Project";
import Certificate from "./pages/Certificate";
import Contact from "./pages/Contact";

import { useScrollReveal, useActiveSection } from "./hooks/useScroll";
import { navLinks } from "./data/portfolioData";

const SECTION_IDS = navLinks.map((n) => n.toLowerCase());

export default function App() {
  useScrollReveal();
  const { scrolled, activeSection } = useActiveSection(SECTION_IDS);

  return (
    <>
      <Navbar
        scrolled={scrolled}
        activeSection={activeSection}
        navLinks={navLinks}
      />

      <main>
        <Home />
        <About />
        <Project />
        <Certificate />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
