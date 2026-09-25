import React from "react";

const projects = [
  {
    name: "ClassFinder.ai",
    description:
      "An NLP search tool that helps students find class schedules with natural language instead of keyword guessing.",
    meta: "React, TypeScript, Google ADK, Docker, Google Cloud Platform",
    href: "https://classfinder.ai",
  },
  {
    name: "Eureka",
    description:
      "A campus social app for student hangouts, real-time location sharing, events, and push notifications.",
    meta: "Flutter, Firebase, Maps API, Google Cloud Platform",
    href: "https://apps.apple.com/us/app/eureka-campus-buddy/id6470950630",
  },
];

const links = [
  {
    label: "Email",
    href: "mailto:shanunapal@gmail.com",
    value: "shanunapal@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/ZinMK",
    value: "github.com/ZinMK",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zin-khant-993055216/",
    value: "linkedin.com/in/zin-khant",
  },
];

export const TerminalPortfolio = () => {
  return (
    <main className="personal-site">
      <header className="personal-nav" aria-label="Primary navigation">
        <a href="#home">Zin Khant</a>
        <nav>
          <a href="#work">Work</a>
          <a href="/ZIN_2026_CLOUDFLARE.pdf" target="_blank" rel="noreferrer">
            Resume
          </a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="personal-hero" id="home">
        <div className="personal-hero-copy">
          <p className="personal-kicker">Software engineering intern</p>
          <h1>Hi, I’m Zin.</h1>
          <p>
            I’m a Computer Science student at the University of St. Thomas who
            loves building useful software, especially full-stack products,
            mobile apps, and AI tools that make complicated things easier.
          </p>
          <div className="personal-actions">
            <a href="#work">See my work</a>
            <a href="/ZIN_2026_CLOUDFLARE.pdf" target="_blank" rel="noreferrer">
              View resume
            </a>
          </div>
        </div>

        <div className="personal-photo-wrap">
          <img src="/images/profile-pic.jpg" alt="Zin Khant" />
        </div>
      </section>

      <section className="personal-section">
        <div>
          <p className="personal-kicker">What I care about</p>
          <h2>Building software that feels practical, fast, and human.</h2>
        </div>
        <div className="personal-passion-grid">
          <article>
            <h3>AI that helps</h3>
            <p>
              I’m interested in using language models and ML to create tools
              that feel genuinely useful, not just flashy.
            </p>
          </article>
          <article>
            <h3>Products people use</h3>
            <p>
              I like shipping things into the world, learning from real users,
              and improving the details that make software easier to trust.
            </p>
          </article>
          <article>
            <h3>Student communities</h3>
            <p>
              I founded Nexus AI Club to help students learn about LLMs, build
              together, and get more comfortable experimenting with new tech.
            </p>
          </article>
        </div>
      </section>

      <section className="personal-section" id="work">
        <div className="personal-section-heading">
          <p className="personal-kicker">Work</p>
          <h2>Selected projects</h2>
        </div>
        <div className="personal-work-list">
          {projects.map((project) => (
            <article className="personal-work-card" key={project.name}>
              <div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <span>{project.meta}</span>
              </div>
              <a href={project.href} target="_blank" rel="noreferrer">
                Open
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="personal-resume">
        <div>
          <p className="personal-kicker">Resume</p>
          <h2>Want the quick version?</h2>
          <p>
            My resume has the condensed timeline, technical skills, projects,
            and experience.
          </p>
        </div>
        <a href="/ZIN_2026_CLOUDFLARE.pdf" target="_blank" rel="noreferrer">
          Open resume
        </a>
      </section>

      <section className="personal-section" id="contact">
        <div className="personal-section-heading">
          <p className="personal-kicker">Contact</p>
          <h2>Let’s connect.</h2>
        </div>
        <div className="personal-contact-list">
          {links.map((link) => (
            <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
              <span>{link.label}</span>
              {link.value}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
};
