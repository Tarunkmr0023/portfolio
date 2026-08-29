import { useEffect, useRef } from "react";
import { getImageUrl } from "../../utils";
import styles from "./ProjectShowcase.module.css";

interface Project {
  title: string;
  imageSrc: string;
  description: string;
  skills: string[];
  source: string;
}

interface ProjectShowcaseProps {
  project: Project;
  index: number;
  total: number;
}

const getCategory = (skills: string[]): string => {
  const normalizedSkills = skills.map((skill) => skill.toLowerCase());

  const hasBackend = normalizedSkills.some((skill) =>
    ["java", "spring", "springboot", "spring boot", "microservices", "kafka"].includes(
      skill
    )
  );

  const hasFullStack = normalizedSkills.some((skill) =>
    [
      "react",
      "typescript",
      "javascript",
      "html",
      "css",
      "node",
      "node.js",
      "python",
      "django",
    ].includes(skill)
  );

  if (hasBackend && hasFullStack) return "FULL-STACK ENGINEERING";
  if (hasBackend) return "BACKEND / MICROSERVICES";
  if (hasFullStack) return "FULL-STACK WEB APP";

  return "SOFTWARE PROJECT";
};

export function ProjectShowcase({
  project,
  index,
  total,
}: ProjectShowcaseProps) {
  const { title, imageSrc, description, skills, source } = project;

  const showcaseRef = useRef<HTMLElement>(null);
  const isEven = index % 2 === 0;
  const number = String(index + 1).padStart(2, "0");
  const category = getCategory(skills);

  useEffect(() => {
    const element = showcaseRef.current;

    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      element.classList.add(styles.visible);
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
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={showcaseRef}
      className={`${styles.showcase} ${
        isEven ? styles.even : styles.odd
      }`}
      role="listitem"
    >
      <div className={styles.numberWrapper} aria-label={`Project ${number}`}>
        <span className={styles.number}>{number}</span>
        <span className={styles.total}>/{String(total).padStart(2, "0")}</span>
      </div>

      <div className={isEven ? styles.contentFirst : styles.imageFirst}>
        <div className={styles.content}>
          <div className={styles.metaRow}>
            <span className={styles.category}>{category}</span>
            <span className={styles.divider} aria-hidden="true" />
            <span className={styles.indexLabel}>PROJECT / {number}</span>
          </div>

          <h3 className={styles.projectTitle}>{title}</h3>

          <p className={styles.projectDescription}>{description}</p>

          {skills.length > 0 && (
            <ul className={styles.skillTags} aria-label="Technologies used">
              {skills.map((skill) => (
                <li key={skill}>
                  <span className={styles.skillTag}>{skill}</span>
                </li>
              ))}
            </ul>
          )}

          {source && (
            <div className={styles.actions}>
              <a
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sourceLink}
                aria-label={`View source for ${title} (opens in a new tab)`}
              >
                <span>VIEW SOURCE</span>
                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          )}
        </div>

        <figure className={styles.imageWrapper}>
          <img
            src={getImageUrl(imageSrc)}
            alt={`Preview of the ${title} project`}
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.gridOverlay} aria-hidden="true" />
          <figcaption className={styles.imageCaption}>
            <span>PROJECT PREVIEW</span>
            <span>{number} / {String(total).padStart(2, "0")}</span>
          </figcaption>
        </figure>
      </div>

      {index < total - 1 && (
        <hr className={styles.sectionDivider} aria-hidden="true" />
      )}
    </article>
  );
}
