import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import PopulatedNavbar from "../components/PopulatedNavBar";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

    return (
        <SessionProvider session={session}>
            <PopulatedNavbar/>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp; 