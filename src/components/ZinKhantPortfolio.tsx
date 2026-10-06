import { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "@/styles/zin-khant.css";
import { LiveAge } from "@/components/LiveAge";

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

const NAV_ITEMS = [
  { id: "home", label: "Zin Khant" },
  { id: "work", label: "work" },
  { id: "projects", label: "projects" },
  { id: "music", label: "music" },
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
  const [spotifyReloadKey, setSpotifyReloadKey] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = NAV_ITEMS.find((item) => `#${item.id}` === location.hash)?.id ?? "home";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeSection]);

  return (
    <div id="zk-root" className="zk-page">
      <a href="#main" className="zk-skip-link">Skip to content</a>
      <Tabs.Root
        className="zk-layout"
        activationMode="manual"
        value={activeSection}
        onValueChange={(value) => navigate({ hash: `#${value}` })}
      >
        <header className="zk-header">
          <Tabs.List aria-label="Portfolio sections" className="zk-tabs">
            {NAV_ITEMS.map((item) => (
              <Tabs.Trigger key={item.id} value={item.id} className="zk-tab">
                {item.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </header>

        <main id="main" className="zk-content" tabIndex={-1}>
          <Tabs.Content value="home" className="zk-intro">
            <p className="zk-eyebrow">Builder, musician, curious person.</p>
            <h1 id="intro-heading">Zin Khant<span className="zk-accent">.</span></h1>
            <div className="zk-bio">
              <p>
                Hi! I'm Zin. I'm <LiveAge bornAt="2003-09-23T00:00:00-05:00" /> years old.
                I'm studying CS at the University of St. Thomas.
                If I see a problem I can fix, I will, that's all I've done
                throughout college.
              </p>
              <p>
                I love talking about{" "}
                <a
                  className="zk-highlight-link"
                  href="https://www.dhamma.org/en/about/vipassana"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="meditation: learn about Vipassana meditation"
                >
                  meditation
                </a>, philosophy, music, and AI.
                I make music and, more than anything, I want the things I build
                to connect people.
              </p>
            </div>
            <div className="zk-socials">
              <a href="https://www.linkedin.com/in/zin-khant-993055216" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon /><span>LinkedIn</span>
              </a>
              <a href="https://x.com/zinnMK_" target="_blank" rel="noopener noreferrer">
                <XIcon /><span>Twitter</span>
              </a>
              <a href="mailto:khan4152@stthomas.edu">
                <MailIcon /><span>Email</span>
              </a>
            </div>
          </Tabs.Content>

          <Tabs.Content value="work" className="zk-section">
            <h2 id="work-heading">Work</h2>
            <div className="zk-list">
              {experienceEntries.map((job) => (
                <article key={`${job.title}-${job.org}`} className="zk-work-row">
                  <div>
                    <h3>{job.title}</h3>
                    <p className="zk-organization">{job.org}</p>
                    {job.blog && (
                      <a href={job.blog} target="_blank" rel="noopener noreferrer" className="zk-text-link">
                        Read the launch post <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                  <div className="zk-meta">
                    {job.period && <p>{job.period}</p>}
                    <p>{job.location}</p>
                  </div>
                </article>
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content value="projects" className="zk-section">
            <h2 id="projects-heading">Projects</h2>
            <div className="zk-list">
              {workEntries.map((entry) => (
                <article key={entry.title} className="zk-project-row">
                  <div className="zk-row-heading">
                    <h3>
                      {entry.href ? (
                        <a href={entry.href} target="_blank" rel="noopener noreferrer">
                          {entry.title} <span className="zk-link-arrow" aria-hidden="true">↗</span>
                        </a>
                      ) : entry.title}
                    </h3>
                    <span className="zk-meta">{entry.year}</span>
                  </div>
                  <p className="zk-description">{entry.description}</p>
                </article>
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content
            value="music"
            className="zk-section"
            forceMount
            hidden={activeSection !== "music"}
          >
            <h2 id="music-heading">My music</h2>
            <iframe
              key={spotifyReloadKey}
              title="Zin Khant on Spotify"
              className="zk-spotify"
              src="https://open.spotify.com/embed/artist/7KC3H4mshZpBLLeG4y18sw?utm_source=generator&theme=0&si=eaf0addcfa9948db"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="eager"
            />
            <div className="zk-music-actions">
              <a className="zk-text-link" href="https://open.spotify.com/artist/7KC3H4mshZpBLLeG4y18sw" target="_blank" rel="noopener noreferrer">
                Listen on Spotify <span aria-hidden="true">↗</span>
              </a>
              <button type="button" className="zk-reload-player" onClick={() => setSpotifyReloadKey((key) => key + 1)}>
                Reload player
              </button>
            </div>
          </Tabs.Content>

          <Tabs.Content value="reach" className="zk-section zk-contact">
            <h2 id="contact-heading">Say hello</h2>
            <p>Have something in mind, or just want to talk? I'd love to hear from you.</p>
            <a className="zk-text-link" href="mailto:khan4152@stthomas.edu">khan4152@stthomas.edu <span aria-hidden="true">↗</span></a>
          </Tabs.Content>

          <footer className="zk-footer">
            <span>© 2026 Zin Khant · Saint Paul, MN</span>
            <Link to="#home">Home ↗</Link>
          </footer>
        </main>
      </Tabs.Root>
    </div>
  );
};
