import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Certifications", "Contact"];
const CV_URL = "https://drive.google.com/file/d/1lz6QcXyROHZiBbhwCRlJGNccC5nFTjPL/view?usp=sharing";

const skillsData = [
  { category: "Programming & Query Languages", items: ["Python", "SQL", "Java", "Bash"] },
  { category: "Data Engineering & Pipelines", items: ["Apache Airflow", "dbt", "Spark", "Kafka", "ETL/ELT"] },
  { category: "Cloud & Infrastructure", items: ["Microsoft Azure", "Azure Data Factory", "Azure Synapse", "Docker"] },
  { category: "Analytics & BI Tools", items: ["Power BI", "Excel", "Pandas", "NumPy", "Matplotlib"] },
  { category: "Databases & Storage", items: ["PostgreSQL", "MySQL", "Azure SQL", "Data Warehousing"] },
  { category: "Business Systems", items: ["Business Analysis", "Requirements Gathering", "Process Modelling", "ERP Concepts"] },
];

const PROJECT_TYPES = ["Data Analysis & BI", "Data Engineering"];

const projectsData = {
  "Data Analysis & BI": [
    { comingSoon: true, tags: ["Power BI", "Excel", "Business Intelligence"] },
    { comingSoon: true, tags: ["Python", "Matplotlib", "Pandas"] },
    { comingSoon: true, tags: ["SQL", "Reporting", "Visualization"] },
    { comingSoon: true, tags: ["NumPy", "Statistics", "Dashboards"] },
  ],
  "Data Engineering": [
    { comingSoon: true, tags: ["Airflow", "dbt", "Spark"] },
    { comingSoon: true, tags: ["Python", "SQL", "Azure"] },
    { comingSoon: true, tags: ["Kafka", "ETL/ELT", "PostgreSQL"] },
    { comingSoon: true, tags: ["Azure Data Factory", "Azure Synapse", "Docker"] },
  ],
};

const certificationsData = [
  {
    name: "Microsoft Azure Fundamentals",
    code: "AZ-900",
    issuer: "Microsoft",
    year: "2024",
    color: "#0078D4",
    verifyUrl: "https://learn.microsoft.com/api/credentials/share/en-us/TshisikhaweMulisaMatshinge-9826/24D4F5B42318A3B7?sharingId=E9F6A69E114FEA48",
    logo: "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg",
  },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProjectType, setActiveProjectType] = useState("Data Analysis & BI");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const sectionsRef = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.25 }
    );
    Object.values(sectionsRef.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    const subject = encodeURIComponent("Portfolio message from " + formData.name);
    const body = encodeURIComponent("Name: " + formData.name + "\nEmail: " + formData.email + "\n\n" + formData.message);
    window.location.href = "mailto:mulisamatshinge4@gmail.com?subject=" + subject + "&body=" + body;
    setFormData({ name: "", email: "", message: "" });
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
  };

  const currentProjects = projectsData[activeProjectType];

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: "#f5f4f0", color: "#1a1a1a", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; }

        body { background: #f5f4f0; }

        .syne { font-family: 'Syne', sans-serif; }
        .serif { font-family: 'Instrument Serif', serif; }

        /* NAV */
        .nav-bar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: #f5f4f0;
          border-bottom: 1px solid #d8d5ce;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 40px; height: 56px;
        }
        .nav-logo { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.9rem; letter-spacing: -0.01em; color: #1a1a1a; }
        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-links a {
          font-family: 'Syne', sans-serif; font-size: 0.8rem; font-weight: 500;
          color: #888; text-decoration: none; letter-spacing: 0.01em;
          transition: color 0.15s; cursor: pointer;
        }
        .nav-links a:hover, .nav-links a.active { color: #1a1a1a; }

        .hamburger { display: none; cursor: pointer; background: none; border: none; padding: 4px; flex-direction: column; gap: 4px; }
        .hamburger span { display: block; width: 22px; height: 1.5px; background: #1a1a1a; transition: all 0.25s; }

        /* MOBILE NAV */
        .mobile-menu {
          display: none; position: fixed; inset: 0; background: #f5f4f0; z-index: 99;
          flex-direction: column; align-items: center; justify-content: center; gap: 32px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 700;
          color: #1a1a1a; text-decoration: none; cursor: pointer;
        }

        /* SECTIONS */
        section { padding: 100px 40px; border-bottom: 1px solid #d8d5ce; }
        section:last-of-type { border-bottom: none; }

        .section-label {
          font-family: 'Syne', sans-serif; font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase; color: #999;
          margin-bottom: 48px;
        }

        /* HERO */
        .hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 64px; padding-top: 120px; }

        .hero-name {
          font-family: 'Syne', sans-serif;
          font-size: clamp(3.5rem, 10vw, 9rem);
          font-weight: 800;
          line-height: 0.88;
          letter-spacing: -0.04em;
          color: #1a1a1a;
          margin-bottom: 48px;
        }
        .hero-name em {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-weight: 400;
          color: #888;
        }

        .hero-bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
        .hero-bio {
          max-width: 480px; font-size: 1rem; line-height: 1.7; color: #555;
        }
        .hero-bio strong { color: #1a1a1a; font-weight: 500; }

        .hero-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 16px; }
        .hero-tags { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }
        .hero-tag {
          font-family: 'Syne', sans-serif; font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          background: #1a1a1a; color: #f5f4f0;
          padding: 6px 12px; border-radius: 2px;
        }

        /* BUTTONS */
        .btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Syne', sans-serif; font-size: 0.8rem; font-weight: 600;
          letter-spacing: 0.05em; text-decoration: none; cursor: pointer;
          border-radius: 2px; transition: all 0.18s;
        }
        .btn-dark { background: #1a1a1a; color: #f5f4f0; border: 1px solid #1a1a1a; padding: 12px 24px; }
        .btn-dark:hover { background: #333; }
        .btn-light { background: transparent; color: #1a1a1a; border: 1px solid #c8c5be; padding: 12px 24px; }
        .btn-light:hover { border-color: #1a1a1a; }
        .btn-ghost { background: transparent; color: #555; border: 1px solid #d8d5ce; padding: 8px 16px; font-size: 0.73rem; }
        .btn-ghost:hover { color: #1a1a1a; border-color: #1a1a1a; }

        /* SKILLS */
        .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border: 1px solid #d8d5ce; }
        .skill-block {
          padding: 32px; border-right: 1px solid #d8d5ce; border-bottom: 1px solid #d8d5ce;
        }
        .skill-block:nth-child(3n) { border-right: none; }
        .skill-block:nth-last-child(-n+3) { border-bottom: none; }

        .skill-category {
          font-family: 'Syne', sans-serif; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; color: #1a1a1a;
          margin-bottom: 16px;
        }
        .skill-items { display: flex; flex-wrap: wrap; gap: 6px; }
        .skill-item {
          font-family: 'Syne', sans-serif; font-size: 0.76rem; font-weight: 500;
          color: #666; background: #eceae5; padding: 4px 10px; border-radius: 2px;
          transition: all 0.15s;
        }
        .skill-item:hover { background: #1a1a1a; color: #f5f4f0; }

        /* PROJECTS */
        .project-tabs { display: flex; gap: 0; margin-bottom: 40px; border-bottom: 1px solid #d8d5ce; }
        .project-tab {
          font-family: 'Syne', sans-serif; font-size: 0.8rem; font-weight: 600;
          color: #999; background: none; border: none; padding: 12px 24px 12px 0;
          cursor: pointer; letter-spacing: 0.02em; border-bottom: 2px solid transparent;
          margin-bottom: -1px; transition: all 0.15s;
        }
        .project-tab.active { color: #1a1a1a; border-bottom-color: #1a1a1a; }
        .project-tab:hover { color: #1a1a1a; }

        .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: #d8d5ce; border: 1px solid #d8d5ce; }
        .project-card {
          background: #f5f4f0; padding: 40px 32px;
          display: flex; flex-direction: column; gap: 24px;
          min-height: 200px; transition: background 0.2s;
        }
        .project-card:hover { background: #fff; }
        .project-num { font-family: 'Syne', sans-serif; font-size: 0.7rem; font-weight: 700; color: #ccc; }
        .project-coming {
          font-family: 'Instrument Serif', serif; font-style: italic;
          font-size: 1.4rem; color: #ccc; flex: 1; display: flex; align-items: center;
        }
        .project-tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .project-tag {
          font-family: 'Syne', sans-serif; font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: #999; background: #eceae5; padding: 4px 8px; border-radius: 2px;
        }

        /* CERTS */
        .cert-item {
          display: flex; align-items: center; gap: 24px;
          padding: 32px 0; border-bottom: 1px solid #d8d5ce;
        }
        .cert-item:first-child { border-top: 1px solid #d8d5ce; }
        .cert-badge {
          width: 64px; height: 64px; flex-shrink: 0;
          border: 1px solid #d8d5ce; border-radius: 4px;
          background: #fff; display: flex; align-items: center; justify-content: center;
          padding: 8px;
        }
        .cert-badge img { width: 100%; height: 100%; object-fit: contain; }
        .cert-info { flex: 1; }
        .cert-name {
          font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700;
          color: #1a1a1a; margin-bottom: 4px;
        }
        .cert-meta { font-size: 0.82rem; color: #888; }
        .cert-coming {
          font-family: 'Instrument Serif', serif; font-style: italic;
          font-size: 1rem; color: #ccc; padding: 32px 0;
          border-bottom: 1px solid #d8d5ce;
        }

        /* CONTACT */
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
        .contact-info { display: flex; flex-direction: column; gap: 0; }
        .contact-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 0; border-bottom: 1px solid #d8d5ce;
        }
        .contact-row:first-child { border-top: 1px solid #d8d5ce; }
        .contact-label { font-family: 'Syne', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #999; }
        .contact-val { font-size: 0.9rem; color: #1a1a1a; text-decoration: none; }
        .contact-val:hover { text-decoration: underline; }

        .form-field { display: flex; flex-direction: column; gap: 6px; }
        .form-label { font-family: 'Syne', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #999; }
        .form-input {
          background: transparent; border: none; border-bottom: 1px solid #d8d5ce;
          padding: 12px 0; font-size: 0.95rem; color: #1a1a1a; outline: none;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          transition: border-color 0.15s; width: 100%;
        }
        .form-input:focus { border-bottom-color: #1a1a1a; }
        .form-input::placeholder { color: #bbb; }
        textarea.form-input { resize: none; }

        /* FOOTER */
        footer {
          padding: 24px 40px; display: flex; justify-content: space-between;
          align-items: center; border-top: 1px solid #d8d5ce; flex-wrap: wrap; gap: 12px;
        }
        footer span { font-family: 'Syne', sans-serif; font-size: 0.72rem; color: #aaa; font-weight: 500; }

        /* TOAST */
        .toast {
          position: fixed; bottom: 32px; left: 50%;
          transform: translateX(-50%) translateY(20px);
          background: #1a1a1a; color: #f5f4f0;
          font-family: 'Syne', sans-serif; font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.06em; padding: 14px 28px;
          opacity: 0; transition: all 0.3s; pointer-events: none; z-index: 999; border-radius: 2px;
        }
        .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

        @media (max-width: 768px) {
          section { padding: 72px 24px; }
          .nav-bar { padding: 0 24px; }
          .hamburger { display: flex; }
          .nav-links { display: none; }
          .hero-name { font-size: clamp(2.8rem, 14vw, 5rem); }
          .hero-bottom { flex-direction: column; align-items: flex-start; }
          .hero-actions { align-items: flex-start; }
          .hero-tags { justify-content: flex-start; }
          .skills-grid { grid-template-columns: 1fr; }
          .skill-block { border-right: none; }
          .skill-block:nth-last-child(-n+3) { border-bottom: 1px solid #d8d5ce; }
          .skill-block:last-child { border-bottom: none; }
          .projects-grid { grid-template-columns: 1fr; }
          .contact-grid { grid-template-columns: 1fr; gap: 48px; }
          footer { padding: 24px; }
        }
      `}</style>

      {/* TOAST */}
      <div className={"toast" + (formSent ? " show" : "")}>Message sent — I'll get back to you soon</div>

      {/* NAV */}
      <nav className="nav-bar">
        <div className="nav-logo syne">Mulisa Matshinge</div>
        <ul className="nav-links">
          {NAV_LINKS.map((n) => (
            <li key={n}>
              <a
                className={activeSection === n.toLowerCase() ? "active" : ""}
                onClick={() => scrollTo(n.toLowerCase())}
              >{n}</a>
            </li>
          ))}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none" }}>
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none", background: "none", border: "none", cursor: "pointer",
            flexDirection: "column", gap: "4px", padding: "4px"
          }}
          className="hamburger"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={"mobile-menu" + (menuOpen ? " open" : "")}>
        {NAV_LINKS.map((n) => (
          <a key={n} onClick={() => scrollTo(n.toLowerCase())}>{n}</a>
        ))}
      </div>

      {/* HERO */}
      <section id="about" ref={(el) => (sectionsRef.current.about = el)} className="hero" style={{ borderBottom: "1px solid #d8d5ce" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <p className="section-label" style={{ marginBottom: 32 }}>Data Engineer & Analyst — Pretoria, South Africa</p>

          <h1 className="hero-name">
            Tshisikhawe<br />
            <em>Mulisa</em><br />
            Matshinge
          </h1>

          <div className="hero-bottom">
            <p className="hero-bio">
              Final-year <strong>BIT in Business Systems</strong> student at Rosebank College,
              training in the <strong>ALX Data Engineering</strong> programme. I build data pipelines,
              dashboards, and cloud analytics on Azure. Certified in <strong>AZ-900</strong> and <strong>PL-300</strong>.
              Looking for graduate roles in Data Engineering, BI, or Business Analysis.
            </p>

            <div className="hero-actions">
              <div className="hero-tags">
                <span className="hero-tag">AZ-900</span>
                <span className="hero-tag">PL-300</span>
                <span className="hero-tag">ALX</span>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <a href={CV_URL} target="_blank" rel="noreferrer" className="btn btn-dark">Download CV ↓</a>
                <button className="btn btn-light" onClick={() => scrollTo("projects")}>View work →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" ref={(el) => (sectionsRef.current.skills = el)}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-label">Skills</p>
          <div className="skills-grid">
            {skillsData.map(({ category, items }) => (
              <div key={category} className="skill-block">
                <div className="skill-category">{category}</div>
                <div className="skill-items">
                  {items.map((item) => <span key={item} className="skill-item">{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" ref={(el) => (sectionsRef.current.projects = el)}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-label">Projects</p>
          <div className="project-tabs">
            {PROJECT_TYPES.map((type) => (
              <button
                key={type}
                className={"project-tab" + (activeProjectType === type ? " active" : "")}
                onClick={() => setActiveProjectType(type)}
              >{type}</button>
            ))}
          </div>
          <div className="projects-grid">
            {currentProjects.map((p, i) => (
              <div key={activeProjectType + i} className="project-card">
                <span className="project-num">0{i + 1}</span>
                <span className="project-coming">Coming soon</span>
                <div className="project-tags">
                  {p.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" ref={(el) => (sectionsRef.current.certifications = el)}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-label">Certifications</p>

          {certificationsData.map((cert, i) => (
            <div key={i} className="cert-item">
              <div className="cert-badge">
                <img
                  src={cert.logo}
                  alt={cert.code}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>
              <div className="cert-info">
                <div className="cert-name">{cert.name}</div>
                <div className="cert-meta">{cert.issuer} · {cert.code} · {cert.year}</div>
              </div>
              <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
                Verify ↗
              </a>
            </div>
          ))}

          <div className="cert-coming">More certifications on the way...</div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={(el) => (sectionsRef.current.contact = el)}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p className="section-label">Contact</p>
          <div className="contact-grid">
            <div>
              <p style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "#555", marginBottom: 40, maxWidth: 360 }}>
                Open to graduate programmes, internships, and learnerships in Data Engineering,
                Analytics, BI, and Business Analysis. Let's talk.
              </p>
              <div className="contact-info">
                {[
                  { label: "Email", value: "mulisamatshinge4@gmail.com", href: "mailto:mulisamatshinge4@gmail.com" },
                  { label: "LinkedIn", value: "mulisa-matshinge", href: "https://www.linkedin.com/in/mulisa-matshinge" },
                  { label: "GitHub", value: "MulisaMatshinge", href: "https://github.com/MulisaMatshinge" },
                  { label: "Location", value: "Pretoria, South Africa", href: null },
                ].map(({ label, value, href }) => (
                  <div key={label} className="contact-row">
                    <span className="contact-label">{label}</span>
                    {href
                      ? <a href={href} className="contact-val">{value}</a>
                      : <span className="contact-val" style={{ color: "#888" }}>{value}</span>
                    }
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div className="form-field">
                <label className="form-label">Name</label>
                <input
                  className="form-input"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Message</label>
                <textarea
                  className="form-input"
                  placeholder="What's on your mind?"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button
                className="btn btn-dark"
                onClick={handleSend}
                disabled={!formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
                style={{ opacity: (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) ? 0.4 : 1, alignSelf: "flex-start" }}
              >
                Send message →
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <span>© 2026 Tshisikhawe Mulisa Matshinge</span>
        <span>Data Engineering · Business Analysis</span>
      </footer>
    </div>
  );
}
