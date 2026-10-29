
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
          <span className={styles.eyebrow}>Contact</span>
          <h2 className={styles.title}>
            Let's build<br />
            <span>something useful.</span>
          </h2>
        </header>

        <div className={styles.cards} ref={terminalRef} role="list" aria-label="Contact methods">
          {contacts.map((contact, idx) => (
            <a
              key={contact.label}
              role="listitem"
              href={contact.href}
              target={contact.label === "EMAIL" ? undefined : "_blank"}
              rel={contact.label === "EMAIL" ? undefined : "noopener noreferrer"}
              className={styles.card}
              style={{ transitionDelay: `${idx * 90}ms` } as HTMLAttributes<HTMLAnchorElement>["style"]}
              onClick={() => handleContactClick(contact)}
            >
              <span className={styles.cardIcon} aria-hidden="true">
                {contact.icon}
              </span>
              <span className={styles.cardLabel}>{contact.label}</span>
              <span className={styles.cardValue}>{contact.value}</span>
              <span className={styles.cardAction} aria-live="polite">
                {contact.label === "EMAIL"
                  ? "Send an email"
                  : copied === contact.label
                    ? "Copied to clipboard"
                    : "Open and copy link"}
              </span>
            </a>
          ))}
        </div>

        <a className={styles.resume} href="/resume.pdf" download>
          Download resume <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
