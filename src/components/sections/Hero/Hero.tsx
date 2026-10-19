
import { HeroScene } from "../../three/HeroScene/HeroScene";
import profile from "../../../data/profile.json";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span className={styles.status} aria-hidden="true" />
          <span>SYSTEM ONLINE</span>
          <span className={styles.eyebrowLine} aria-hidden="true" />
          <span className={styles.eyebrowMeta}>JAVA / CLOUD / SYSTEMS</span>
        </div>

        <p className={styles.intro}>HELLO, I'M</p>

        <h1 id="hero-title" className={styles.name}>
          TARUN
          <br />
          <span>KUMAR</span>
        </h1>

        <p className={styles.title}>{profile.title}</p>
        <p className={styles.description}>{profile.tagline}</p>

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
            <span>EXPLORE MY WORK</span>
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
            MORE ABOUT ME <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className={styles.metrics} aria-label="Areas of focus">
          <div className={styles.metric}>
            <span className={styles.metricValue}>01</span>
            <span className={styles.metricLabel}>BACKEND SYSTEMS</span>
          </div>

          <span className={styles.metricDivider} aria-hidden="true" />

          <div className={styles.metric}>
            <span className={styles.metricValue}>02</span>
            <span className={styles.metricLabel}>CLOUD ENGINEERING</span>
          </div>

          <span className={styles.metricDivider} aria-hidden="true" />

          <div className={styles.metric}>
            <span className={styles.metricValue}>03</span>
            <span className={styles.metricLabel}>FULL-STACK APPS</span>
          </div>
        </div>
      </div>

      <div className={styles.scene} aria-hidden="true">
        <div className={styles.sceneLabel}>
          <span className={styles.sceneLabelDot} />
          LIVE SYSTEM MAP
        </div>

        <HeroScene />

        <div className={styles.sceneIndex}>
          FIG. 01 / ENGINEERING ECOSYSTEM
        </div>
      </div>

      <div className={styles.footer}>
        <span>© 2026 TARUN KUMAR</span>
        <span className={styles.footerCenter}>
          DESIGNED WITH PRECISION
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
          SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}