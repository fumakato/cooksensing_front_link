// src/App.tsx
import React, { useEffect, useContext, useState } from "react";
import { AuthProvider, AuthContext } from "../../firebase_set/AuthProvider";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import SignInComponent from "./SignInComponent";
import { useRouter } from "next/router";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase_set/firebase";

const App: React.FC = () => {
  // const { currentUser } = useContext(AuthContext); // 修正
  // console.log("AuthContext Current User:", currentUser);

  const router = useRouter();
  const [user, setUser] = useState<String>("");

  useEffect(() => {
    console.log("Enter！！");
    if (user === "") {
      console.log("中身なし");
    } else {
      console.log("中身あり");
      router.push("/../test/new_postGraph");
    }
  }, [user, router]);

  onAuthStateChanged(auth, (user) => {
    console.log("01 Auth State Changed:", user);
    if (typeof user?.uid === "string") {
      setUser(user.uid);
    }
  });

  return (
    <>
      <AuthProvider>
        <div>
          <h1>Firebase Auth with React & TypeScript</h1>
          <SignInComponent />
        </div>
      </AuthProvider>
    </>
  );
};

export default App;
