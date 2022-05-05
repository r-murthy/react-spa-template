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
  apiKey: "AIzaSyCn3VXwkmLvubI5TZytQNH1D8nut8FoQgY",
  authDomain: "credit-7f47d.firebaseapp.com",
  projectId: "credit-7f47d",
  storageBucket: "credit-7f47d.appspot.com",
  messagingSenderId: "486648757058",
  appId: "1:486648757058:web:1232aa94de5f9be53926db",
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
