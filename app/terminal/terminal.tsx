import styles from "../terminal/Terminal.module.css";

export default function Terminal() {
  return (
    <div className={styles.terminal}>
      <div className={styles.prompt}>$ guest@cupo</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
    </div>
  );
}
