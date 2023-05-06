import "../app/globals.css";
import { Session } from "next-auth";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--jetbrains-mono-font",
});

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    //<SessionProvider session={session}>
      <div className={jetbrains.className}>
        <Component {...pageProps} />
      </div>
    //</SessionProvider>
  );
}

export default MyApp;
