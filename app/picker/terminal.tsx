import styles from "./Picker.module.css";

interface TerminalProps {
  prompt?: string;
}
export default function Terminal({prompt}: TerminalProps) {
  return (
    <div className={styles.terminal}>
      <Prompt active={true}>{prompt}</Prompt>
      {/* {Array.from({length: 40}, (_, index) => (
        <div key={index}>Some test text...</div>
      ))} */}
    </div>
  );
}

interface PromptProps {
  active: boolean;
  children?: string;
}
const Prompt = ({ active, children }: PromptProps) => {
  return (
    <div>
      <span className={styles.prompt}>$ guest@cupo</span>
      {children}
      {active ? <span className={styles.blink} /> : ""}
    </div>
  );
};
