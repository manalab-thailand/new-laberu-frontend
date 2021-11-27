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

const onAuthStateChanged = async () => {
  return await new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

const loginWithFirebase = async (email: string, password: string) => {
  try {
    const { user } = await firebaseAuth.signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    const message = errorHandlerFirebase(
      (error as ExecException).code!.toString()
    );

    throw new Error(message);
  }
};

const errorHandlerFirebase = (error_code: string) => {
  if (error_code === "auth/user-not-found") {
    return "The username or password is incorrect";
  } else if (error_code === "auth/wrong-password") {
    return "The username or password is incorrect";
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

const registerWithFirebase = async (email: string, password: string) => {
  try {
    const { user } = await firebaseAuth.createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    throw new Error((error as ExecException).message);
  }
};

const logout = async () => {
  return await firebaseAuth.signOut(auth);
};

export default boot(async ({ app }) => {
  app.config.globalProperties.$firebase = firebase;
});

export {
  loginWithGoogle,
  loginWithFirebase,
  registerWithFirebase,
  onAuthStateChanged,
  logout,
};
