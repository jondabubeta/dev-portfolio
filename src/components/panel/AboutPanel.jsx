import PanelSection from "../common/PanelSection";
import { PanelRow } from "../common/PanelRow";
import TerminalIcon from "../common/TerminalIcon";
import DownloadIcon from "../common/DownloadIcon";
import TabIcon from "../common/TabIcon";

export default function AboutPanel({ onCommand }) {
  return (
    <PanelSection title="About">
      <div className="panel-table">
        <PanelRow c1="Name" c2={<span className="text-green">Jonathan Dabu</span>} c3="Engineer" />
        <PanelRow
          c1="Specialization"
          c2={<><span className="text-pink">Test Automation</span>, <span className="text-gold">Game Systems</span>, <span className="text-blue">Dev Tools</span></>}
          c3="Full-Stack QA"
        />
        <PanelRow
          c1="Resume"
          c2="PDF / Page"
          c3={
            <div className="doc-icons">
              <TerminalIcon command="view resume" onCommand={onCommand} title="Open in Terminal" />
              <DownloadIcon url="/files/JonathanDabu_Resume.pdf" filename="JonathanDabu_Resume.pdf" title="Download Resume" />
              <TabIcon url="/resume.html" title="Open Resume page" />
            </div>
          }
        />
      </div>
    </PanelSection>
  );
}
