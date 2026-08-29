
import { useRef, useEffect, useState, HTMLAttributes, MouseEvent } from "react";
import profile from "../../data/profile.json";
import styles from "./Contact.module.css";

interface ContactItem {
  label: string;
  value: string;
  href: string;
  icon: string;
}

const contacts: ContactItem[] = [
  {
    label: "EMAIL",
    value: profile.social.email,
    href: `mailto:${profile.social.email}`,
    icon: "✉",
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/tarun0023",
    href: profile.social.linkedin,
    icon: "🔗",
  },
  {
    label: "GITHUB",
    value: "github.com/Tarunkmr0023",
    href: profile.social.github,
    icon: "⌘",
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

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
      terminalRef.current,
    ].filter((el): el is Element => el !== null);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCursorVisible((visible) => !visible);
    }, 530);

    return () => window.clearInterval(interval);
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(label);
        window.setTimeout(() => setCopied(null), 2000);
      })
      .catch(() => {
        // The link remains usable if clipboard access is unavailable.
      });
  };

  const handleContactClick = (contact: ContactItem) => {
    if (contact.label === "EMAIL") return;
    copyToClipboard(contact.value, contact.label);
  };

  return (
    <section id="contact" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <header className={styles.header} ref={headerRef}>
          <span className={styles.eyebrow}>04 / CONNECTION</span>
          <h2 className={styles.title}>
            LET'S BUILD<br />
            <span>SOMETHING USEFUL.</span>
          </h2>
        </header>

        <div className={styles.terminalWrapper} ref={terminalRef}>
          <div className={styles.terminal}>
            <header className={styles.terminalHeader}>
              <div className={styles.windowControls}>
                <span className={styles.control} aria-hidden="true" />
                <span className={styles.control} aria-hidden="true" />
                <span className={styles.control} aria-hidden="true" />
              </div>

              <div className={styles.terminalTitle}>
                <span className={styles.promptIcon} aria-hidden="true">
                  {contacts[0].icon}
                </span>
                <span className={styles.username}>contact@tarun</span>
                <span className={styles.separator}>~</span>
                <span className={styles.status}>ONLINE</span>
              </div>
            </header>

            <div className={styles.terminalBody}>
              <div className={styles.commandLine}>
                <span className={styles.prompt}>$</span>
                <span className={styles.command}> ./connect --with-tarun</span>
              </div>

              <div className={styles.output} role="list" aria-label="Contact methods">
                {contacts.map((contact, idx) => (
                  <div
                    key={contact.label}
                    className={styles.contactRow}
                    style={{ transitionDelay: `${idx * 80}ms` } as HTMLAttributes<HTMLDivElement>["style"]}
                    role="listitem"
                  >
                    <span className={styles.contactIcon} aria-hidden="true">
                      {contact.icon}
                    </span>

                    <span className={styles.contactLabel}>{contact.label}</span>

                    <a
                      href={contact.href}
                      target={contact.label === "EMAIL" ? undefined : "_blank"}
                      rel={contact.label === "EMAIL" ? undefined : "noopener noreferrer"}
                      className={styles.contactValue}
                      onClick={() => handleContactClick(contact)}
                    >
                      {contact.value}
                      <span
                        className={`${styles.copyIcon} ${copied === contact.label ? styles.copied : ""}`}
                        aria-hidden="true"
                      >
                        {copied === contact.label ? "✓" : "↗"}
                      </span>
                    </a>
                  </div>
                ))}
              </div>

              <div className={styles.readyLine}>
                <span className={styles.prompt}>$</span>
                <span className={styles.readyText}> ready when you are</span>
                <span
                  className={`${styles.cursor} ${cursorVisible ? styles.cursorVisible : ""}`}
                  aria-hidden="true"
                >
                  _
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
