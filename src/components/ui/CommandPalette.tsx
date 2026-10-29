import { useEffect, useMemo, useRef, useState } from "react";
import profile from "../../data/profile.json";
import { toggleTheme } from "../../theme";
import styles from "./CommandPalette.module.css";

interface Command {
  id: string;
  label: string;
  hint: string;
  run: () => void;
}

export const OPEN_PALETTE_EVENT = "open-command-palette";

const goTo = (id: string) => () =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(
    () => [
      { id: "hero", label: "Go to top", hint: "Section", run: goTo("hero") },
      { id: "about", label: "About me", hint: "Section", run: goTo("about") },
      { id: "experience", label: "Experience", hint: "Section", run: goTo("experience") },
      { id: "recognition", label: "Recognition", hint: "Section", run: goTo("recognition") },
      { id: "projects", label: "Projects", hint: "Section", run: goTo("projects") },
      { id: "contact", label: "Contact", hint: "Section", run: goTo("contact") },
      {
        id: "email",
        label: "Copy email address",
        hint: "Action",
        run: () => void navigator.clipboard?.writeText(profile.social.email),
      },
      {
        id: "theme",
        label: "Toggle light / dark theme",
        hint: "Action",
        run: toggleTheme,
      },
      {
        id: "resume",
        label: "Download resume",
        hint: "Link",
        run: () => window.open("/resume.pdf", "_blank", "noopener,noreferrer"),
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "Link",
        run: () => window.open(profile.social.github, "_blank", "noopener,noreferrer"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "Link",
        run: () => window.open(profile.social.linkedin, "_blank", "noopener,noreferrer"),
      },
    ],
    []
  );

  const results = commands.filter((c) =>
    c.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  const close = () => {
    setOpen(false);
    setQuery("");
    setActive(0);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onOpen = () => setOpen(true);

    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const execute = (command?: Command) => {
    if (!command) return;
    close();
    command.run();
  };

  const onInputKey = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") close();
    else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      execute(results[active]);
    }
  };

  return (
    <div className={styles.backdrop} onMouseDown={close}>
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <input
          ref={inputRef}
          className={styles.input}
          value={query}
          placeholder="Jump to a section or run an action..."
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKey}
          aria-label="Search commands"
        />
        <ul className={styles.list} role="listbox">
          {results.length === 0 && <li className={styles.empty}>No matches</li>}
          {results.map((command, index) => (
            <li
              key={command.id}
              role="option"
              aria-selected={index === active}
              className={`${styles.item} ${index === active ? styles.active : ""}`}
              onMouseEnter={() => setActive(index)}
              onClick={() => execute(command)}
            >
              <span>{command.label}</span>
              <span className={styles.hint}>{command.hint}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
