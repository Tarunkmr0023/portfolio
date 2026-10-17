
import { useRef, useEffect, HTMLAttributes } from "react";
import { getImageUrl } from "../../utils";
import profile from "../../data/profile.json";
import styles from "./About.module.css";

interface Capability {
  category: string;
  items: string[];
}

interface Stat {
  value: string;
  label: string;
}

const capabilities: Capability[] = [
  {
    category: "FULL-STACK ENGINEERING",
    items: ["React / TypeScript", "Node.js / Express", "Spring / Spring Boot", "REST / GraphQL", "HTML5 / CSS3 / JS"],
  },
  {
    category: "BACKEND & SYSTEMS",
    items: ["Java / JVM Ecosystem", "Microservices Architecture", "Kafka Event Streaming", "MongoDB / MySQL", "Docker / Kubernetes"],
  },
  {
    category: "ENGINEERING MINDSET",
    items: ["System Design & Scalability", "Clean Code / DDD / TDD", "CI/CD / Jenkins", "AWS Cloud Infrastructure", "Problem Decomposition"],
  },
];

const stats: Stat[] = [
  { value: "4+", label: "YEARS EXPERIENCE" },
  { value: "3", label: "COMPANIES" },
  { value: "20+", label: "TECHNOLOGIES" },
  { value: "10+", label: "PROJECTS SHIPPED" },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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

    const elements = [
      headerRef.current,
      sectionRef.current,
      imageRef.current,
      capabilitiesRef.current,
      statsRef.current,
    ].filter((el): el is Element => el !== null);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <header className={styles.header} ref={headerRef}>
          <span className={styles.eyebrow}>01 / ENGINEERING PROFILE</span>
          <h2 className={styles.title}>
            BUILT TO SOLVE<br />
            <span>COMPLEX PROBLEMS.</span>
          </h2>
        </header>

        <div className={styles.grid}>
          <figure className={styles.imageWrapper} ref={imageRef}>
            <img
              src={getImageUrl("about/aboutImage.png")}
              alt="Tarun Kumar — Software Engineer at workstation"
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.imageOverlay} aria-hidden="true" />
            <figcaption className={styles.imageCaption}>
              <span>PORTRAIT / 001</span>
              <span>ENGINEERING PROFILE</span>
            </figcaption>
          </figure>

          <div className={styles.content}>
            <div className={styles.capabilities} ref={capabilitiesRef}>
              {capabilities.map((cap, idx) => (
                <article
                  key={cap.category}
                  className={styles.capabilityCard}
                  style={{ transitionDelay: `${idx * 80}ms` } as HTMLAttributes<HTMLElement>["style"]}
                >
                  <span className={styles.capabilityLabel}>{cap.category}</span>
                  <ul className={styles.capabilityList}>
                    {cap.items.map((item, i) => (
                      <li key={i} className={styles.capabilityItem}>
                        <span className={styles.bullet} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <p className={styles.philosophy}>{profile.description}</p>

            <dl className={styles.stats} ref={statsRef} role="list">
              {stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`${styles.stat} ${idx < stats.length - 1 ? styles.statWithDivider : ""}`}
                  style={{ transitionDelay: `${idx * 100}ms` } as HTMLAttributes<HTMLDivElement>["style"]}
                  role="listitem"
                >
                  <dt className={styles.statValue}>{stat.value}</dt>
                  <dd className={styles.statLabel}>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
