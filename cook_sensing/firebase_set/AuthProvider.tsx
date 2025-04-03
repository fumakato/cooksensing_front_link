// src/AuthProvider.tsx
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  FC,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";
import { useRouter } from "next/router";

// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase";

interface AuthContextType {
  currentUser: User | null;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log("02 Auth State Changed:", user); // ログイン状態を確認
      if (!user) {
        // ユーザーがログインしていない場合にApp.tsxにリダイレクト
        // router.push("/firebase/App");
      }
    });
    return unsubscribe;
  }, [router]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
