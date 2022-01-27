import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { DataProvider } from '../store/GlobalState'

function MyApp({ Component, pageProps }: AppProps) {
  return <DataProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </DataProvider>
  
}

export default MyApp
