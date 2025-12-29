// src/App.jsx
import { useRef, useState, useEffect, lazy, Suspense } from "react";
import SidePanel from "./components/SidePanel";
import Terminal from "./components/Terminal";
const ProjectTemplate = lazy(() => import("./components/templates/ProjectTemplate"));

const ResumePage = lazy(() => import("./pages/ResumePage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));

import projects from "./data/projects";
import "./styles/index.css";

function slugify(name = "") {
  return String(name)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function App() {
  const terminalRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCommand = (cmd) => {
    const didRunDirectly = Boolean(terminalRef.current?.runCommand);
    terminalRef.current?.runCommand?.(cmd);

    if (!didRunDirectly) {
      window.dispatchEvent(new CustomEvent("terminal:command", { detail: cmd }));
    }
  };


  // Client-side routes
  try {
    const pathname = window.location.pathname || "/";
    // /projects/:slug
    const m = pathname.match(/^\/projects\/([^/]+)\/?$/);
    if (m) {
      const slug = m[1];
      const project = projects.find((p) => slugify(p.title) === slug);
      return (
        <Suspense fallback={<div className="loading">Loading…</div>}>
          <ProjectTemplate project={project} />
        </Suspense>
      );
    }
    // /resume
    if (pathname === "/resume") {
      return (
        <Suspense fallback={<div className="loading">Loading…</div>}>
          <ResumePage />
        </Suspense>
      );
    }
    // /skills
    if (pathname === "/skills") {
      return (
        <Suspense fallback={<div className="loading">Loading…</div>}>
          <SkillsPage />
        </Suspense>
      );
    }
  } catch (e) {
    // window may be undefined during SSR; ignore
  }

  return (
    <div className="page-wrapper">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="side-panel" role="complementary" aria-label="Sidebar">
          <SidePanel onCommand={handleCommand} />
        </aside>
      )}

      {/* Terminal (full screen on mobile, right column on desktop) */}
      <main className="terminal-panel" aria-label="Terminal">
        <div className="terminal-wrapper">
          <Terminal ref={terminalRef} />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="mobile-bottom-nav" role="navigation" aria-label="Mobile navigation">
          <button 
            className="nav-btn"
            onClick={() => handleCommand('view about')}
            title="About"
          >
            <span className="nav-icon">👤</span>
            <span className="nav-label">About</span>
          </button>
          <button 
            className="nav-btn"
            onClick={() => handleCommand('view experience')}
            title="Experience"
          >
            <span className="nav-icon">💼</span>
            <span className="nav-label">Work</span>
          </button>
          <button 
            className="nav-btn"
            onClick={() => handleCommand('view skills')}
            title="Skills"
          >
            <span className="nav-icon">🛠️</span>
            <span className="nav-label">Skills</span>
          </button>
          <button 
            className="nav-btn"
            onClick={() => handleCommand('view projects')}
            title="Projects"
          >
            <span className="nav-icon">📁</span>
            <span className="nav-label">Projects</span>
          </button>
          <button 
            className="nav-btn"
            onClick={() => handleCommand('view contact')}
            title="Contact"
          >
            <span className="nav-icon">📧</span>
            <span className="nav-label">Contact</span>
          </button>
        </nav>
      )}
    </div>
  );
}
