import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as db from './database';

const AuthContext = createContext({});

const PUBLIC_PAGES = ['/', '/login', '/signup', '/pricing', '/emergency'];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session
    db.getUser().then(u => {
      setUser(u);
      setLoading(false);
    });

    // Listen for auth changes (Supabase)
    const subscription = db.onAuthStateChange((u) => {
      setUser(u);
      setLoading(false);
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  // Redirect unauthenticated users from protected pages
  useEffect(() => {
    if (!loading && !user && !PUBLIC_PAGES.includes(router.pathname)) {
      router.push('/login');
    }
  }, [user, loading, router.pathname]);

  const handleSignIn = async (email, password) => {
    const result = await db.signIn(email, password);
    if (result.user) setUser(result.user);
    return result;
  };

  const handleSignUp = async (email, password, name) => {
    const result = await db.signUp(email, password, name);
    if (result.user) setUser(result.user);
    return result;
  };

  const handleSignOut = async () => {
    await db.signOut();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn: handleSignIn,
      signUp: handleSignUp,
      signOut: handleSignOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
