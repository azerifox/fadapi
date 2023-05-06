import Terminal from "./terminal";
import HelpText, { Command } from "./help";
import styles from "./Picker.module.css";

export default function Picker() {
  return (
    <div className={styles.row}>
      <Terminal />
      <HelpText>
        <Command
          name="pick"
          description="Like spin the bottle, only without the bottle, the kissing, and the awkward teenage moments - just pure, unfiltered team moderation!"
          options={[{ option: "--quick", text: "to skip the suspense." }]}
        />
        <Command
          name="list"
          description="Unleash your inner detective and find out who's already moderated the daily stand-up, and give them a break. The team that moderates together, grows together. Who's next?"
        />
        <Command
          name="reset"
          description="Whoopsie, the chosen one is on a beach sipping margaritas instead of moderating the daily stand-up? Reset to the rescue!"
        />
        <Command
          name="login"
          description="You shall not pass! Unless you identify yourself with the login command, that is."
        />
      </HelpText>
    </div>
  );
}
