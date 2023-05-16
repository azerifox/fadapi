import "../app/globals.css";
import { Session } from "next-auth";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { JetBrains_Mono } from "next/font/google";
import React from "react";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--jetbrains-mono-font",
});

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <React.StrictMode>
      {/* <SessionProvider session={session}> */}
      <div className={jetbrains.className}>
        <Component {...pageProps} />
      </div>
      {/* </SessionProvider> */}
    </React.StrictMode>
  );
}

export default MyApp;
