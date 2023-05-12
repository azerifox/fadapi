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
    const asciiArtLines = generateAsciiArtOutput("abcdefghijklmnopqrstuvwxyz");
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

  const outputLines = output.map<OutputLine>((line) => ({
    type: "text",
    content: line,
    suspense: 50,
  }));

  return (
    <div className={styles.terminal}>
      <Prompt active={true}>{promptBuffer}</Prompt>
      <Output lines={outputLines} />
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

interface OutputLine {
  type: "prompt" | "text";
  content: string;
  suspense: number | null;
}
interface OutputProps {
  lines: OutputLine[];
}
const Output = ({ lines }: OutputProps) => {
  const [lineBuffer, setLineBuffer] = useState<string[]>([]);
  const [bufferIndex, setBufferIndex] = useState(0);

  useEffect(() => {
    setLineBuffer([]);
    setBufferIndex(0);
  }, [lines]);

  useEffect(() => {
    if (bufferIndex < lines.length) {
      const timer = setTimeout(() => {
        setLineBuffer((previousContent) => [
          ...previousContent,
          lines[bufferIndex].content,
        ]);
        setBufferIndex((previousBufferIndex) => previousBufferIndex + 1);
      }, lines[bufferIndex].suspense ?? 0);
      return () => clearTimeout(timer);
    }
  }, [lines, bufferIndex, lineBuffer]);

  return (
    <>
      {lineBuffer.map((line, index) => (
        <div key={index} className={styles.output}>
          {line}
        </div>
      ))}
    </>
  );
};
