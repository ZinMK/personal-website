import { useEffect, useRef } from "react";
import "@/styles/zin-khant.css";

const BOOK_CALL_URL = "https://calendar.app.google/gjUdYkUXZkfrSSV47";

const CURRENT_WORK_TEXT =
  "I'm a PM intern at Cloudflare, working on a better local development experience — adding local log tracing and improving observability for developers.";

const workEntries = [
  {
    num: "၀၁",
    numEn: "01",
    title: "Classfinder.ai",
    year: "2025 · Search",
    description:
      "A natural-language course search engine that helps students find the right classes in plain English.",
    tags: ["React", "TypeScript", "Cloudflare Workers", "Go"],
    href: "https://classfinder.ai",
    details: [
      "Serving 70+ active users; integrated Rate My Professors data to streamline the course-selection process.",
      "Ran A/B tests on RAG vs. hybrid search algorithms to maximize relevance and overall UX.",
    ],
  },
  {
    num: "၀၂",
    numEn: "02",
    title: "YC Agentic Payments",
    year: "2025 · Winner",
    description:
      "An autonomous payments agent that placed top 10 of 14k+ applicants at Stripe's YC hackathon.",
    tags: ["Stripe API", "LLMs", "TypeScript", "x402"],
    details: [
      "Placed top 10 from 14k+ applicants building autonomous payment solutions, sponsored by Stripe.",
      "Architected an AI agent on the x402 protocol that ran conversational surveys and paid users based on feedback quality.",
    ],
  },
  {
    num: "၀၃",
    numEn: "03",
    title: "Mow Manager",
    year: "2025 · Agent",
    description:
      "A vertical AI agent that runs a real mowing business — handling billing, scheduling, and customer comms.",
    tags: ["React", "Stripe API", "SQL", "Twilio"],
    href: "https://mow-manager.web.app",
    details: [
      "Engineered a vertical AI agent managing a mowing business generating $10k/month in revenue.",
      "Integrated Stripe for automated billing and Twilio for comms, cutting administrative overhead by 95%.",
    ],
  },
  {
    num: "၀၄",
    numEn: "04",
    title: "Eureka Campus Buddy",
    year: "2024 · iOS",
    description:
      "An iOS app that brings campus social life together by organizing hangouts and events.",
    tags: ["SwiftUI", "Firebase", "iOS"],
    details: [
      "Built and launched an iOS app to facilitate campus social life through hangouts and events.",
      "Onboarded 70+ users through organic campus growth and user-centered design.",
    ],
  },
  {
    num: "၀၅",
    numEn: "05",
    title: "Tommie Compliments",
    year: "2024 · Web",
    description:
      "An anonymous compliment-sharing platform built to foster a kinder, more connected campus.",
    tags: ["React", "Node.js", "SQL"],
    details: [
      "Designed and deployed an anonymous compliment-sharing platform to foster a positive campus culture.",
      "A small experiment in using software to make people feel seen and bring a community closer.",
    ],
    last: true,
  },
];

const displayStyle = {
  fontFamily: "var(--font-display)",
  fontWeight: "var(--display-weight)" as const,
  letterSpacing: "var(--display-spacing)",
  textTransform: "var(--display-transform)" as const,
};

export const ZinKhantPortfolio = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const show = (el: HTMLElement) => {
      if (el.hasAttribute("data-in")) return;
      const siblings = el.parentElement?.querySelectorAll("[data-reveal]");
      const idx = siblings ? Array.from(siblings).indexOf(el) : 0;
      el.style.setProperty("--reveal-delay", `${Math.min(idx, 8) * 0.09}s`);
      el.setAttribute("data-in", "");
    };

    const showInView = () => {
      const vh = window.innerHeight;
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.95 && rect.bottom > 0) show(el);
      });
    };

    showInView();

    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              show(e.target as HTMLElement);
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px 10% 0px" },
      );
      els.forEach((el) => {
        if (!el.hasAttribute("data-in")) io?.observe(el);
      });
    } else {
      els.forEach(show);
    }

    const fallback = window.setTimeout(() => els.forEach(show), 1200);
    window.addEventListener("resize", showInView);

    return () => {
      io?.disconnect();
      window.clearTimeout(fallback);
      window.removeEventListener("resize", showInView);
    };
  }, []);

  return (
    <div id="zk-root" ref={rootRef} className="zk-page">
      <section
        data-screen-label="Hero"
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding:
            "clamp(48px,9vh,104px) clamp(20px,5vw,72px) clamp(40px,7vh,80px)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(28px,5vh,56px)",
        }}
      >
        <div data-reveal>
          <span style={{ fontFamily: "var(--font-my)", lineHeight: 1 }}>
            မင်္ဂလာပါ/Welcome
          </span>
        </div>

        <div data-reveal>
          <h1
            style={{
              margin: 0,
              ...displayStyle,
              fontSize: "clamp(64px, 12vw, 134px)",
              lineHeight: 0.9,
            }}
          >
            Zin Khant
          </h1>
          <p
            style={{
              margin: "10px 0 0",
              fontFamily: "var(--font-my)",
              fontSize: "clamp(18px, 2.5vw, 28px)",
              opacity: 0.5,
              lineHeight: 1.2,
            }}
          >
            ဇင်မင်းခန့်
          </p>
        </div>

        <div
          data-reveal
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(24px,5vw,72px)",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(16px,2.5vh,28px)",
              maxWidth: "62ch",
              flex: "1 1 280px",
            }}
          >
            <h2
              style={{
                margin: 0,
                ...displayStyle,
                fontSize: "clamp(28px,4.5vw,52px)",
                lineHeight: 1.04,
              }}
            >
              I like building.
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(16px,1.8vw,20px)",
                lineHeight: 1.6,
                opacity: 0.8,
              }}
            >
              If I see a problem I can fix, I will. Speak to me about in meditation,
              philosophy, music, or AI. I make music and more than anything, I want
              the things I build to connect people.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Building", "Meditation", "Philosophy", "Music", "AI"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: ".08em",
                    padding: "7px 14px",
                    border: "1px solid var(--line)",
                    borderRadius: 100,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 11,
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              flexShrink: 0,
            }}
          >
            {[
              { label: "Saint Paul, MN", color: "var(--muted)", pulse: false },
              {
                label: "Product Manager Intern · Cloudflare",
                color: "#ff5500",
                pulse: true,
              },
              { label: "Founder · Nexus AI Club", color: "var(--muted)", pulse: false },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  color: item.color,
                }}
              >
                <span
                  className={item.pulse ? "zk-pulse-dot" : undefined}
                  style={{
                    width: 8,
                    height: 8,
                    flexShrink: 0,
                    borderRadius: "50%",
                    background: item.pulse ? "var(--ink)" : "var(--muted)",
                  }}
                />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <nav
          data-reveal
          style={{
            display: "flex",
            flexDirection: "column",
            borderTop: "1px solid var(--line)",
            marginTop: "clamp(8px,2vh,20px)",
          }}
        >
          {[
            { href: "#about", num: "၀၁", label: "About", bg: "#FECB00", color: "#141413" },
            { href: "#work", num: "၀၂", label: "Work", bg: "#34B233", color: "#ffffff" },
            { href: "#contact", num: "၀၃", label: "Contact", bg: "#EA2839", color: "#ffffff" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="zk-nav-link"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "clamp(16px,2.4vh,24px) 0",
                borderBottom: "1px solid var(--line)",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <span style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                <span
                  style={{
                    fontFamily: "var(--font-my)",
                    fontSize: 13,
                    padding: "3px 9px",
                    borderRadius: 6,
                    background: item.bg,
                    color: item.color,
                  }}
                >
                  {item.num}
                </span>
                <span style={{ ...displayStyle, fontSize: "clamp(22px,3vw,34px)" }}>
                  {item.label}
                </span>
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, opacity: 0.45 }}>
                ↗
              </span>
            </a>
          ))}
        </nav>

        <div id="contact" className="zk-current-work zk-current-work-hero">
          <div className="zk-current-work-label">
            <span className="zk-current-work-dot" aria-hidden="true" />
            <span>What I&apos;m working on right now</span>
          </div>
          <p>{CURRENT_WORK_TEXT}</p>
          <a
            href={BOOK_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="zk-hover-opacity zk-current-work-cta"
          >
            Book a call with me ↗
          </a>
        </div>
      </section>

      <section
        data-screen-label="About"
        id="about"
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding:
            "clamp(32px,5vh,56px) clamp(20px,5vw,72px) clamp(40px,6vh,72px)",
          scrollMarginTop: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(32px,5vh,56px)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(24px,3vh,36px)",
            }}
          >
          <a
            data-reveal
            href="https://open.spotify.com/artist/7KC3H4mshZpBLLeG4y18sw"
            target="_blank"
            rel="noopener noreferrer"
            className="zk-hover-opacity-65"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              textDecoration: "none",
              color: "inherit",
              borderTop: "1px solid var(--line)",
              paddingTop: "clamp(20px,3vh,28px)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: ".16em",
                color: "var(--muted)",
              }}
            >
              CHECK OUT SOME OF MY TUNES
            </span>
            <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px,2vw,22px)" }}>
              Listen on Spotify ↗
            </span>
          </a>

          <iframe
            title="Zin Khant on Spotify"
            style={{
              borderRadius: 12,
              border: "1px solid var(--line)",
              width: "100%",
              height: "clamp(352px, 40vh, 480px)",
              display: "block",
            }}
            src="https://open.spotify.com/embed/artist/7KC3H4mshZpBLLeG4y18sw?utm_source=generator&theme=0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
          </div>
        </div>
      </section>

      <section
        data-screen-label="Work"
        id="work"
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding:
            "clamp(56px,9vh,112px) clamp(20px,5vw,72px) clamp(40px,6vh,72px)",
          scrollMarginTop: 24,
        }}
      >
        <div
          data-reveal
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "clamp(20px,4vh,44px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-my)", fontSize: 14, opacity: 0.5 }}>
              ၀၂
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: ".18em",
                color: "var(--muted)",
              }}
            >
              Index — Work
            </span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: ".08em",
              opacity: 0.5,
            }}
          >
            Five entries · 2024–2025
          </span>
        </div>

        {workEntries.map((entry) => (
          <article
            key={entry.title}
            data-reveal
            style={{
              borderTop: "1px solid var(--line)",
              borderBottom: entry.last ? "1px solid var(--line)" : undefined,
              padding: "clamp(26px,4vw,46px) 0",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "clamp(12px,3vw,36px)",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 16,
                  flex: 1,
                  minWidth: 240,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    opacity: 0.4,
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-my)" }}>{entry.num}</span> /{" "}
                  {entry.numEn}
                </span>
                <h3
                  style={{
                    margin: 0,
                    ...displayStyle,
                    fontSize: "clamp(26px,4.4vw,52px)",
                    lineHeight: 1.02,
                  }}
                >
                  {entry.title}
                </h3>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                  opacity: 0.5,
                  whiteSpace: "nowrap",
                }}
              >
                {entry.year}
              </span>
            </div>

            <p
              style={{
                margin: 0,
                fontSize: "clamp(15px,1.7vw,19px)",
                lineHeight: 1.55,
                maxWidth: "60ch",
                opacity: 0.72,
              }}
            >
              {entry.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: ".08em",
                    padding: "5px 11px",
                    border: "1px solid var(--line)",
                    borderRadius: 100,
                    opacity: 0.8,
                  }}
                >
                  {tag}
                </span>
              ))}
              {entry.href && (
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="zk-hover-opacity"
                  style={{
                    marginLeft: "auto",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    textDecoration: "none",
                    color: "inherit",
                    borderBottom: "1px solid currentColor",
                    paddingBottom: 2,
                    opacity: 0.85,
                  }}
                >
                  Visit ↗
                </a>
              )}
            </div>

            <details>
              <summary
                className="zk-hover-opacity"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  opacity: 0.65,
                  width: "max-content",
                }}
              >
                <span data-closed-label>Read more ↓</span>
                <span data-open-label>Show less ↑</span>
              </summary>
              <div
                data-detail
                style={{
                  paddingTop: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 11,
                  maxWidth: "62ch",
                }}
              >
                {entry.details.map((detail) => (
                  <div
                    key={detail}
                    style={{
                      display: "flex",
                      gap: 12,
                      fontSize: "clamp(14px,1.6vw,17px)",
                      lineHeight: 1.5,
                      opacity: 0.72,
                    }}
                  >
                    <span style={{ opacity: 0.45 }}>—</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </details>
          </article>
        ))}
      </section>

      <section
        data-screen-label="Contact"
        id="reach"
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "clamp(72px,12vh,150px) clamp(20px,5vw,72px)",
          scrollMarginTop: 24,
          display: "flex",
          flexDirection: "column",
          gap: "clamp(28px,5vh,52px)",
        }}
      >
        <div data-reveal style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{ fontFamily: "var(--font-my)", fontSize: 14, opacity: 0.5 }}>
            ၀၃
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: ".18em",
              color: "var(--muted)",
            }}
          >
            Index — Contact
          </span>
        </div>

        <h2
          data-reveal
          style={{
            margin: 0,
            ...displayStyle,
            fontSize: "clamp(44px,9vw,128px)",
            lineHeight: 0.95,
          }}
        >
          hit my jack at
        </h2>

        <a
          data-reveal
          href="mailto:shanunapal@gmail.com"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(20px,3.4vw,36px)",
            color: "inherit",
            borderBottom: "2px solid currentColor",
            paddingBottom: 4,
            alignSelf: "flex-start",
            textDecoration: "none",
          }}
        >
          shanunapal@gmail.com
        </a>

        <div
          data-reveal
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(16px,3vw,40px)",
            borderTop: "1px solid var(--line)",
            paddingTop: "clamp(24px,3vh,36px)",
          }}
        >
          {[
            {
              label: "LinkedIn ↗",
              href: "https://www.linkedin.com/in/zin-khant-993055216",
            },
            { label: "X / Twitter ↗", href: "https://x.com/zinnMK_" },
            {
              label: "Spotify ↗",
              href: "https://open.spotify.com/artist/7KC3H4mshZpBLLeG4y18sw",
            },
            { label: "Email ↗", href: "mailto:shanunapal@gmail.com" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="zk-hover-opacity"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                textTransform: "uppercase",
                letterSpacing: ".08em",
                color: "inherit",
                textDecoration: "none",
                opacity: 0.7,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <footer
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "center",
          justifyContent: "space-between",
          padding: "clamp(28px,4vh,48px) clamp(20px,5vw,72px)",
          borderTop: "1px solid var(--line)",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: ".04em",
          color: "var(--muted)",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-my)", fontSize: 13 }}>
            ကျေးဇူးတင်ပါတယ်
          </span>
          <span>· Thank you</span>
        </span>
        <span>© 2026 Zin Khant — Saint Paul, MN</span>
        <a
          href="#zk-root"
          className="zk-hover-ink"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Back to top ↑
        </a>
      </footer>
    </div>
  );
};
