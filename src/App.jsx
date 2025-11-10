// src/App.jsx
import { useRef } from "react";
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
      {/* 🧩 Left Column */}
      <aside className="side-panel">
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
