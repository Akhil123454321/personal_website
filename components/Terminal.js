"use client";

import { useEffect, useRef, useState } from "react";
import { CONTENTS } from "../utils/commandHelper";
import Command from "./Command";
import styles from "./Terminal.module.css";

export default function Terminal() {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentInput, setCurrentInput] = useState("");

  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMatches, setSearchMatches] = useState([]);
  const [searchMatchIndex, setSearchMatchIndex] = useState(0);

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

    const baseCommand = command.trim().split(" ")[0]; // <-- extract main command

    if (baseCommand in CONTENTS) {
      output = await CONTENTS[baseCommand](command); // pass full input as arg
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

  const getMatchingCommands = (input) => {
    const allCommands = Object.keys(CONTENTS);
    return allCommands.filter((cmd) => cmd.startsWith(input));
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
    } else if (e.ctrlKey && e.key.toLowerCase() === "c") {
      e.preventDefault();
      setCommands((prev) => [
        ...prev,
        { command: currentInput, output: "", isInterrupt: true },
      ]);
      setCurrentInput("");
      setHistoryIndex(-1);
      setSearchMode(false);
      setSearchQuery("");
      setSearchMatches([]);
      setSearchMatchIndex(0);
      setTimeout(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, 0);
    } else if (e.ctrlKey && e.key.toLowerCase() === "r") {
      e.preventDefault();
      if (!searchMode) {
        setSearchMode(true);
        setSearchQuery("");
        setSearchMatches([]);
        setSearchMatchIndex(0);
      } else if (searchMatches.length > 1) {
        setSearchMatchIndex((prev) => (prev + 1) % searchMatches.length);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = getMatchingCommands(currentInput);
      if (matches.length === 1) {
        setCurrentInput(matches[0]);
      } else if (matches.length > 1) {
        const formattedMatches = matches
          .map((cmd) => {
            const desc = CONTENTS[cmd]?.description || "";
            return `<div><b>${cmd.padEnd(15)}</b> ${desc}</div>`;
          })
          .join("");
        setCommands((prev) => [
          ...prev,
          { command: currentInput, output: formattedMatches },
        ]);
        setCurrentInput(currentInput);
      }
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const match = searchMatches[searchMatchIndex] || "";
      setSearchMode(false);
      setCurrentInput(match);
    } else if (e.ctrlKey && e.key.toLowerCase() === "c") {
      e.preventDefault();
      setSearchMode(false);
      setSearchQuery("");
      setSearchMatches([]);
      setSearchMatchIndex(0);
    } else if (e.key === "Backspace") {
      e.preventDefault();
      setSearchQuery((prev) => prev.slice(0, -1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSearchMatchIndex((prev) =>
        searchMatches.length === 0 ? 0 : (prev - 1 + searchMatches.length) % searchMatches.length
      );
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSearchMatchIndex((prev) =>
        searchMatches.length === 0 ? 0 : (prev + 1) % searchMatches.length
      );
    } else if (e.key.length === 1 && !e.ctrlKey) {
      e.preventDefault();
      setSearchQuery((prev) => prev + e.key);
    }
  };

  useEffect(() => {
    if (searchMode && searchQuery !== "") {
      const matches = history
        .slice()
        .reverse()
        .filter((cmd) => cmd.includes(searchQuery));
      setSearchMatches(matches);
      setSearchMatchIndex(0);
    } else {
      setSearchMatches([]);
    }
  }, [searchQuery, searchMode, history]);

  const highlightMatch = (command, query) => {
    if (!query || !command) return command;
    const parts = command.split(new RegExp(`(${query})`, "gi"));
    return parts
      .map((part, index) =>
        part.toLowerCase() === query.toLowerCase()
          ? `<mark style="background-color: #00ffaa33">${part}</mark>`
          : part
      )
      .join("");
  };

  return (
    <div className={styles.terminal} ref={terminalRef}>
      {commands.map(({ command, output, isInterrupt }, index) => (
        <Command
          key={index}
          command={command}
          output={output}
          isInterrupt={isInterrupt}
        />
      ))}

      {searchMode && (
        <div
          style={{
            fontFamily: "monospace",
            color: "#00ffaa",
            padding: "5px",
            whiteSpace: "pre-wrap",
          }}
          dangerouslySetInnerHTML={{
            __html: `(reverse-i-search)\`${searchQuery}\`: ${
              searchMatches[searchMatchIndex]
                ? highlightMatch(searchMatches[searchMatchIndex], searchQuery)
                : ""
            }`,
          }}
        />
      )}

      {!loading && (
        <Command
          onSubmit={(command) => addCommand(command)}
          inputValue={currentInput}
          onInputChange={setCurrentInput}
          onKeyDown={searchMode ? handleSearchKeyDown : handleKeyDown}
        />
      )}
    </div>
  );
}