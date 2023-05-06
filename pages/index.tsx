import type { NextPage } from "next";
import Head from "next/head";
import styles from "../app/Home.module.css";
import Picker from "../app/picker/picker";

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
        <Picker />
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

export default Home;
