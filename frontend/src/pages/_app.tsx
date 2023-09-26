import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import PopulatedNavbar from "../components/PopulatedNavBar";
import '../components/table/table.scss'; // Import the global CSS file with the correct relative path




function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

    return (
        <SessionProvider session={session}>
            <PopulatedNavbar/>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp; 