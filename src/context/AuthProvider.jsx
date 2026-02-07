import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import AuthContext from "./AuthContext";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register / Sign-up--------------
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login / Sign-in
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Sign-in------------
  const googleSignUp = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Sign-out / Logout---------
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  /* update profile----------- */
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // onAuthStateChanged----------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    googleSignUp,
    signOutUser,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
