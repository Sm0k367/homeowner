import '../styles/globals.css';
import Layout from '../components/Layout';
import Analytics from '../components/Analytics';
import { AuthProvider } from '../lib/AuthContext';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Analytics />
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}
