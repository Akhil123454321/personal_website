"use client";

import { useRef, useState } from "react";
import { CONTENTS } from "../utils/commandHelper";
import Command from "./Command";
import styles from "./Terminal.module.css";

export default function Terminal() {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentInput, setCurrentInput] = useState("");
  const terminalRef = useRef(null);

  const escapeHTML = (str) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const addCommand = async (command) => {
    let output;
    setLoading(true);

    setHistory((prev) => [...prev, command]);
    setHistoryIndex(-1);
    setCurrentInput("");

    if (`${command}` in CONTENTS) {
      output = await CONTENTS[`${command}`]();
    } else if (command === "clear") {
      setLoading(false);
      setCommands([]);
      return;
    } else {
      output = CONTENTS.error(escapeHTML(command));
    }

    setLoading(false);
    setCommands((prev) => [...prev, { command, output }]);

    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(history[history.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    } else if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setCommands([]);
    }
  };

  return (
    <div className={styles.terminal} ref={terminalRef}>
      {commands.map(({ command, output }, index) => (
        <Command command={command} output={output} key={index} />
      ))}
      {!loading && (
        <Command
          onSubmit={(command) => addCommand(command)}
          inputValue={currentInput}
          onInputChange={setCurrentInput}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
}