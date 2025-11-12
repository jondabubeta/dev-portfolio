// src/App.jsx
import { useRef, useState, useEffect } from "react";
import SidePanel from "./components/SidePanel";
import Terminal from "./components/Terminal";
import ProjectTemplate from "./components/templates/ProjectTemplate";

import ResumePage from "./pages/ResumePage";
import SkillsPage from "./pages/SkillsPage";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile and manage sidebar state
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(window.innerWidth >= 768);
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

    // Close sidebar on mobile when command is executed
    if (isMobile) {
      setIsSidebarOpen(false);
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
      return <ProjectTemplate project={project} />;
    }
    // /resume
    if (pathname === "/resume") {
      return <ResumePage />;
    }
    // /skills
    if (pathname === "/skills") {
      return <SkillsPage />;
    }
  } catch (e) {
    // window may be undefined during SSR; ignore
  }

  return (
    <div className="page-wrapper">
      {/* Mobile Header with Hamburger */}
      <header className="mobile-header">
        <button 
          className={`hamburger-btn ${isSidebarOpen ? 'hamburger-open' : ''}`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        <h1 className="mobile-title">Terminal Portfolio</h1>
      </header>

      {/* Mobile Overlay */}
      {isSidebarOpen && isMobile && (
        <div 
          className="mobile-overlay"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 🧩 Left Column */}
      <aside className={`side-panel ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <SidePanel onCommand={handleCommand} />
      </aside>

      {/* 💻 Right Column (main terminal) */}
      <main className="terminal-panel">
        <div className="terminal-wrapper">
          <Terminal ref={terminalRef} />
        </div>
      </main>
    </div>
  );
}
