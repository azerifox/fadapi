import Terminal from "./terminal";
import HelpText, { CommandHelp } from "./help";
import styles from "./Picker.module.css";
import { useEffect, useState } from "react";
import { Command, commands } from "./commands";

export default function Picker() {
  const [prompt, setPrompt] = useState("");
  const [activeCommand, setActiveCommand] = useState<Command | null>(null);

  function changePrompt(commandText: string) {
    setPrompt(commandText);
  }

  function changeActiveCommand(commandId: string) {
    const activeCommand = commands[commandId];
    activeCommand.onExecutionDone = handleExecutionDone;

    setPrompt("");
    setActiveCommand(activeCommand);
  }

  function handleExecutionDone() {
    console.log("execution done");
    setActiveCommand(null);
  }

  return (
    <div className={styles.row}>
      <Terminal prompt={prompt} activeCommand={activeCommand} />
      <HelpText>
        <CommandHelp
          commandId="pick"
          name="pick"
          description="Like spin the bottle, only without the bottle, the kissing, and the awkward teenage moments - just pure, unfiltered team moderation!"
          onHoverChange={changePrompt}
          onCommandClick={changeActiveCommand}
          options={[
            {
              option: "--quick",
              text: "to skip the suspense.",
              optionId: "quickpick",
            },
          ]}
        />
        <CommandHelp
          commandId="list"
          name="list"
          description="Unleash your inner detective and find out who's already moderated the daily stand-up, and give them a break. The team that moderates together, grows together. Who's next?"
          onHoverChange={changePrompt}
          onCommandClick={changeActiveCommand}
        />
        <CommandHelp
          commandId="reset"
          name="reset"
          description="Whoopsie, the chosen one is on a beach sipping margaritas instead of moderating the daily stand-up? Reset to the rescue!"
          onHoverChange={changePrompt}
          onCommandClick={changeActiveCommand}
        />
        <CommandHelp
          commandId="login"
          name="login"
          description="You shall not pass! Unless you identify yourself with the login command, that is."
          onHoverChange={changePrompt}
          onCommandClick={changeActiveCommand}
        />
      </HelpText>
    </div>
  );
}
