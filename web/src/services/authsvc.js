import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  setPersistence,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  signOut,
  updateProfile,
} from "firebase/auth";

const config = {
  apiKey: "AIzaSyCFE2UKkUlDpQRsge8tfEl66mRAYhsGKUY",
  authDomain: "credit-bodi.firebaseapp.com",
  projectId: "credit-bodi",
  storageBucket: "credit-bodi.appspot.com",
  appId: "1:501475336641:web:a26c5c0fffa001f2c48f40",
};

const firebaseApp = initializeApp(config);

const auth = getAuth(firebaseApp);

const userChangeCallbacks = [];

export const onUserChange = (fn) => {
  userChangeCallbacks.push(fn);
};

const currentUser = new Promise((resolve, reject) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      resolve(user);
    } else {
      reject("nouser");
    }
    userChangeCallbacks.forEach((fn) => fn());
  });
});

export const getToken = async () => {
  try {
    const user = await currentUser;
    return await user.getIdToken();
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getUsername = async () => {
  try {
    const user = await currentUser;
    return user.displayName;
  } catch {
    return null;
  }
};

export const signUpWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const updateUserProfile = async (user, displayName) => {
  try {
    await updateProfile(user, { displayName });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider);
};

export const loginWithEmail = async (email, password) => {
  await setPersistence(auth, browserLocalPersistence);
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutClicked = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    console.error("Error while trying out user", error);
  }
};
