import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../app/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Fadapi</title>
          <meta name="description" content="fair daily picker" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>fadapi - fair daily picker ;)</h1>

          <div className={styles.grid}>
            <Link href="/picker">
              <a className={[styles.card, styles.longCard].join(" ")}>
                <h2>Held des Tages</h2>
                <p>
                  Finden wir den Master of Desaster, den Held im Feld, El Gran
                  Jefe, die Maus im Haus, den Storyschließenden
                  Peitschenschwinger...
                </p>
              </a>
            </Link>
            <Link href="/confetti">
              <a className={[styles.card, styles.longCard].join(" ")}>
                <h2>Bedarfskonfetti</h2>
                <p>
                  Virtuelles Konfetti vom Discounter, für Situationen wie "Zünd'
                  den Knaller" und Erfolge jeder Art.
                </p>
              </a>
            </Link>
          </div>

          <div>
            Angemeldeter Benutzer: {session.user?.name} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default Home;
