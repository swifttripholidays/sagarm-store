import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { auth } from "./firebase";

export const signupUser = async (fullName, email, password) => {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(credential.user, {
    displayName: fullName,
  });

  return credential.user;
};

export const loginUser = async (email, password) => {
  const credential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return credential.user;
};

export const logoutUser = () => signOut(auth);

export const subscribeToAuth = (callback) =>
  onAuthStateChanged(auth, callback);