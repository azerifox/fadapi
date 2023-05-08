import { useEffect, useState } from "react";
import styles from "./Picker.module.css";
import { getRandomInt } from "../calculations";
import generateAsciiArtOutput from "./ascii-art";

interface TerminalProps {
  prompt?: string;
}
export default function Terminal({ prompt }: TerminalProps) {
  const [promptBuffer, setPromptBuffer] = useState("");
  const [bufferIndex, setBufferIndex] = useState(0);
  const [output, setOutput] = useState<string[]>([]);

  useEffect(() => {
    const asciiArtLines = generateAsciiArtOutput("John Doe");
    setOutput(asciiArtLines);
    setPromptBuffer("");
    setBufferIndex(0);
  }, [prompt]);

  useEffect(() => {
    if (prompt && bufferIndex < prompt?.length) {
      const timer = setTimeout(() => {
        setPromptBuffer(
          (previousBufferText) => previousBufferText + prompt[bufferIndex]
        );
        setBufferIndex((previousIndex) => previousIndex + 1);
      }, getRandomInt(10, 200));
      return () => clearTimeout(timer);
    }
  }, [prompt, bufferIndex]);

  return (
    <div className={styles.terminal}>
      <Prompt active={true}>{promptBuffer}</Prompt>
      {output.map((line, index) => (
        <div key={index} className={styles.output}>
          {line}
        </div>
      ))}
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
      <span className={styles.input}>{children}</span>
      {active ? <span className={styles.blink} /> : ""}
    </div>
  );
};
