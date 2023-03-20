import '@/styles/globals.css'

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }


// shared session state
import { SessionProvider } from 'next-auth/react';

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default App;