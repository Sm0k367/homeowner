import '../styles/globals.css';
import Layout from '../components/Layout';
import Analytics from '../components/Analytics';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Analytics />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
