import { createContext, useReducer, useEffect } from "react";
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { SET_AUTH } from "../types";

import { authReducer, initialState } from "../reducers/authReducer";

import { auth } from "../../config/firebase";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    (function () {
      onAuthStateChanged(auth, (currentUser) => {
        dispatch({
          type: SET_AUTH,
          payload: currentUser,
        });

        if (currentUser && !localStorage.getItem("auth")) {
          localStorage.setItem("auth", true);
        }
      });
    })();
  }, []);

  const handleSignInGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const handleSignOut = () => signOut(auth);

  return (
    <authContext.Provider
      value={{
        auth: state.auth,
        handleSignInGoogle,
        handleSignOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
