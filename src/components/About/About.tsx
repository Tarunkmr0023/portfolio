
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
    category: "Full-stack",
    items: ["React", "Spring Boot / Spring JPA", "Spring Security", "RESTful APIs", "Hibernate"],
  },
  {
    category: "Backend and systems",
    items: ["Java", "Microservices / Spring Cloud", "Kafka event streaming", "MongoDB / MySQL / DynamoDB", "AWS Lambda"],
  },
  {
    category: "DevOps and quality",
    items: ["Docker / Kubernetes", "Jenkins CI/CD", "Grafana / Rancher / Nginx", "JUnit / Mockito", "SonarQube"],
  },
];

const stats: Stat[] = [
  { value: "4+", label: "years of experience" },
  { value: "3", label: "companies" },
  { value: "20+", label: "technologies" },
  { value: "20+", label: "projects delivered" },
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
          <span className={styles.eyebrow}>About me</span>
          <h2 className={styles.title}>
            I like problems<br />
            <span>with moving parts.</span>
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
              <span>Tarun Kumar</span>
              <span>Software Engineer</span>
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

            <p className={styles.education}>
              <span className={styles.educationLabel}>Education</span>
              B.Tech in Computer Science Engineering, Bharati Vidyapeeth’s College of
              Engineering, New Delhi (2018–2022)
            </p>

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
