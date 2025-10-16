// src/App.jsx
import { useRef } from "react";
import SidePanel from "./components/SidePanel";
import Terminal from "./components/Terminal";
import "./styles/index.css";

export default function App() {
  const terminalRef = useRef(null);

  const handleCommand = (cmd) => {
    // 1) Call the terminal instance directly (preferred)
    terminalRef.current?.runCommand?.(cmd);

    // 2) Also emit to the global bus (safe fallback if no ref)
    window.dispatchEvent(new CustomEvent("terminal:command", { detail: cmd }));
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
