// // src/firebase/firebase.ts
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   // appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
//   apiKey: "AIzaSyD0B97sRQJKCT95fGusSCS0bDc54UHtczI",
//   authDomain: "cookingsensing.firebaseapp.com",
//   projectId: "cookingsensing",
//   storageBucket: "cookingsensing.firebasestorage.app",
//   messagingSenderId: "957618100455",
//   appId: "1:957618100455:web:7823c1e4cd7d63b28a2a42",
//   measurementId: "G-ZMQFM3V2TP",
// };

// // Firebaseアプリが既に初期化されているか確認し、初期化
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// console.log(app);
// const apiKey = app.options.apiKey;
// console.log(apiKey);

// // Firebase認証の初期化
// export const auth = getAuth(app);
// export default app;

// firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyD0B97sRQJKCT95fGusSCS0bDc54UHtczI",
  authDomain: "cookingsensing.firebaseapp.com",
  projectId: "cookingsensing",
  storageBucket: "cookingsensing.firebasestorage.app",
  messagingSenderId: "957618100455",
  appId: "1:957618100455:web:7823c1e4cd7d63b28a2a42",
  measurementId: "G-ZMQFM3V2TP",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Googleプロバイダーをインスタンス化
const provider = new GoogleAuthProvider();

// Googleサインイン関数
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in:", result.user);
    return result.user;
  } catch (error) {
    console.error("Error during Google sign-in:", error);
  }
};

// サインアウト関数
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error during sign-out:", error);
  }
};

export default app;
