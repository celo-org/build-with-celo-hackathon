import "../styles/globals.css";
import { IBM_Plex_Mono } from '@next/font/google'

const IBM = IBM_Plex_Mono({
  weight : ["400", "500", "600", "700"],
  subsets : [
      "latin"
  ]
});

const ibm = {
  fontFamily: `${IBM.style.fontFamily}`
}


function MyApp({ Component, pageProps }) {
    return (
      <main className={IBM.className}>
        <Component {...pageProps} />
      </main>
    )
}

export default MyApp;