import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Picker.module.css";
import { getRandomInt } from "../calculations";
import { Command } from "./commands";

interface TerminalProps {
  prompt: string;
  activeCommand: Command | null;
}
export default function Terminal({ prompt, activeCommand }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [promptBuffer, setPromptBuffer] = useState("");
  const [bufferIndex, setBufferIndex] = useState(0);
  const [outputHistory, setOutputHistory] = useState<OutputLine[]>([]);
  const [commandOutput, setCommandOutput] = useState<OutputLine[]>([]);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 10);
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    if (activeCommand) {
      const historyPrompt: OutputLine = {
        type: "prompt",
        content: activeCommand.commandText,
      };
      setOutputHistory((oldHistory) => [...oldHistory, historyPrompt]);

      const activeCommandOutput =
        activeCommand.processingSteps.flatMap<OutputLine>((step) => {
          const outputLines = step.output();
          return outputLines.map((line, index) => ({
            type: "text",
            content: line,
            suspense: index === 0 ? step.artificialDelay : 0,
          }));
        });
      setCommandOutput(activeCommandOutput);
      scrollToBottom();
    }
  }, [activeCommand]);

  const handleOutputDone = () => {
    if (activeCommand) {
      setOutputHistory((oldHistory) => [...oldHistory, ...commandOutput]);
      setCommandOutput([]);
      activeCommand.onExecutionDone();
      scrollToBottom();
    }
  };

  const activeElement = activeCommand ? (
    <Output
      lines={commandOutput}
      onOutputChanged={scrollToBottom}
      onOutputDone={handleOutputDone}
    />
  ) : (
    <Prompt active={true}>{promptBuffer}</Prompt>
  );

  return (
    <div ref={terminalRef} className={styles.terminal}>
      <OutputHistory lines={outputHistory} />
      {activeElement}
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
  suspense?: number | undefined;
}

interface OutputProps {
  lines: OutputLine[];
  onOutputChanged: () => void;
  onOutputDone: () => void;
}
const Output = ({ lines, onOutputChanged, onOutputDone }: OutputProps) => {
  const [lineBuffer, setLineBuffer] = useState<string[]>([]);
  const [bufferIndex, setBufferIndex] = useState(0);

  useEffect(() => {
    setLineBuffer([]);
    setBufferIndex(0);
  }, [lines]);

  useEffect(() => {
    if (bufferIndex < lines.length) {
      console.log(
        `setting timout of ${lines[bufferIndex].suspense} for index ${bufferIndex}`
      );

      const timer = setTimeout(() => {
        setLineBuffer((previousContent) => [
          ...previousContent,
          lines[bufferIndex].content,
        ]);
        setBufferIndex((previousBufferIndex) => previousBufferIndex + 1);
        onOutputChanged();
      }, lines[bufferIndex].suspense ?? 0);

      return () => clearTimeout(timer);
    } else if (lines.length > 0) {
      onOutputDone();
    } else {
      console.log("no output lines to process");
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

interface OutputHistoryProps {
  lines: OutputLine[];
}
const OutputHistory = ({ lines }: OutputHistoryProps) => {
  return (
    <>
      {lines.map((line, index) =>
        line.type === "prompt" ? (
          <Prompt key={index} active={false}>
            {line.content}
          </Prompt>
        ) : (
          <div key={index} className={styles.output}>
            {line.content}
          </div>
        )
      )}
    </>
  );
};
