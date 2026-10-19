
import { useEffect, useRef } from "react";
import recognition from "../../data/recognition.json";
import styles from "./RecognitionAwards.module.css";

export function RecognitionAwards() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [headerRef.current, cardsRef.current].filter(
      (element): element is HTMLElement => element !== null
    );

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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="recognition"
      className={styles.section}
      ref={sectionRef}
      aria-labelledby="recognition-title"
    >
      <div className={styles.container}>
        <header className={styles.header} ref={headerRef}>
          <span className={styles.eyebrow}>03 / RECOGNITION</span>

          <h2 className={styles.title} id="recognition-title">
            WORK THAT
            <br />
            <span>MADE AN IMPACT.</span>
          </h2>

          <p className={styles.intro}>
            A few milestones that recognize the contributions, collaboration,
            and impact behind the work.
          </p>
        </header>

        <div className={styles.grid} ref={cardsRef}>
          {recognition.map((award, index) => (
            <article className={styles.card} key={award.id}>
              <div className={styles.cardTop}>
                <span className={styles.number}>
                  {award.number || String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.date}>{award.date}</span>
              </div>

              <div className={styles.cardBody}>
                <span className={styles.marker} aria-hidden="true">
                  +
                </span>

                <h3 className={styles.cardTitle}>{award.title}</h3>
                <p className={styles.organisation}>{award.organisation}</p>
                <p className={styles.description}>{award.description}</p>
              </div>

              {award.certificateUrl && (
                <div className={styles.cardFooter}>
                  <a
                    className={styles.certificateLink}
                    href={award.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${award.title} certificate (opens in a new tab)`}
                  >
                    {award.certificateLabel || "VIEW CERTIFICATE"}{" "}
                    <span aria-hidden="true">↗</span>
                  </a>

                  <span className={styles.verifiedLabel}>
                    AWARD CERTIFICATE
                  </span>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}