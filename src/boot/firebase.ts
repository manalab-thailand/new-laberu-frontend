import { boot } from "quasar/wrappers";
import { initializeApp } from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import { ExecException } from "child_process";

const firebaseConfig = {
  apiKey: "AIzaSyCX5ErvKR5qhKdgeXAGHn5yEJdAGJfUpyI",
  authDomain: "laberu.firebaseapp.com",
  projectId: "laberu",
  storageBucket: "laberu.appspot.com",
  messagingSenderId: "887970080889",
  appId: "1:887970080889:web:fe9bfb938753ef14568ca8",
  measurementId: "G-9V6TZG3HVT",
};

const firebase = initializeApp(firebaseConfig);

export const auth = firebaseAuth.getAuth();

const loginWithFirebase = async (email: string, password: string) => {
  try {
    const { user } = await firebaseAuth.signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    throw new Error((error as ExecException).message);
  }
};

const loginWithGoogle = async () => {
  try {
    const provider = new firebaseAuth.GoogleAuthProvider();
    return await firebaseAuth.signInWithPopup(auth, provider);
  } catch (error) {
    throw new Error((error as ExecException).message);
  }
};

export default boot(async ({ app }) => {
  app.config.globalProperties.$firebase = firebase;
});

export { loginWithGoogle, loginWithFirebase };
