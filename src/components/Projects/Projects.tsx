
import { useRef, useEffect } from "react";
import projects from "../../data/projects.json";
import { ProjectShowcase } from "./ProjectShowcase";
import styles from "./Projects.module.css";

interface Project {
  title: string;
  imageSrc: string;
  description: string;
  skills: string[];
  source: string;
}

export function Projects() {
  const sectionRef = useRef<HTMLSectionElement>(null);
  const headerRef = useRef<HTMLHeaderElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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
      sectionRef.current,
      headerRef.current,
      listRef.current,
    ].filter((el): el is Element => el !== null);

    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section id="projects" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <header className={styles.header} ref={headerRef}>
          <span className={styles.eyebrow}>04 / SELECTED WORK</span>
          <h2 className={styles.title}>
            THINGS I'VE
            <br />
            <span>BUILT.</span>
          </h2>
        </header>

        <div
          className={styles.showcaseList}
          ref={listRef}
          role="list"
          aria-label="Projects"
        >
          {projects.map((project: Project, idx) => (
            <ProjectShowcase
              key={project.title}
              project={project}
              index={idx}
              total={projects.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}