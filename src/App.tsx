import { Navbar } from "./components/Navbar/Navbar";
import { Hero } from "./components/sections/Hero/Hero";
import { About } from "./components/About/About";
import { Experience } from "./components/Experience/Experience";
import { Projects } from "./components/Projects/Projects";
import { Contact } from "./components/Contact/Contact";
import { useRef, useEffect } from "react";
import styles from "./App.module.css";

function SectionDivider({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  return (
    <div ref={ref} className={styles.sectionDivider} role="separator" aria-label={label}>
      <span className={styles.dividerLine} aria-hidden="true" />
      <span className={styles.dividerLabel}>{label}</span>
      <span className={styles.dividerLine} aria-hidden="true" />
    </div>
  );
}

function App() {

  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.main}>
        <Hero />
        <SectionDivider label="SYSTEM / 001" />
        <About />
        <SectionDivider label="SYSTEM / 002" />
        <Experience />
        <SectionDivider label="SYSTEM / 003" />
        <Projects />
        <SectionDivider label="SYSTEM / 004" />
        <Contact />
      </main>
      <footer className={styles.footer} role="contentinfo">
        <div className={styles.footerInner}>
          <div className={styles.footerLeft}>
            <span className={styles.brand}>TK.</span>
            <span className={styles.fullName}>Tarun Kumar</span>
          </div>
          <div className={styles.footerRight}>
            <span className={styles.copyright}>© 2026</span>
            <a
              href="#hero"
              className={styles.backToTop}
              aria-label="Back to top"
              onClick={(event) => {
                event.preventDefault();

                document.getElementById("hero")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              BACK TO TOP ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;