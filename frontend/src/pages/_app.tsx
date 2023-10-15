import type { AppProps } from "next/app";
import PopulatedNavbar from "../app/components/PopulatedNavBar";
import AuthProvider from "@/app/context/AuthProvider";


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

    return (
        <AuthProvider>
            <PopulatedNavbar />
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp; 