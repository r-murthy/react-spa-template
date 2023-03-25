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
  apiKey: "AIzaSyCESARCzXnqcS4p59948o1TcOH2LcHBzzQ",
  authDomain: "template-app-go-react.firebaseapp.com",
  projectId: "template-app-go-react",
  storageBucket: "template-app-go-react.appspot.com",
  appId: "1:25070304702:web:0b570f8a510a09fa398def",
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
  return createUserWithEmailAndPassword(auth, email, password)
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
