import { useEffect, useRef, useState } from "react";
import "@/styles/zin-khant.css";

const workEntries = [
  {
    num: "၀၁",
    numEn: "01",
    title: "Classfinder.ai",
    year: "2025 · Search",
    description:
      "A natural-language course search engine serving 70+ active users, with Rate My Professors data built in and A/B-tested RAG vs. hybrid search for maximum relevance.",
    tags: ["React", "TypeScript", "Cloudflare Workers", "Go"],
    href: "https://classfinder.ai",
  },
  {
    num: "၀၂",
    numEn: "02",
    title: "YC Agentic Payments",
    year: "2025 · Winner",
    description:
      "An autonomous payments agent that placed top 10 of 14k+ applicants at Stripe's YC hackathon — an x402 AI agent that ran conversational surveys and paid users based on feedback quality.",
    tags: ["Stripe API", "LLMs", "TypeScript", "x402"],
  },
  {
    num: "၀၃",
    numEn: "03",
    title: "Mow Manager",
    year: "2025 · Agent",
    description:
      "A vertical AI agent running a real $10k/month mowing business — Stripe billing and Twilio comms cut administrative overhead by 95%.",
    tags: ["React", "Stripe API", "SQL", "Twilio"],
    href: "https://mow-manager.web.app",
  },
  {
    num: "၀၄",
    numEn: "04",
    title: "Eureka Campus Buddy",
    year: "2024 · iOS",
    description:
      "An iOS app bringing campus social life together through hangouts and events, onboarded 70+ users through organic growth.",
    tags: ["SwiftUI", "Firebase", "iOS"],
  },
  {
    num: "၀၅",
    numEn: "05",
    title: "Tommie Compliments",
    year: "2024 · Web",
    description:
      "An anonymous compliment-sharing platform fostering a kinder, more connected campus — a small experiment in making people feel seen.",
    tags: ["React", "Node.js", "SQL"],
    last: true,
  },
];

const experienceEntries: {
  title: string;
  org: string;
  location: string;
  period: string;
  details: string[];
  blog?: string;
  last?: boolean;
}[] = [
  {
    title: "Product Manager Intern",
    org: "Cloudflare, Workers Observability",
    location: "Austin, TX",
    period: "June 2026 – Aug. 2026",
    blog: "https://blog.cloudflare.com/local-tracing/",
    details: [
      "Shipped automatic OpenTelemetry tracing in local dev so developers can debug Workers without deploying.",
      "Set an agent-first direction: an API letting AI coding agents query traces to find and fix bugs locally.",
      "Ran 15+ customer research interviews with enterprise users including OpenAI and Contentful.",
      "Led design and launch of a new Durable Objects UI for faster error triage.",
      "Co-authored the launch blog post and docs, iterating on developer feedback.",
    ],
  },
  {
    title: "Technical Product Manager Intern",
    org: "Custom AI Studio",
    location: "Saint Paul, MN",
    period: "Dec 2024 – Feb 2025",
    details: [
      "Technical PM for 3 engineering interns, delivering a macOS MVP on schedule.",
      "Shipped a DeepGram API integration that saved users 10 hours of manual work weekly.",
    ],
  },
  {
    title: "Software and Cloud Intern",
    org: "University of St. Thomas",
    location: "Saint Paul, MN",
    period: "Oct 2024 – Present",
    details: [
      "Built reusable components, cutting feature implementation time by 60%.",
      "Added CI/CD pipelines, reducing production deploy time from 1 hour to 15 minutes.",
    ],
  },
  {
    title: "Founder & President",
    org: "Nexus AI Club",
    location: "Saint Paul, MN",
    period: "June 2023 – Present",
    details: [
      "Founded the university's first AI organization, growing 50+ members.",
      "Ran the campus's first 24-hour AI hackathon sponsored by Anthropic, managing $6k in prizes.",
    ],
  },
  {
    title: "Committee Member",
    org: "Aquinas AI Technical Committee, University of St. Thomas",
    location: "Saint Paul, MN",
    period: "",
    details: [
      "Guide campus-wide implementation of Aquinas AI.",
    ],
  },
];

const displayStyle = {
  fontFamily: "var(--font-display)",
  fontWeight: "var(--display-weight)" as const,
  letterSpacing: "var(--display-spacing)",
  textTransform: "var(--display-transform)" as const,
};

const NAV_ITEMS = [
  { id: "home", label: "home" },
  { id: "work", label: "work" },
  { id: "projects", label: "projects" },
  { id: "reach", label: "contact" },
];

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const XIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const ZinKhantPortfolio = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("home");

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

    // Active-section tracking for the sidebar
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter((el): el is HTMLElement => Boolean(el));

    let sectionIo: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window && sections.length) {
      sectionIo = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible) setActiveSection(visible.target.id);
        },
        { threshold: [0.15, 0.4], rootMargin: "-10% 0px -30% 0px" },
      );
      sections.forEach((el) => sectionIo?.observe(el));
    }

    return () => {
      io?.disconnect();
      sectionIo?.disconnect();
      window.clearTimeout(fallback);
      window.removeEventListener("resize", showInView);
    };
  }, []);

  return (
    <div id="zk-root" ref={rootRef} className="zk-page">
      <div className="zk-layout">
        <aside className="zk-sidebar">
          <nav aria-label="Site">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="zk-side-link"
                {...(activeSection === item.id ? { "data-active": "" } : {})}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="zk-side-status">
            <span className="zk-status-row">
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--muted)",
                  flexShrink: 0,
                }}
              />
              Saint Paul, MN
            </span>
            <span className="zk-status-row">
              <span className="zk-pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff5500", flexShrink: 0 }} />
              PM Intern · Cloudflare
            </span>
          </div>
        </aside>

        <main className="zk-content">
          <section
            id="home"
            style={{
              padding:
                "clamp(36px,6vh,64px) clamp(24px,5vw,64px) clamp(28px,4vh,48px)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(16px,3vh,28px)",
            }}
          >
            <div data-reveal>
              <h1
                style={{
                  margin: 0,
                  ...displayStyle,
                  fontSize: "clamp(40px, 6vw, 68px)",
                  lineHeight: 0.95,
                }}
              >
                Zin Khant
              </h1>
              <div style={{ display: "flex", gap: 18, marginTop: 18 }}>
                <a
                  href="https://www.linkedin.com/in/zin-khant-993055216"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="zk-hover-ink"
                  style={{ color: "var(--muted)" }}
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://x.com/zinnMK_"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="zk-hover-ink"
                  style={{ color: "var(--muted)" }}
                >
                  <XIcon />
                </a>
                <a
                  href="mailto:khan4152@stthomas.edu"
                  aria-label="Email"
                  className="zk-hover-ink"
                  style={{ color: "var(--muted)" }}
                >
                  <MailIcon />
                </a>
              </div>
            </div>

            <div data-reveal style={{ maxWidth: "62ch" }}>
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
            </div>
          </section>

          <section
            id="about"
            style={{
              padding:
                "clamp(24px,4vh,40px) clamp(24px,5vw,64px) clamp(24px,4vh,40px)",
              scrollMarginTop: 24,
            }}
          >
            <div data-reveal>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: ".16em",
                  color: "var(--muted)",
                }}
              >
                My music
              </span>

              <iframe
                data-testid="embed-iframe"
                title="Zin Khant on Spotify"
                style={{
                  borderRadius: 12,
                  width: "100%",
                  height: 352,
                  display: "block",
                  marginTop: 20,
                }}
                src="https://open.spotify.com/embed/artist/7KC3H4mshZpBLLeG4y18sw?utm_source=generator&theme=0&si=eaf0addcfa9948db"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </section>

          <section
            id="work"
            style={{
              padding:
                "clamp(36px,6vh,64px) clamp(24px,5vw,64px) clamp(24px,4vh,40px)",
              scrollMarginTop: 24,
              display: "flex",
              flexDirection: "column",
              gap: "clamp(14px,2.5vh,24px)",
            }}
          >
            <div
              data-reveal
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: ".18em",
                color: "var(--muted)",
                marginBottom: 12,
              }}
            >
              Work
            </div>

            <div style={{ borderTop: "1px solid var(--line)" }} />

            <div className="zk-work-scroll">
              {experienceEntries.map((job, i) => (
              <article
                key={`${job.title}-${job.org}`}
                data-reveal
                style={{
                  borderTop:
                    i === 0 ? undefined : "1px solid var(--line)",
                  borderBottom:
                    i === experienceEntries.length - 1
                      ? "1px solid var(--line)"
                      : undefined,
                  padding: "clamp(16px,2.5vw,24px) 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
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
                  <div style={{ minWidth: 240, flex: 1 }}>
                    <h3
                      style={{
                        margin: 0,
                        ...displayStyle,
                        fontSize: "clamp(24px,3.2vw,36px)",
                        lineHeight: 1.05,
                      }}
                    >
                      {job.title}
                    </h3>
                    <p
                      style={{
                        margin: "8px 0 0",
                        fontFamily: "var(--font-mono)",
                        fontSize: 13,
                        color: "var(--muted)",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        flexWrap: "wrap",
                      }}
                    >
                      <span>{job.org}</span>
                      {job.blog && (
                        <>
                          <span style={{ opacity: 0.4 }}>|</span>
                          <a
                            href={job.blog}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#ff5500",
                              textDecoration: "none",
                              borderBottom: "1px solid currentColor",
                              paddingBottom: 1,
                            }}
                          >
                            Read Blog
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: ".08em",
                      opacity: 0.5,
                      whiteSpace: "nowrap",
                      textAlign: "right",
                    }}
                  >
                    <div>{job.location}</div>
                    {job.period && <div style={{ marginTop: 6 }}>{job.period}</div>}
                  </div>
                </div>
              </article>
              ))}
            </div>
          </section>

          <section
            id="projects"
            style={{
              padding:
                "clamp(36px,6vh,64px) clamp(24px,5vw,64px) clamp(24px,4vh,40px)",
              scrollMarginTop: 24,
            }}
          >
            <div
              data-reveal
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: ".18em",
                color: "var(--muted)",
                marginBottom: 12,
              }}
            >
              Projects
            </div>

            <div style={{ borderTop: "1px solid var(--line)" }} />

            <div className="zk-work-scroll">
              {workEntries.map((entry) => (
                <article
                key={entry.title}
                data-reveal
                style={{
                  borderTop: "1px solid var(--line)",
                  borderBottom: entry.last ? "1px solid var(--line)" : undefined,
                  padding: "clamp(20px,3vw,32px) 0",
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
                      flex: 1,
                      minWidth: 240,
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        ...displayStyle,
                        fontSize: "clamp(24px,3.2vw,36px)",
                        lineHeight: 1.05,
                      }}
                    >
                      {entry.href ? (
                        <a
                          href={entry.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="zk-hover-ink"
                          style={{
                            color: "inherit",
                            textDecoration: "underline",
                            textDecorationThickness: "1px",
                            textUnderlineOffset: "6px",
                            textDecorationColor: "var(--line)",
                          }}
                        >
                          {entry.title}
                        </a>
                      ) : (
                        entry.title
                      )}
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
              </article>
              ))}
            </div>
          </section>

          <section
            id="reach"
            style={{
              padding: "clamp(40px,7vh,88px) clamp(24px,5vw,64px)",
              scrollMarginTop: 24,
              display: "flex",
              flexDirection: "column",
              gap: "clamp(18px,3.5vh,32px)",
            }}
          >
            <div
              data-reveal
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: ".18em",
                color: "var(--muted)",
              }}
            >
              Contact
            </div>

            <a
              data-reveal
              href="mailto:khan4152@stthomas.edu"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(18px,2.6vw,26px)",
                color: "inherit",
                borderBottom: "2px solid currentColor",
                paddingBottom: 4,
                alignSelf: "flex-start",
                textDecoration: "none",
              }}
            >
              khan4152@stthomas.edu
            </a>
          </section>

          <footer
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignItems: "center",
              justifyContent: "space-between",
              padding: "clamp(20px,3vh,32px) clamp(24px,5vw,64px)",
              borderTop: "1px solid var(--line)",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: ".04em",
              color: "var(--muted)",
            }}
          >
            <span>© 2026 Zin Khant — Saint Paul, MN</span>
            <a
              href="#home"
              className="zk-hover-ink"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Back to top ↑
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
};
