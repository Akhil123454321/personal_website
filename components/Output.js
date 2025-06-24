import styles from "./Output.module.css";

export default function Output({ output }) {
  return output ? (
    <div
      className={styles.output}
      dangerouslySetInnerHTML={{ __html: output }}
    ></div>
  ) : null;
}