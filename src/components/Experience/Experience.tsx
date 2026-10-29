
import { useRef, useEffect, useState, type Ref, type CSSProperties } from "react";
import skillsData from "../../data/skills.json";
import experiences from "../../data/experience.json";
import { getImageUrl } from "../../utils";
import styles from "./Experience.module.css";

interface ExperienceItem {
  role: string;
  organisation: string;
  startDate: string;
  endDate: string;
  tasks: string[];
  imageSrc: string;
}

const techStack = skillsData.map((skill) => skill.title);

interface TechStackProps {
  ref: Ref<HTMLAsideElement>;
}

const TechStack = ({ ref }: TechStackProps) => {
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const elements = itemsRef.current.filter(
      (item): item is HTMLLIElement => item !== null
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((item) => item.classList.add(styles.visible));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );

    elements.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <aside
      ref={ref}
      className={styles.stack}
      aria-label="Technology stack"
    >
      <header className={styles.stackHeader}>
        <span className={styles.stackTitle}>What I work with</span>
        <span className={styles.stackCount}>
          {techStack.length} tools
        </span>
      </header>

      <nav className={styles.stackList} aria-label="Technology list">
        <ol className={styles.techList}>
          {techStack.map((tech, idx) => (
            <li
              key={`${tech}-${idx}`}
              ref={(element) => {
                itemsRef.current[idx] = element;
              }}
              className={styles.techItem}
              style={
                { transitionDelay: `${idx * 25}ms` } as CSSProperties
              }
            >
              <span className={styles.techName}>{tech}</span>
              <span className={styles.techIndicator} aria-hidden="true" />
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
};

interface ExperienceTimelineProps {
  ref: Ref<HTMLDivElement>;
}

const ExperienceTimeline = ({ ref }: ExperienceTimelineProps) => {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div
      ref={ref}
      className={styles.timeline}
      role="list"
      aria-label="Work experience"
    >
      {experiences.map((exp: ExperienceItem, idx) => {
        const isLast = idx === experiences.length - 1;
        const isExpanded = expanded === idx;
        const tasksId = `experience-tasks-${idx}`;

        return (
          <article
            key={`${exp.organisation}-${exp.role}`}
            className={styles.experienceCard}
            role="listitem"
          >
            <div className={styles.cardConnector} aria-hidden="true">
              <span
                className={styles.connectorLine}
                style={
                  {
                    height: isLast ? 0 : "calc(100% - 24px)",
                  } as CSSProperties
                }
              />
              <span className={styles.connectorDot} />
            </div>

            <div className={styles.cardContent}>
              <header className={styles.cardHeader}>
                <div className={styles.companyInfo}>
                  <img
                    src={getImageUrl(exp.imageSrc)}
                    alt={`${exp.organisation} logo`}
                    className={styles.companyLogo}
                    loading="lazy"
                    decoding="async"
                  />

                  <div className={styles.companyMeta}>
                    <p className={styles.role}>{exp.role}</p>
                    <p className={styles.company}>{exp.organisation}</p>
                    {idx === 0 && (
                      <span className={styles.currentLabel}>Current</span>
                    )}
                  </div>
                </div>

                <p className={styles.period}>
                  <span>{exp.startDate}</span>
                  <span className={styles.dateSeparator} aria-hidden="true">
                    —
                  </span>
                  <span>{exp.endDate}</span>
                </p>
              </header>

              <button
                type="button"
                className={styles.expandBtn}
                onClick={() => setExpanded(isExpanded ? null : idx)}
                aria-expanded={isExpanded}
                aria-controls={tasksId}
              >
                <span className={styles.expandText}>
                  {isExpanded ? "Hide details" : "What I did"}
                </span>
                <span className={styles.expandIcon} aria-hidden="true">
                  {isExpanded ? "−" : "+"}
                </span>
              </button>

              <div
                id={tasksId}
                className={`${styles.tasks} ${
                  isExpanded ? styles.expanded : ""
                }`}
                aria-label={`${exp.role} responsibilities`}
                aria-hidden={!isExpanded}
              >
                <ul className={styles.taskList}>
                  {exp.tasks.map((task, taskIdx) => (
                    <li key={`${taskIdx}-${task}`} className={styles.taskItem}>
                      <span className={styles.taskBullet} aria-hidden="true" />
                      <span className={styles.taskText}>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLAsideElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      headerRef.current,
      sectionRef.current,
      stackRef.current,
      timelineRef.current,
    ].filter((element): element is Element => element !== null);

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add(styles.visible));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <header className={styles.header} ref={headerRef}>
          <span className={styles.eyebrow}>Experience</span>
          <h2 className={styles.title}>
            Where I've
            <br />
            <span>been building.</span>
          </h2>
        </header>

        <div className={styles.grid}>
          <TechStack ref={stackRef} />
          <ExperienceTimeline ref={timelineRef} />
        </div>
      </div>
    </section>
  );
}