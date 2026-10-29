
import { lazy, Suspense } from "react";
import styles from "./Hero.module.css";

const GlassScene = lazy(() =>
  import("../../three/HeroScene/GlassScene").then((m) => ({ default: m.GlassScene }))
);

const show3D =
  typeof window !== "undefined" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowMeta}>Software Engineer at Nagarro</span>
        </div>

        <h1 id="hero-title" className={styles.name}>
          Tarun
          <br />
          <span>Kumar</span>
        </h1>

        <p className={styles.description}>
          I build the backend behind banking and payment products: Java, Spring Boot and
          Kafka services that make credit decisions in real time.
        </p>

        <div className={styles.actions}>
          <a
            className={styles.cta}
            href="#projects"
            onClick={(event) => {
              event.preventDefault();
              document.getElementById("projects")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            <span>See what I've built</span>
            <span className={styles.ctaArrow} aria-hidden="true">
              ↗
            </span>
          </a>

          <a
            className={styles.secondaryCta}
            href="#about"
            onClick={(event) => {
              event.preventDefault();
              document.getElementById("about")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            More about me <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className={`${styles.metrics} ${styles.glassPanel}`} aria-label="Highlights">
          <div className={styles.metric}>
            <span className={styles.metricValue}>4+</span>
            <span className={styles.metricLabel}>years of experience</span>
          </div>

          <span className={styles.metricDivider} aria-hidden="true" />

          <div className={styles.metric}>
            <span className={styles.metricValue}>20+</span>
            <span className={styles.metricLabel}>projects delivered</span>
          </div>

          <span className={styles.metricDivider} aria-hidden="true" />

          <div className={styles.metric}>
            <span className={styles.metricValue}>20+</span>
            <span className={styles.metricLabel}>technologies used</span>
          </div>
        </div>
      </div>

      <div className={styles.scene} aria-hidden="true">
        {show3D && (
          <Suspense fallback={null}>
            <GlassScene />
          </Suspense>
        )}
      </div>

      <div className={styles.footer}>
        <span>© 2026 Tarun Kumar</span>
        <span className={styles.footerCenter}>
          Java · Spring Boot · Kafka · AWS
        </span>

        <a
          className={styles.scrollLink}
          href="#about"
          onClick={(event) => {
            event.preventDefault();
            document.getElementById("about")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          Scroll <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}