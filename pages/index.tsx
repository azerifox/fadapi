import type { NextPage } from "next";
import Head from "next/head";
import styles from "../app/Home.module.css";
import Terminal from "../app/terminal/terminal";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>fadapi</title>
        <meta name="description" content="fair daily picker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Title />
        <div className={styles.row}>
          <Terminal />
          <HelpText />
        </div>
      </main>
    </div>
  );
};

const Title = () => {
  return (
    <div className={styles["title-container"]}>
      <h1 className={styles.title}>
        <span>fa</span>
        <span className={styles.accent}>da</span>
        <span>pi_</span>
      </h1>
      <div className={styles.accent}>// fair daily picker</div>
    </div>
  );
};

const HelpText = () => {
  return (
    <div className={styles.help}>
      <div className={styles["help-prompt"]}>
        <span className={styles.accent}>$ guest@cupo</span> fadapi --help
      </div>
      <div className={styles["help-output"]}>fadapi [command] [option]</div>
      <div className={styles["help-output"]}>commands:</div>
      <CommandList />
    </div>
  );
};

const CommandList = () => {
  return (
    <>
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
    </>
  );
};

interface commandProps {
  name: string;
  description: string;
  options?: { option: string; text: string }[];
}
const Command = ({ name, description, options }: commandProps) => {
  return (
    <div className={styles["command-row"]}>
      <div className={styles.command}>{name}</div>
      <div className={styles.description}>
        {description}
        {options &&
          options.map(({ option, text }) => (
            <span>
              Use
              <span key={option} className={styles.option}>
                {option}
              </span>
              {text}
            </span>
          ))}
      </div>
    </div>
  );
};

export default Home;
