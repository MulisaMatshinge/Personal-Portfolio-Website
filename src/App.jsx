import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Certifications", "Contact"];
const CV_URL = "https://drive.google.com/file/d/1lz6QcXyROHZiBbhwCRlJGNccC5nFTjPL/view?usp=sharing";

const skillLogos = {
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg",
  "Java (OOP)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "PowerShell": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powershell/powershell-original.svg",
  "dbt": "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/dbt.svg",
  "Apache Kafka": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
  "Apache Spark": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg",
  "Microsoft Azure": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  "Azure Data Factory": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  "Google Cloud Platform": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  "BigQuery": "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/google-bigquery.svg",
  "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "Power BI": "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
  "Excel": "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg",
  "Pandas": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  "NumPy": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "Snowflake": "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/snowflake.svg",
  "Azure SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  "Agile": "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/jira.svg",
};

const skillsData = [
  { category: "Languages", items: ["Python", "SQL", "Java (OOP)", "PowerShell"] },
  { category: "Data Engineering", items: ["ETL/ELT", "dbt", "Apache Kafka", "Apache Spark", "Kimball Modelling", "Data Warehousing"] },
  { category: "Cloud", items: ["Microsoft Azure", "Azure Data Factory", "Google Cloud Platform", "BigQuery", "Docker"] },
  { category: "Analytics & BI", items: ["Power BI", "DAX", "Power Query", "Excel", "Pandas", "NumPy"] },
  { category: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Snowflake", "Azure SQL", "Relational Design"] },
  { category: "Business Analysis", items: ["Agile", "Business Analysis", "Systems Analysis", "Requirements Gathering", "Process Modelling"] },
];

const projectsData = [
  {
    title: "RFM Customer Segment Analysis",
    subtitle: "SQL · Power BI · BigQuery · GCP",
    desc: "5-step SQL transformation pipeline scoring 287+ customers using NTILE(10) decile RFM logic, segmented into 8 behavioural groups with an interactive Power BI dashboard.",
    link: "https://github.com/MulisaMatshinge/RFM-customer-segmentation",
    tags: ["Power BI", "BigQuery", "DAX"],
  },
  {
    title: "Maji Ndogo Water Access BI",
    subtitle: "Power BI · MySQL · Jupyter · DAX",
    desc: "10-page drill-through Power BI report across 5 provinces tracking 25,398 projects and $163.89M budget, modelled interventions projecting +66% national water access improvement.",
    link: "https://github.com/MulisaMatshinge/Maji-Ndogo-Water-Crisis-Analysis",
    tags: ["Power BI", "MySQL", "Python"],
  },
  {
    title: "Data Engineering Pipeline",
    subtitle: "Python · Airflow · dbt · PostgreSQL",
    desc: null,
    link: null,
    tags: ["Airflow", "dbt", "PostgreSQL"],
    comingSoon: true,
  },
];

const certificationsData = [
  {
    name: "Microsoft Azure Fundamentals",
    code: "AZ-900",
    issuer: "Microsoft",
    year: "2024",
    verifyUrl: "https://learn.microsoft.com/api/credentials/share/en-us/TshisikhaweMulisaMatshinge-9826/24D4F5B42318A3B7?sharingId=E9F6A69E114FEA48",
    logo: "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg",
  },
  {
    name: "Associate SQL Data Engineer",
    code: "DataCamp",
    issuer: "DataCamp",
    year: "2024",
    verifyUrl: "#",
    logo: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/datacamp.svg",
  },
  {
    name: "Database Design",
    code: "DataCamp",
    issuer: "DataCamp",
    year: "2024",
    verifyUrl: "#",
    logo: "https://cdn.jsdelivr.net/gh/gilbarbara/logos/logos/datacamp.svg",
  },
  {
    name: "Data Analytics",
    code: "ALX Africa",
    issuer: "ALX Africa",
    year: "2025",
    verifyUrl: "#",
    logo: null,
  },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const sectionsRef = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.2 }
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
    const subject = encodeURIComponent("Portfolio contact from " + formData.name);
    const body = encodeURIComponent("Name: " + formData.name + "\nEmail: " + formData.email + "\n\n" + formData.message);
    window.location.href = "mailto:mulisamatshinge4@gmail.com?subject=" + subject + "&body=" + body;
    setFormData({ name: "", email: "", message: "" });
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
  };

  return (
    <div style={{ background: "#F0EDE6", color: "#0F0F0F", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Geist+Mono:wght@300;400;500&family=Bricolage+Grotesque:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-thumb { background: #0F0F0F; }

        body { background: #F0EDE6; overflow-x: hidden; }

        .mono { font-family: 'Geist Mono', monospace; }
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        .sans { font-family: 'Bricolage Grotesque', sans-serif; }

        /* ─── NAV ─── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 52px;
          background: #F0EDE6;
          border-bottom: 1px solid rgba(15,15,15,0.12);
        }
        .nav-id {
          font-family: 'Geist Mono', monospace;
          font-size: 0.72rem; font-weight: 400;
          letter-spacing: 0.02em; color: #0F0F0F;
        }
        .nav-links { display: flex; align-items: center; gap: 36px; list-style: none; }
        .nav-links a {
          font-family: 'Geist Mono', monospace;
          font-size: 0.7rem; font-weight: 400;
          color: #888; text-decoration: none; letter-spacing: 0.08em;
          text-transform: lowercase; cursor: pointer; transition: color 0.15s;
        }
        .nav-links a:hover, .nav-links a.active { color: #0F0F0F; }
        .nav-cv {
          font-family: 'Geist Mono', monospace; font-size: 0.68rem;
          background: #0F0F0F; color: #F0EDE6;
          padding: 6px 14px; text-decoration: none; letter-spacing: 0.06em;
          transition: opacity 0.15s;
        }
        .nav-cv:hover { opacity: 0.75; }

        .hamburger {
          display: none; background: none; border: none; cursor: pointer;
          flex-direction: column; gap: 5px; padding: 2px;
        }
        .hamburger span { display: block; width: 20px; height: 1px; background: #0F0F0F; transition: all 0.2s; }

        .mobile-menu {
          display: none; position: fixed; inset: 0;
          background: #0F0F0F; z-index: 199;
          flex-direction: column; align-items: center; justify-content: center; gap: 28px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          font-family: 'DM Serif Display', serif;
          font-size: 2.8rem; color: #F0EDE6;
          text-decoration: none; cursor: pointer;
          letter-spacing: -0.02em;
        }
        .mobile-menu a:hover { font-style: italic; }

        /* ─── HERO ─── */
        .hero {
          min-height: 100vh;
          padding: 120px 48px 72px;
          display: grid;
          grid-template-rows: 1fr auto;
          border-bottom: 1px solid rgba(15,15,15,0.12);
        }
        .hero-top {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          align-items: end;
        }
        .hero-name-block { padding-bottom: 0; }
        .hero-eyebrow {
          font-family: 'Geist Mono', monospace;
          font-size: 0.68rem; font-weight: 400;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #888; margin-bottom: 24px;
          display: flex; align-items: center; gap: 12px;
        }
        .hero-eyebrow::after { content: ''; display: block; width: 32px; height: 1px; background: #888; }

        .hero-name {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(2.8rem, 5.5vw, 5.2rem);
          font-weight: 400;
          line-height: 1.0;
          letter-spacing: -0.02em;
          color: #0F0F0F;
        }
        .hero-name .italic { font-style: italic; color: #5C5445; }

        .hero-right {
          padding-left: 72px;
          border-left: 1px solid rgba(15,15,15,0.12);
          display: flex; flex-direction: column; justify-content: flex-end;
          padding-bottom: 4px;
          gap: 20px;
        }

        .hero-bio {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 1.05rem;
          line-height: 1.75;
          color: #3A3530;
          font-weight: 300;
        }
        .hero-bio strong {
          font-weight: 600;
          color: #0F0F0F;
        }

        .hero-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .hero-chip {
          font-family: 'Geist Mono', monospace;
          font-size: 0.65rem; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          border: 1px solid rgba(15,15,15,0.25);
          color: #555; padding: 5px 10px;
        }
        .hero-chip.filled { background: #0F0F0F; color: #F0EDE6; border-color: #0F0F0F; }

        .hero-bottom {
          padding-top: 32px;
          margin-top: 28px;
          border-top: 1px solid rgba(15,15,15,0.12);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .hero-status {
          font-family: 'Geist Mono', monospace;
          font-size: 0.68rem; color: #888;
          display: flex; align-items: center; gap: 8px;
        }
        .status-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #4CAF50;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .hero-ctas { display: flex; gap: 10px; }

        /* ─── BUTTONS ─── */
        .btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Geist Mono', monospace;
          font-size: 0.72rem; font-weight: 500;
          letter-spacing: 0.06em; text-decoration: none;
          cursor: pointer; transition: all 0.18s;
          border: none;
        }
        .btn-solid { background: #0F0F0F; color: #F0EDE6; padding: 11px 22px; }
        .btn-solid:hover { background: #3A3530; }
        .btn-outline { background: transparent; color: #0F0F0F; padding: 10px 22px; border: 1px solid rgba(15,15,15,0.3); }
        .btn-outline:hover { border-color: #0F0F0F; }
        .btn-ghost { background: transparent; color: #888; padding: 7px 14px; border: 1px solid rgba(15,15,15,0.15); font-size: 0.67rem; }
        .btn-ghost:hover { color: #0F0F0F; border-color: rgba(15,15,15,0.4); }

        /* ─── SECTIONS ─── */
        section { padding: 88px 48px; border-bottom: 1px solid rgba(15,15,15,0.12); }
        section:last-of-type { border-bottom: none; }
        .section-inner { max-width: 1200px; margin: 0 auto; }

        .section-label {
          font-family: 'Geist Mono', monospace;
          font-size: 0.65rem; font-weight: 400;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: #888; margin-bottom: 52px;
          display: flex; align-items: center; gap: 16px;
        }
        .section-label::before { content: ''; display: block; width: 20px; height: 1px; background: #888; }

        /* ─── SKILLS ─── */
        .skills-wrap { display: grid; grid-template-columns: repeat(3, 1fr); }
        .skill-cell {
          padding: 32px 28px;
          border-right: 1px solid rgba(15,15,15,0.1);
          border-bottom: 1px solid rgba(15,15,15,0.1);
        }
        .skill-cell:nth-child(3n) { border-right: none; }
        .skill-cell:nth-last-child(-n+3) { border-bottom: none; }

        .skill-cat {
          font-family: 'Geist Mono', monospace;
          font-size: 0.63rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #888; margin-bottom: 14px;
        }
        .skill-pills { display: flex; flex-wrap: wrap; gap: 5px; }
        .skill-pill {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 0.8rem; font-weight: 400;
          color: #3A3530; padding: 4px 10px;
          background: rgba(15,15,15,0.06);
          cursor: default; transition: all 0.12s;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .skill-pill:hover { background: #0F0F0F; color: #F0EDE6; }
        .skill-pill:hover .skill-logo { filter: brightness(0) invert(1); }
        .skill-logo {
          width: 14px; height: 14px; object-fit: contain;
          flex-shrink: 0; transition: filter 0.12s;
        }

        /* ─── PROJECTS ─── */
        .proj-tabs { display: flex; gap: 0; margin-bottom: 36px; }
        .proj-tab {
          font-family: 'Geist Mono', monospace; font-size: 0.7rem; font-weight: 400;
          color: #999; background: none; border: none; cursor: pointer;
          letter-spacing: 0.08em; text-transform: lowercase;
          padding: 10px 20px 10px 0; margin-right: 20px;
          border-bottom: 1px solid transparent;
          margin-bottom: -1px; transition: all 0.15s;
        }
        .proj-tab.active { color: #0F0F0F; border-bottom-color: #0F0F0F; }
        .proj-tab:hover { color: #0F0F0F; }

        .proj-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(15,15,15,0.12); }
        .proj-card {
          background: #F0EDE6; padding: 36px 32px;
          min-height: 220px; display: flex; flex-direction: column;
          gap: 16px; transition: background 0.18s; position: relative;
        }
        .proj-card:hover { background: #EAE7DF; }

        .proj-num {
          font-family: 'Geist Mono', monospace;
          font-size: 0.62rem; color: rgba(15,15,15,0.25); font-weight: 400;
        }
        .proj-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.25rem; line-height: 1.2;
          color: #0F0F0F; letter-spacing: -0.01em;
          flex: 1;
        }
        .proj-title.coming {
          font-style: italic; color: rgba(15,15,15,0.2);
          font-size: 1.1rem;
        }
        .proj-sub {
          font-family: 'Geist Mono', monospace;
          font-size: 0.65rem; color: #888; margin-top: -8px;
        }
        .proj-desc {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 0.85rem; line-height: 1.65;
          color: #5C5445; font-weight: 300;
        }
        .proj-footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
        .proj-tags { display: flex; gap: 5px; flex-wrap: wrap; }
        .proj-tag {
          font-family: 'Geist Mono', monospace;
          font-size: 0.6rem; font-weight: 400;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: #999; background: rgba(15,15,15,0.06); padding: 3px 7px;
        }

        /* ─── CERTS ─── */
        .cert-row {
          display: flex; align-items: center; gap: 20px;
          padding: 28px 0; border-bottom: 1px solid rgba(15,15,15,0.1);
        }
        .cert-row:first-child { border-top: 1px solid rgba(15,15,15,0.1); }
        .cert-icon {
          width: 52px; height: 52px; flex-shrink: 0;
          border: 1px solid rgba(15,15,15,0.1);
          background: #fff; display: flex; align-items: center; justify-content: center;
          padding: 8px;
        }
        .cert-icon img { width: 100%; height: 100%; object-fit: contain; }
        .cert-icon-fallback {
          width: 52px; height: 52px; flex-shrink: 0;
          background: #0F0F0F; display: flex; align-items: center; justify-content: center;
        }
        .cert-icon-fallback span {
          font-family: 'Geist Mono', monospace;
          font-size: 0.6rem; color: #F0EDE6; letter-spacing: 0.06em; text-align: center;
        }
        .cert-name {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 1rem; font-weight: 500; color: #0F0F0F; margin-bottom: 4px;
        }
        .cert-meta {
          font-family: 'Geist Mono', monospace;
          font-size: 0.65rem; color: #888; letter-spacing: 0.04em;
        }
        .cert-more {
          font-family: 'DM Serif Display', serif; font-style: italic;
          font-size: 0.95rem; color: rgba(15,15,15,0.3);
          padding: 28px 0;
        }

        /* ─── CONTACT ─── */
        .contact-wrap {
          display: grid; grid-template-columns: 5fr 7fr; gap: 80px; align-items: start;
        }
        .contact-headline {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 3vw, 2.8rem);
          line-height: 1.1; letter-spacing: -0.02em;
          color: #0F0F0F; margin-bottom: 32px;
        }
        .contact-headline em { font-style: italic; color: #5C5445; }

        .contact-list { display: flex; flex-direction: column; }
        .contact-item {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 16px 0; border-bottom: 1px solid rgba(15,15,15,0.1);
        }
        .contact-item:first-child { border-top: 1px solid rgba(15,15,15,0.1); }
        .contact-key {
          font-family: 'Geist Mono', monospace;
          font-size: 0.63rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: #888;
        }
        .contact-val {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 0.88rem; color: #0F0F0F;
          text-decoration: none; font-weight: 400;
        }
        .contact-val:hover { text-decoration: underline; text-underline-offset: 3px; }

        .form-wrap { display: flex; flex-direction: column; gap: 24px; }
        .form-label {
          font-family: 'Geist Mono', monospace;
          font-size: 0.62rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: #888;
          display: block; margin-bottom: 7px;
        }
        .form-control {
          width: 100%; background: transparent;
          border: none; border-bottom: 1px solid rgba(15,15,15,0.2);
          padding: 10px 0; font-size: 0.95rem;
          color: #0F0F0F; outline: none;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 300;
          transition: border-color 0.15s;
        }
        .form-control:focus { border-bottom-color: #0F0F0F; }
        .form-control::placeholder { color: rgba(15,15,15,0.25); }
        textarea.form-control { resize: none; }

        /* ─── FOOTER ─── */
        footer {
          padding: 20px 48px;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 8px;
          border-top: 1px solid rgba(15,15,15,0.12);
        }
        .footer-left {
          font-family: 'Geist Mono', monospace;
          font-size: 0.65rem; color: #888; font-weight: 400;
        }
        .footer-right {
          font-family: 'Geist Mono', monospace;
          font-size: 0.65rem; color: rgba(15,15,15,0.25);
        }

        /* ─── TOAST ─── */
        .toast {
          position: fixed; bottom: 32px; left: 50%;
          transform: translateX(-50%) translateY(20px);
          background: #0F0F0F; color: #F0EDE6;
          font-family: 'Geist Mono', monospace;
          font-size: 0.7rem; letter-spacing: 0.08em;
          padding: 12px 24px; opacity: 0;
          transition: all 0.3s; pointer-events: none; z-index: 999;
        }
        .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

        /* ─── MOBILE ─── */
        @media (max-width: 900px) {
          .nav { padding: 0 24px; }
          .nav-links, .nav-cv { display: none; }
          .hamburger { display: flex; }

          section { padding: 64px 24px; }
          .hero { padding: 96px 24px 56px; }

          .hero-top { grid-template-columns: 1fr; gap: 40px; }
          .hero-right { border-left: none; border-top: 1px solid rgba(15,15,15,0.12); padding-left: 0; padding-top: 32px; }

          .hero-name { font-size: clamp(2.4rem, 10vw, 3.5rem); }

          .skills-wrap { grid-template-columns: 1fr 1fr; }
          .skill-cell:nth-child(2n) { border-right: none; }
          .skill-cell:nth-child(3n) { border-right: 1px solid rgba(15,15,15,0.1); }
          .skill-cell:nth-child(2n) { border-right: none; }

          .proj-grid { grid-template-columns: 1fr; }
          .contact-wrap { grid-template-columns: 1fr; gap: 48px; }
          footer { padding: 20px 24px; }
        }

        @media (max-width: 600px) {
          .skills-wrap { grid-template-columns: 1fr; }
          .skill-cell { border-right: none !important; }
          .skill-cell:nth-last-child(-n+1) { border-bottom: none; }
        }
      `}</style>

      <div className={"toast" + (formSent ? " show" : "")}>Message opened in your mail client</div>

      {/* NAV */}
      <nav className="nav">
        <span className="nav-id mono">mulisa-matshinge.v1</span>
        <ul className="nav-links">
          {NAV_LINKS.map((n) => (
            <li key={n}>
              <a
                className={activeSection === n.toLowerCase() ? "active" : ""}
                onClick={() => scrollTo(n.toLowerCase())}
              >{n.toLowerCase()}</a>
            </li>
          ))}
        </ul>
        <a href={CV_URL} target="_blank" rel="noreferrer" className="nav-cv mono">↓ cv</a>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={"mobile-menu" + (menuOpen ? " open" : "")}>
        {NAV_LINKS.map((n) => (
          <a key={n} onClick={() => scrollTo(n.toLowerCase())}>{n}</a>
        ))}
      </div>

      {/* HERO */}
      <section id="about" ref={(el) => (sectionsRef.current.about = el)} className="hero">
        <div className="section-inner">
          <div className="hero-top">
            <div className="hero-name-block">
              <p className="hero-eyebrow mono">Data Engineer · Analyst · Pretoria, ZA</p>
              <h1 className="hero-name serif">
                Tshisikhawe<br />
                <span className="italic">Mulisa</span><br />
                Matshinge
              </h1>
            </div>

            <div className="hero-right">
              <p className="hero-bio sans">
                Final-year <strong>BIT (Business Systems)</strong> student at IIE Rosebank College and active trainee in the <strong>ALX Africa Data Engineering Programme</strong>. I've built end-to-end data solutions, from SQL transformation pipelines in BigQuery that score and segment customers, to 10-page drill-through Power BI reports tracking infrastructure projects across five provinces.
                <br /><br />
                My stack spans <strong>Python, SQL, Power BI, Azure, and GCP</strong>, with growing experience in data modelling (Kimball), ETL/ELT workflows, Docker, and Apache Kafka. I'm <strong>Microsoft AZ-900 certified</strong> and hold DataCamp credentials in SQL data engineering and database design.
                <br /><br />
                I'm looking for graduate roles in <strong>Data Engineering, Business Intelligence, or Business Analysis</strong> where I can contribute from day one and keep growing fast.
              </p>
              <div className="hero-chips">
                <span className="hero-chip filled mono">Open to work</span>
              </div>
            </div>
          </div>

          <div className="hero-bottom">
            <div className="hero-status mono">
              <span className="status-dot" />
              Available for graduate roles · Pretoria / Remote
            </div>
            <div className="hero-ctas">
              <a href={CV_URL} target="_blank" rel="noreferrer" className="btn btn-solid mono">↓ download cv</a>
              <button className="btn btn-outline mono" onClick={() => scrollTo("projects")}>view projects →</button>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" ref={(el) => (sectionsRef.current.skills = el)}>
        <div className="section-inner">
          <p className="section-label mono">Skills</p>
          <div className="skills-wrap">
            {skillsData.map(({ category, items }) => (
              <div key={category} className="skill-cell">
                <div className="skill-cat mono">{category}</div>
                <div className="skill-pills">
                  {items.map((item) => (
                    <span key={item} className="skill-pill sans">
                      {skillLogos[item] && (
                        <img
                          src={skillLogos[item]}
                          alt=""
                          className="skill-logo"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      )}
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" ref={(el) => (sectionsRef.current.projects = el)}>
        <div className="section-inner">
          <p className="section-label mono">Projects</p>
          <div className="proj-grid">
            {projectsData.map((p, i) => (
              <div key={i} className="proj-card">
                <span className="proj-num mono">0{i + 1}</span>
                {p.comingSoon ? (
                  <>
                    <span className="proj-title coming serif">coming soon</span>
                    <div className="proj-tags" style={{ marginTop: "auto" }}>
                      {p.tags.map((t) => <span key={t} className="proj-tag mono">{t}</span>)}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="proj-title serif">{p.title}</div>
                    <div className="proj-sub mono">{p.subtitle}</div>
                    <div className="proj-desc sans">{p.desc}</div>
                    <div className="proj-footer">
                      <div className="proj-tags">
                        {p.tags.map((t) => <span key={t} className="proj-tag mono">{t}</span>)}
                      </div>
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noreferrer" className="btn btn-ghost mono">
                          github ↗
                        </a>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="cert-more serif" style={{ marginTop: 0, borderTop: "1px solid rgba(15,15,15,0.1)", paddingTop: 28 }}>More on the way.</div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" ref={(el) => (sectionsRef.current.certifications = el)}>
        <div className="section-inner">
          <p className="section-label mono">Certifications</p>
          {certificationsData.map((cert, i) => (
            <div key={i} className="cert-row">
              {cert.logo ? (
                <div className="cert-icon">
                  <img src={cert.logo} alt={cert.code} onError={(e) => { e.target.parentElement.innerHTML = `<span class="mono" style="font-size:0.55rem;color:#888;text-align:center;padding:4px;">${cert.code}</span>`; }} />
                </div>
              ) : (
                <div className="cert-icon-fallback">
                  <span className="mono">{cert.code.slice(0, 3).toUpperCase()}</span>
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div className="cert-name sans">{cert.name}</div>
                <div className="cert-meta mono">{cert.issuer} · {cert.year}</div>
              </div>
              {cert.verifyUrl !== "#" && (
                <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="btn btn-ghost mono">verify ↗</a>
              )}
            </div>
          ))}
          <div className="cert-more serif">More on the way.</div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={(el) => (sectionsRef.current.contact = el)}>
        <div className="section-inner">
          <p className="section-label mono">Contact</p>
          <div className="contact-wrap">
            <div>
              <h2 className="contact-headline serif">
                Let's build something <em>meaningful</em>
              </h2>
              <div className="contact-list">
                {[
                  { key: "Email", val: "mulisamatshinge4@gmail.com", href: "mailto:mulisamatshinge4@gmail.com" },
                  { key: "LinkedIn", val: "mulisa-matshinge", href: "https://www.linkedin.com/in/mulisa-matshinge" },
                  { key: "GitHub", val: "MulisaMatshinge", href: "https://github.com/MulisaMatshinge" },
                  { key: "Location", val: "Pretoria, South Africa", href: null },
                ].map(({ key, val, href }) => (
                  <div key={key} className="contact-item">
                    <span className="contact-key mono">{key}</span>
                    {href ? (
                      <a href={href} className="contact-val sans">{val}</a>
                    ) : (
                      <span className="contact-val sans" style={{ color: "#888" }}>{val}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-wrap">
              {[
                { label: "Name", key: "name", type: "input", placeholder: "Your name" },
                { label: "Email", key: "email", type: "input", placeholder: "your@email.com" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="form-label mono">{label}</label>
                  <input
                    className="form-control sans"
                    placeholder={placeholder}
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  />
                </div>
              ))}
              <div>
                <label className="form-label mono">Message</label>
                <textarea
                  className="form-control sans"
                  placeholder="What are you working on?"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button
                className="btn btn-solid mono"
                onClick={handleSend}
                disabled={!formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
                style={{
                  opacity: (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) ? 0.35 : 1,
                  alignSelf: "flex-start",
                  cursor: (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) ? "not-allowed" : "pointer",
                }}
              >
                send message →
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <span className="footer-left mono">© 2026 Tshisikhawe Mulisa Matshinge</span>
        <span className="footer-right mono">data engineering · business analysis · pretoria</span>
      </footer>
    </div>
  );
}
