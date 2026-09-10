import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export interface User { name: string; email: string; joined: string }
interface StoredUser extends User { password: string }

interface AuthCtx {
  user: User | null;
  signup: (name: string, email: string, password: string) => string | null;
  signin: (email: string, password: string) => string | null;
  logout: () => void;
}

const Ctx = createContext<AuthCtx>({
  user: null,
  signup: () => null,
  signin: () => null,
  logout: () => {},
});

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem('bl_users');
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function readSession(): User | null {
  try {
    const raw = localStorage.getItem('bl_user');
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readSession);

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      signup: (name, email, password) => {
        const users = readUsers();
        const mail = email.trim().toLowerCase();
        if (users.some((u) => u.email === mail)) {
          return 'An account with this email already exists — sign in instead.';
        }
        const stored: StoredUser = {
          name: name.trim() || 'Learner',
          email: mail,
          password,
          joined: 'September 2026',
        };
        localStorage.setItem('bl_users', JSON.stringify([...users, stored]));
        const session: User = { name: stored.name, email: stored.email, joined: stored.joined };
        localStorage.setItem('bl_user', JSON.stringify(session));
        setUser(session);
        return null;
      },
      signin: (email, password) => {
        const mail = email.trim().toLowerCase();
        const found = readUsers().find((u) => u.email === mail);
        if (!found) return 'No account found for this email — create one first.';
        if (found.password !== password) return 'Incorrect password — try again.';
        const session: User = { name: found.name, email: found.email, joined: found.joined };
        localStorage.setItem('bl_user', JSON.stringify(session));
        setUser(session);
        return null;
      },
      logout: () => {
        localStorage.removeItem('bl_user');
        setUser(null);
      },
    }),
    [user],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  return useContext(Ctx);
}
