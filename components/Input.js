"use client";

import { useEffect, useRef } from "react";
import styles from "./Input.module.css";

export default function Input({
  command,
  onSubmit,
  inputValue,
  onInputChange,
  onKeyDown,
  disabled,
}) {
  const inputRef = useRef(null);
  const isReadOnly = disabled || !!command;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isReadOnly && inputValue.trim()) {
      onSubmit(inputValue);
    }
  };

  useEffect(() => {
    if (!isReadOnly && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isReadOnly]);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="command">
        <span style={{ color: "#ff9e64" }}>λ</span> ::{" "}
        <span style={{ color: "var(--primary)" }}>~</span>{" "}
        <span style={{ color: "var(--secondary)" }}>&gt;&gt;</span>
      </label>

      <input
        id="command"
        type="text"
        className={styles.input}
        value={isReadOnly ? command : inputValue}
        onChange={(e) => !isReadOnly && onInputChange(e.target.value)}
        onKeyDown={(e) => !isReadOnly && onKeyDown?.(e)}
        disabled={isReadOnly}
        ref={inputRef}
        autoFocus={!isReadOnly}
        autoComplete="off"
        spellCheck={false}
        tabIndex={0}
      />
    </form>
  );
}