import { RecognitionAwards } from "./components/RecognitionAwards/RecognitionAwards";
import { Navbar } from "./components/Navbar/Navbar";
import { Hero } from "./components/sections/Hero/Hero";
import { About } from "./components/About/About";
import { Experience } from "./components/Experience/Experience";
import { Projects } from "./components/Projects/Projects";
import { Contact } from "./components/Contact/Contact";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { CommandPalette } from "./components/ui/CommandPalette";
import styles from "./App.module.css";

function App() {

  return (
    <div className={styles.app}>
      <div className={styles.aurora} aria-hidden="true">
        <span className={`${styles.blob} ${styles.blobViolet}`} />
        <span className={`${styles.blob} ${styles.blobTeal}`} />
        <span className={`${styles.blob} ${styles.blobRose}`} />
        <span className={styles.grain} />
      </div>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <ScrollProgress />
      <CommandPalette />
      <main id="main" className={styles.main}>
        <Hero />
        <About />
        <Experience />
        <RecognitionAwards />
        <Projects />
        <Contact />
      </main>
      <footer className={styles.footer} role="contentinfo">
        <div className={styles.footerInner}>
          <div className={styles.footerLeft}>
            <span className={styles.brand}>TK<span className={styles.brandDot}>.</span></span>
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