import { MouseEventHandler, ReactElement } from "react";
import styles from "./Picker.module.css";

interface HelpTextProps {
  children: ReactElement<typeof CommandHelp>[];
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
  children: ReactElement<typeof CommandHelp>[];
}
const CommandList = ({ children }: CommandListProps) => {
  return <div>{children}</div>;
};

interface commandHelpProps {
  commandId: string;
  name: string;
  description: string;
  onHoverChange: (commandText: string) => void;
  onCommandClick: (commandId: string) => void;
  options?: { option: string; text: string; optionId: string }[];
}
export const CommandHelp = ({
  commandId,
  name,
  description,
  onHoverChange,
  onCommandClick,
  options,
}: commandHelpProps) => {
  return (
    <div className={styles["command-row"]}>
      <div
        className={styles.command}
        onMouseOver={() => onHoverChange(`fadapi ${name}`)}
        onMouseLeave={() => onHoverChange("")}
        onClick={() => onCommandClick(commandId)}
      >
        {name}
      </div>
      <div className={styles.description}>
        {description}
        {options &&
          options.map(({ option, text, optionId }) => (
            <span key={option}>
              Use
              <span
                className={styles.option}
                onMouseOver={() => onHoverChange(`fadapi ${name} ${option}`)}
                onMouseLeave={() => onHoverChange("")}
                onClick={() => onCommandClick(optionId)}
              >
                {option}
              </span>
              {text}
            </span>
          ))}
      </div>
    </div>
  );
};
