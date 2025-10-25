// src/App.jsx
import { useRef } from "react";
import SidePanel from "./components/SidePanel";
import Terminal from "./components/Terminal";
import "./styles/index.css";

export default function App() {
  const terminalRef = useRef(null);

  const handleCommand = (cmd) => {
    const didRunDirectly = Boolean(terminalRef.current?.runCommand);
    terminalRef.current?.runCommand?.(cmd);

    if (!didRunDirectly) {
      window.dispatchEvent(new CustomEvent("terminal:command", { detail: cmd }));
    }
  };

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
