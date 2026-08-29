import { useRef, useEffect, useState, MouseEvent } from "react";
import { getImageUrl } from "../../utils";
import styles from "./ProjectCard.module.css";

interface Project {
  title: string;
  imageSrc: string;
  description: string;
  skills: string[];
  source: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
}

export function ProjectCard({ project, index, total }: ProjectCardProps) {
  const { title, imageSrc, description, skills, source } = project;
  const cardRef = useRef<HTMLArticleElement>(null);
  const [hovered, setHovered] = useState(false);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => cardRef.current && observer.unobserve(cardRef.current);
  }, []);

  const number = String(index).padStart(2, "0");

  const getCategory = (skillList: string[]): string => {
    const hasJava = skillList.some((s) => ["Java", "Spring", "SpringBoot"].includes(s));
    const hasWeb = skillList.some((s) =>
      ["HTML", "CSS", "JavaScript", "Node", "Python", "Django"].includes(s)
    );
    if (hasJava) return "BACKEND / MICROSERVICES";
    if (hasWeb) return "FULL-STACK WEB APP";
    return "SOFTWARE PROJECT";
  };

  const category = getCategory(skills);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <article
      ref={cardRef}
      className={`${styles.card} ${hovered ? styles.hovered : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="listitem"
    >
      <div className={styles.numberWrapper}>
        <span className={styles.number}>{number}</span>
        <span className={styles.total}>/{total}</span>
      </div>

      <div className={styles.imageWrapper}>
        <img
          src={getImageUrl(imageSrc)}
          alt={`Screenshot of ${title}`}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.gridOverlay} aria-hidden="true" />
        <div className={styles.categoryBadge}>{category}</div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.projectTitle}>{title}</h3>
        <p className={styles.projectDescription}>{description}</p>

        <ul className={styles.skillTags} aria-label="Technologies used">
          {skills.map((skill) => (
            <li key={skill}>
              <span className={styles.skillTag}>{skill}</span>
            </li>
          ))}
        </ul>

        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.sourceLink}
        >
          <span>VIEW SOURCE</span>
          <span className={styles.arrow} aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}