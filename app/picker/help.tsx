import { ReactElement } from "react";
import styles from "./Picker.module.css";

interface HelpTextProps {
  children: ReactElement<typeof Command>[];
}
export default function HelpText({ children }: HelpTextProps) {
  return (
    <div className={styles.help}>
      <div className={styles["help-prompt"]}>
        <span className={styles.accent}>$ guest@cupo</span> fadapi --help
      </div>
      <div className={styles["help-output"]}>fadapi [command] [option]</div>
      <div className={styles["help-output"]}>commands:</div>
      <CommandList>{children}</CommandList>
    </div>
  );
}

interface CommandListProps {
  children: ReactElement<typeof Command>[];
}
const CommandList = ({ children }: CommandListProps) => {
  return <div>{children}</div>;
};

interface commandProps {
  name: string;
  description: string;
  options?: { option: string; text: string }[];
}
export const Command = ({ name, description, options }: commandProps) => {
  return (
    <div className={styles["command-row"]}>
      <div className={styles.command}>{name}</div>
      <div className={styles.description}>
        {description}
        {options &&
          options.map(({ option, text }) => (
            <span key={option}>
              Use
              <span className={styles.option}>{option}</span>
              {text}
            </span>
          ))}
      </div>
    </div>
  );
};
