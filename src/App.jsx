// src/App.jsx
import { useRef, useState, useEffect, lazy, Suspense } from "react";
import SidePanel from "./components/SidePanel";
import Terminal from "./components/Terminal";
import Footer from "./components/Footer";
const ProjectTemplate = lazy(() => import("./components/templates/ProjectTemplate"));

const ResumePage = lazy(() => import("./pages/ResumePage"));
const CoverPage = lazy(() => import("./pages/CoverPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

import projects from "./data/projects";
import "./styles/index.css";

function slugify(name = "") {
  return String(name)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getProjectSlugFromPath(pathname = "") {
  const match = String(pathname).match(/^\/projects\/([^/]+)\/?$/);
  return match ? match[1] : null;
}

function normalizePath(pathname = "") {
  return String(pathname || "/").replace(/\/+$/, "") || "/";
}

function getEmbeddedViewFromPath(pathname = "") {
  const normalized = normalizePath(pathname);
  const projectSlug = getProjectSlugFromPath(normalized);
  if (projectSlug) {
    return { kind: "project", slug: projectSlug, path: `/projects/${projectSlug}` };
  }

  if (normalized === "/resume") {
    return { kind: "doc", doc: "resume", path: "/resume" };
  }

  if (normalized === "/cv" || normalized === "/cover") {
    return { kind: "doc", doc: "cover", path: "/cv" };
  }

  if (normalized === "/skills") {
    return { kind: "doc", doc: "skills", path: "/skills" };
  }

  if (normalized === "/about") {
    return { kind: "doc", doc: "about", path: "/about" };
  }

  return null;
}

export default function App() {
  const terminalRef = useRef(null);
  const closeProjectTimer = useRef(null);
  const pendingTerminalCommand = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isProjectClosing, setIsProjectClosing] = useState(false);
  const [activeEmbeddedView, setActiveEmbeddedView] = useState(() => {
    try {
      return getEmbeddedViewFromPath(window.location.pathname || "/");
    } catch (e) {
      return null;
    }
  });

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const syncProjectRoute = () => {
      setActiveEmbeddedView(getEmbeddedViewFromPath(window.location.pathname || "/"));
    };

    window.addEventListener('popstate', syncProjectRoute);
    return () => window.removeEventListener('popstate', syncProjectRoute);
  }, []);

  const handleCommand = (cmd) => {
    if (activeEmbeddedView) {
      pendingTerminalCommand.current = cmd;
      closeEmbeddedView();
      return;
    }

    const didRunDirectly = Boolean(terminalRef.current?.runCommand);
    terminalRef.current?.runCommand?.(cmd);

    if (!didRunDirectly) {
      window.dispatchEvent(new CustomEvent("terminal:command", { detail: cmd }));
    }
  };

  const openInPlace = (url) => {
    const targetView = getEmbeddedViewFromPath(url);
    if (!targetView) return;

    if (closeProjectTimer.current) {
      window.clearTimeout(closeProjectTimer.current);
      closeProjectTimer.current = null;
    }

    setIsProjectClosing(false);
    setActiveEmbeddedView(targetView);

    const pathname = normalizePath(window.location.pathname || "/");
    if (pathname !== targetView.path) {
      window.history.pushState({}, '', targetView.path);
    }
  };

  const closeEmbeddedView = () => {
    if (!activeEmbeddedView || isProjectClosing) return;

    setIsProjectClosing(true);
    closeProjectTimer.current = window.setTimeout(() => {
      setActiveEmbeddedView(null);
      setIsProjectClosing(false);
      closeProjectTimer.current = null;
    }, 260);

    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
  };

  useEffect(() => {
    if (activeEmbeddedView || !pendingTerminalCommand.current) return;

    const command = pendingTerminalCommand.current;
    pendingTerminalCommand.current = null;

    const runCommandTimer = window.setTimeout(() => {
      if (terminalRef.current?.runCommand) {
        terminalRef.current.runCommand(command);
      } else {
        window.dispatchEvent(new CustomEvent("terminal:command", { detail: command }));
      }
    }, 0);

    return () => window.clearTimeout(runCommandTimer);
  }, [activeEmbeddedView]);

  useEffect(() => {
    return () => {
      if (closeProjectTimer.current) {
        window.clearTimeout(closeProjectTimer.current);
      }
    };
  }, []);

  const activeProject = activeEmbeddedView?.kind === "project"
    ? projects.find((p) => slugify(p.title) === activeEmbeddedView.slug)
    : null;
  const activeEmbeddedKey = activeEmbeddedView?.path || "terminal";

  return (
    <div className="page-wrapper">
      <div className="main-content">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside className="side-panel" role="complementary" aria-label="Sidebar">
            <SidePanel onCommand={handleCommand} onNavigateProject={openInPlace} onNavigateDocument={openInPlace} />
          </aside>
        )}

        {/* Terminal / in-place project view */}
        <main className="terminal-panel" aria-label="Terminal">
          <div className="terminal-wrapper">
            {activeEmbeddedView ? (
              <div className={`project-embedded-shell${isProjectClosing ? ' is-closing' : ''}`}>
                <div className="project-embedded-bar">
                  <button className="project-embedded-back" onClick={closeEmbeddedView} type="button">
                    <span className="project-embedded-back-arrow" aria-hidden="true">←</span>
                    <span>Return to Terminal</span>
                  </button>
                </div>
                <Suspense fallback={<div className="loading">Loading…</div>}>
                  {activeEmbeddedView.kind === "project" ? (
                    <ProjectTemplate key={activeEmbeddedKey} project={activeProject} embedded={true} />
                  ) : activeEmbeddedView.doc === "resume" ? (
                    <ResumePage key={activeEmbeddedKey} onNavigatePage={openInPlace} />
                  ) : activeEmbeddedView.doc === "about" ? (
                    <AboutPage key={activeEmbeddedKey} />
                  ) : activeEmbeddedView.doc === "skills" ? (
                    <SkillsPage key={activeEmbeddedKey} />
                  ) : (
                    <CoverPage key={activeEmbeddedKey} onNavigatePage={openInPlace} />
                  )}
                </Suspense>
              </div>
            ) : (
              <Terminal ref={terminalRef} />
            )}
          </div>
        </main>
      </div>

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

      {/* Footer - spans both columns on desktop */}
      {!isMobile && <Footer />}
    </div>
  );
}
