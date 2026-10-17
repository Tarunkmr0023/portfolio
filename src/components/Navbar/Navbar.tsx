import { useState, useEffect, MouseEvent } from "react";
import styles from "./Navbar.module.css";

interface NavSection {
  id: string;
  label: string;
}

const sections: NavSection[] = [
  { id: "about", label: "01 ABOUT" },
  { id: "experience", label: "02 EXPERIENCE" },
  { id: "projects", label: "03 PROJECTS" },
  { id: "contact", label: "04 CONTACT" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo("hero");
  };

  const handleNavClick = (id: string) => () => scrollTo(id);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""} ${menuOpen ? styles.menuOpen : ""}`}>
      <div className={styles.brand}>
        <a href="#" className={styles.logo} onClick={handleLogoClick}>
          <span className={styles.logoText}>TK.</span>
          <span className={styles.statusDot} aria-hidden="true" />
          <span className={styles.statusText}>SYSTEM ONLINE</span>
        </a>
      </div>

      <button
        className={styles.menuBtn}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-controls="nav-menu"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <span className={styles.menuIcon} aria-hidden="true">
          {menuOpen ? "✕" : "☰"}
        </span>
      </button>

      <ul id="nav-menu" className={styles.menu} role="navigation" aria-label="Main navigation">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              className={`${styles.navLink} ${activeSection === section.id ? styles.active : ""}`}
              onClick={handleNavClick(section.id)}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}