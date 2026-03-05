import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Certifications", "Contact"];

const skillsData = [
  { category: "Programming & Query Languages", items: ["Python", "SQL", "R", "Bash"] },
  { category: "Data Engineering & Pipelines", items: ["Apache Airflow", "dbt", "Spark", "Kafka", "ETL/ELT"] },
  { category: "Cloud & Infrastructure", items: ["Microsoft Azure", "Azure Data Factory", "Azure Synapse", "Docker"] },
  { category: "Analytics & BI Tools", items: ["Power BI", "Excel", "Pandas", "NumPy", "Matplotlib"] },
  { category: "Databases & Storage", items: ["PostgreSQL", "MySQL", "Azure SQL", "Data Warehousing"] },
  { category: "Business Systems", items: ["Business Analysis", "Requirements Gathering", "Process Modelling", "ERP Concepts"] },
];

const projectsData = [
  { comingSoon: true, tags: ["Python", "SQL", "Azure"] },
  { comingSoon: true, tags: ["Power BI", "Excel", "Data Analysis"] },
  { comingSoon: true, tags: ["Python", "Pandas", "PostgreSQL"] },
  { comingSoon: true, tags: ["Airflow", "dbt", "Spark"] },
];

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
  const sectionsRef = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    Object.values(sectionsRef.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#0a0a0a", color: "#f0ece3", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@300;400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #c8a96e; border-radius: 2px; }
        .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(3rem, 8vw, 7rem); font-weight: 900; line-height: 0.92; letter-spacing: -0.02em; }
        .mono { font-family: 'DM Mono', monospace; }
        .section-title { font-family: 'Playfair Display', serif; font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 700; letter-spacing: -0.01em; }
        .nav-link { cursor: pointer; font-family: 'DM Mono', monospace; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; transition: color 0.2s; color: #888; text-decoration: none; }
        .nav-link:hover, .nav-link.active { color: #c8a96e; }
        .btn-primary { background: #c8a96e; color: #0a0a0a; border: none; padding: 14px 32px; font-family: 'DM Mono', monospace; font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.25s; font-weight: 400; }
        .btn-primary:hover { background: #e2c28a; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(200,169,110,0.3); }
        .btn-outline { background: transparent; color: #f0ece3; border: 1px solid #444; padding: 14px 32px; font-family: 'DM Mono', monospace; font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.25s; }
        .btn-outline:hover { border-color: #c8a96e; color: #c8a96e; transform: translateY(-2px); }
        .btn-verify { background: transparent; color: #0078D4; border: 1px solid rgba(0,120,212,0.5); padding: 9px 20px; font-family: 'DM Mono', monospace; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.25s; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
        .btn-verify:hover { background: rgba(0,120,212,0.08); border-color: #0078D4; transform: translateY(-1px); }
        .skill-tag { display: inline-block; padding: 6px 14px; border: 1px solid #2a2a2a; font-family: 'DM Mono', monospace; font-size: 0.75rem; letter-spacing: 0.08em; color: #aaa; transition: all 0.2s; margin: 4px; }
        .skill-tag:hover { border-color: #c8a96e; color: #c8a96e; background: rgba(200,169,110,0.05); }
        .project-card { border: 1px solid #1a1a1a; padding: 32px; transition: all 0.3s; position: relative; overflow: hidden; }
        .project-card::before { content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 0; background: #c8a96e; transition: height 0.3s; }
        .project-card:hover { border-color: #2a2a2a; background: #111; transform: translateY(-4px); }
        .project-card:hover::before { height: 100%; }
        .cert-card { border: 1px solid #1a1a1a; padding: 28px 32px; display: flex; align-items: center; gap: 24px; transition: all 0.3s; flex-wrap: wrap; }
        .cert-card:hover { border-color: #2a2a2a; background: #0f0f0f; }
        .divider { width: 60px; height: 2px; background: #c8a96e; margin: 16px 0 32px; }
        .fade-in { opacity: 0; transform: translateY(24px); animation: fadeUp 0.7s forwards; }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
        .hero-line { overflow: hidden; }
        .hero-word { display: inline-block; animation: slideUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .tag-pill { font-family: 'DM Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; padding: 4px 10px; background: rgba(200,169,110,0.1); color: #c8a96e; border: 1px solid rgba(200,169,110,0.2); }
        .contact-link { font-family: 'DM Mono', monospace; font-size: 0.85rem; color: #888; text-decoration: none; letter-spacing: 0.05em; transition: color 0.2s; }
        .contact-link:hover { color: #c8a96e; }
        .noise { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); z-index: 9999; }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
        .hamburger span { width: 24px; height: 1.5px; background: #f0ece3; transition: all 0.3s; display: block; }
        input, textarea { width: 100%; }
        @media (max-width: 768px) {
          .hamburger { display: flex; }
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
          .hero-buttons { flex-direction: column; align-items: flex-start; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .cert-card { gap: 16px; }
          .stats-row { gap: 28px !important; flex-wrap: wrap; }
          section { padding-left: 24px !important; padding-right: 24px !important; }
          nav { padding-left: 24px !important; padding-right: 24px !important; }
        }
        .mobile-nav { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: #0a0a0a; z-index: 998; flex-direction: column; align-items: center; justify-content: center; gap: 40px; }
        .mobile-nav .nav-link { font-size: 1.1rem; }
      `}</style>

      <div className="noise" />

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, borderBottom: "1px solid #111", backdropFilter: "blur(12px)", background: "rgba(10,10,10,0.85)", padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="mono" style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: "#c8a96e", textTransform: "uppercase" }}>T.M. Matshinge</span>
        <div className="desktop-nav" style={{ display: "flex", gap: "36px" }}>
          {NAV_LINKS.map((n) => (
            <span key={n} className={`nav-link ${activeSection === n.toLowerCase() ? "active" : ""}`} onClick={() => scrollTo(n.toLowerCase())}>{n}</span>
          ))}
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-nav">
          {NAV_LINKS.map((n) => (
            <span key={n} className="nav-link" onClick={() => scrollTo(n.toLowerCase())}>{n}</span>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="about" ref={(el) => (sectionsRef.current.about = el)} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 48px 80px", position: "relative" }}>
        <div style={{ position: "absolute", top: "20%", right: "8%", width: "1px", height: "35%", background: "linear-gradient(to bottom, transparent, #c8a96e44, transparent)" }} />
        <div style={{ maxWidth: "960px" }}>
          <p className="mono fade-in" style={{ color: "#c8a96e", fontSize: "0.8rem", letterSpacing: "0.2em", marginBottom: "32px", animationDelay: "0.1s" }}>
            ✦ OPEN TO DATA ENGINEERING & ANALYTICS ROLES
          </p>
          <div className="hero-line">
            <h1 className="hero-title"><span className="hero-word" style={{ animationDelay: "0.2s" }}>Tshisikhawe</span></h1>
          </div>
          <div className="hero-line">
            <h1 className="hero-title"><span className="hero-word" style={{ animationDelay: "0.3s", color: "#c8a96e" }}>Mulisa</span></h1>
          </div>
          <div className="hero-line">
            <h1 className="hero-title"><span className="hero-word" style={{ animationDelay: "0.4s", WebkitTextStroke: "1px #444", color: "transparent" }}>Matshinge.</span></h1>
          </div>
          <p className="fade-in" style={{ fontSize: "1.05rem", color: "#777", lineHeight: "1.9", maxWidth: "580px", marginTop: "40px", marginBottom: "48px", animationDelay: "0.6s" }}>
            Final-year <span style={{ color: "#bbb" }}>Bachelor of IT in Business Systems</span> student & <span style={{ color: "#bbb" }}>ALX Data Engineering</span> programme candidate. I bridge the gap between raw data and business insight — building pipelines, analysing patterns, and delivering decisions that matter.
          </p>
          <div className="hero-buttons fade-in" style={{ display: "flex", gap: "16px", flexWrap: "wrap", animationDelay: "0.8s" }}>
            <button className="btn-primary" onClick={() => alert("CV will be linked once uploaded!")}>↓ Download My CV</button>
            <button className="btn-outline" onClick={() => scrollTo("projects")}>View My Projects →</button>
          </div>
          <div className="stats-row fade-in" style={{ marginTop: "72px", display: "flex", gap: "56px", animationDelay: "1s" }}>
            {[["BIT", "Business Systems"], ["ALX", "Data Engineering"], ["AZ-900", "Azure Certified"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#c8a96e" }}>{n}</div>
                <div className="mono" style={{ fontSize: "0.68rem", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "4px" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" ref={(el) => (sectionsRef.current.skills = el)} style={{ padding: "100px 48px", borderTop: "1px solid #111" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <p className="mono" style={{ color: "#555", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>02 / Skills</p>
          <h2 className="section-title">What I<br /><span style={{ color: "#c8a96e" }}>Work With</span></h2>
          <div className="divider" />
          <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "40px", marginTop: "20px" }}>
            {skillsData.map(({ category, items }) => (
              <div key={category}>
                <p className="mono" style={{ fontSize: "0.68rem", letterSpacing: "0.18em", color: "#c8a96e", textTransform: "uppercase", marginBottom: "16px" }}>{category}</p>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {items.map((item) => <span key={item} className="skill-tag">{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" ref={(el) => (sectionsRef.current.projects = el)} style={{ padding: "100px 48px", borderTop: "1px solid #111", background: "#060606" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <p className="mono" style={{ color: "#555", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>03 / Projects</p>
          <h2 className="section-title">Selected<br /><span style={{ color: "#c8a96e" }}>Work</span></h2>
          <div className="divider" />
          <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2px", marginTop: "20px" }}>
            {projectsData.map((p, i) => (
              <div key={i} className="project-card" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", minHeight: "220px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: "16px" }}>
                  <span className="mono" style={{ fontSize: "0.65rem", color: "#555", letterSpacing: "0.1em" }}>0{i + 1}</span>
                  <span className="mono" style={{ fontSize: "0.65rem", color: "#333", letterSpacing: "0.1em" }}>— — —</span>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", width: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                    <div style={{ width: "28px", height: "1px", background: "#c8a96e44" }} />
                    <span className="mono" style={{ fontSize: "0.72rem", letterSpacing: "0.2em", color: "#444", textTransform: "uppercase" }}>Coming Soon</span>
                    <div style={{ width: "28px", height: "1px", background: "#c8a96e44" }} />
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {p.tags.map((t) => <span key={t} className="tag-pill" style={{ opacity: 0.4 }}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" ref={(el) => (sectionsRef.current.certifications = el)} style={{ padding: "100px 48px", borderTop: "1px solid #111" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <p className="mono" style={{ color: "#555", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>04 / Certifications</p>
          <h2 className="section-title">Credentials &<br /><span style={{ color: "#c8a96e" }}>Achievements</span></h2>
          <div className="divider" />
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginTop: "20px" }}>
            {certificationsData.map((cert, i) => (
              <div key={i} className="cert-card">
                {/* Badge */}
                <div style={{ flexShrink: 0, width: "76px", height: "76px", background: "#111", border: "1px solid #1e1e1e", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
                  <img src={cert.logo} alt={`${cert.code} badge`} style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    onError={(e) => { e.target.replaceWith(Object.assign(document.createElement("span"), { textContent: cert.code, style: "font-family:'DM Mono',monospace;font-size:0.6rem;color:#0078D4;letter-spacing:0.05em;text-align:center" })); }} />
                </div>
                {/* Info */}
                <div style={{ flex: 1, minWidth: "160px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <div style={{ width: "3px", height: "20px", background: cert.color, borderRadius: "2px", flexShrink: 0 }} />
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, color: "#f0ece3" }}>{cert.name}</h3>
                  </div>
                  <p className="mono" style={{ fontSize: "0.7rem", color: "#666", letterSpacing: "0.08em", paddingLeft: "13px" }}>
                    {cert.issuer} · {cert.code} · {cert.year}
                  </p>
                </div>
                {/* Verify Button */}
                <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="btn-verify">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#0078D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Verify Credential
                </a>
              </div>
            ))}
            {/* Coming soon placeholder */}
            <div style={{ border: "1px dashed #1a1a1a", padding: "28px 32px", display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ color: "#2a2a2a", fontSize: "1.5rem", lineHeight: 1 }}>+</span>
              <span className="mono" style={{ fontSize: "0.7rem", color: "#333", letterSpacing: "0.12em" }}>MORE CERTIFICATIONS COMING SOON</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={(el) => (sectionsRef.current.contact = el)} style={{ padding: "100px 48px 80px", borderTop: "1px solid #111", background: "#060606" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <p className="mono" style={{ color: "#555", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>05 / Contact</p>
          <h2 className="section-title">Let's<br /><span style={{ color: "#c8a96e" }}>Connect</span></h2>
          <div className="divider" />
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", marginTop: "20px" }}>
            <div>
              <p style={{ fontSize: "1rem", color: "#666", lineHeight: "1.8", marginBottom: "40px" }}>
                Looking for a data engineering or business analysis opportunity. Open to graduate roles, internships, and collaborative projects.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {[
                  { icon: "✉", label: "Email", value: "mulisamatshinge4@gmail.com", href: "mailto:mulisamatshinge4@gmail.com" },
                  { icon: "⟐", label: "LinkedIn", value: "linkedin.com/in/mulisa-matshinge", href: "https://www.linkedin.com/in/mulisa-matshinge" },
                  { icon: "◈", label: "GitHub", value: "github.com/MulisaMatshinge", href: "https://github.com/MulisaMatshinge" },
                  { icon: "◎", label: "Location", value: "South Africa", href: null },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span style={{ color: "#c8a96e", fontSize: "1rem", width: "20px", textAlign: "center" }}>{icon}</span>
                    <div>
                      <div className="mono" style={{ fontSize: "0.62rem", color: "#444", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "3px" }}>{label}</div>
                      {href ? <a href={href} className="contact-link">{value}</a> : <span className="mono" style={{ fontSize: "0.85rem", color: "#888" }}>{value}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {["Your Name", "Email Address"].map((ph) => (
                <input key={ph} placeholder={ph} style={{ background: "transparent", border: "none", borderBottom: "1px solid #222", padding: "14px 0", color: "#f0ece3", fontSize: "0.9rem", outline: "none", fontFamily: "Georgia, serif", transition: "border-color 0.2s" }} onFocus={(e) => (e.target.style.borderBottomColor = "#c8a96e")} onBlur={(e) => (e.target.style.borderBottomColor = "#222")} />
              ))}
              <textarea placeholder="Your Message" rows={5} style={{ background: "transparent", border: "none", borderBottom: "1px solid #222", padding: "14px 0", color: "#f0ece3", fontSize: "0.9rem", outline: "none", fontFamily: "Georgia, serif", resize: "none", marginBottom: "8px", transition: "border-color 0.2s" }} onFocus={(e) => (e.target.style.borderBottomColor = "#c8a96e")} onBlur={(e) => (e.target.style.borderBottomColor = "#222")} />
              <button className="btn-primary" style={{ alignSelf: "flex-start" }}>Send Message →</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 48px", borderTop: "1px solid #111", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <span className="mono" style={{ fontSize: "0.7rem", color: "#333", letterSpacing: "0.1em" }}>© 2026 · TSHISIKHAWE MULISA MATSHINGE</span>
        <span className="mono" style={{ fontSize: "0.7rem", color: "#333", letterSpacing: "0.1em" }}>DATA ENGINEERING · BUSINESS ANALYSIS</span>
      </footer>
    </div>
  );
}

