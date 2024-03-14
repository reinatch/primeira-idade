import '@/styles/globals.css'
import '@mantine/core/styles.css';
import type { AppProps } from 'next/app'
import { createTheme, MantineProvider } from '@mantine/core';
import Layout from '@/components/Layout';
import { AnimatePresence } from 'framer-motion';
import { MovieStoreProvider } from "@/store/store";
// import { MoviesProvider } from 
const theme = createTheme({
  /** Put your mantine theme override here */
});
export default function App({ Component, pageProps, router }: AppProps) {
  console.log(router, 'app')
  return (
    // <MoviesProvider movies={pageProps.movies || []}>
<MovieStoreProvider>


    <MantineProvider theme={theme}>
      {/* <Layout> */}
          <AnimatePresence mode='wait' initial={false}>

              <Component key={router.route} {...pageProps} />
          </AnimatePresence>
      {/* </Layout> */}
    </MantineProvider>

  </MovieStoreProvider>
  );
}
