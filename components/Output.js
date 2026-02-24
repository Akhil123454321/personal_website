import styles from "./Output.module.css";

export default function Output({ output }) {
  if (!output) return null;

  return (
    <div
      style={{
        whiteSpace: "normal",
        wordWrap: "break-word",
        fontSize: "14px",
        lineHeight: "1.6",
      }}
      dangerouslySetInnerHTML={{ __html: output }}
    />
  );
}