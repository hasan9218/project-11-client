import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "firebase/auth";
import axios from "axios";
import toast from "react-hot-toast";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ----------------------------
  // 🔹 Save User to MongoDB
  // ----------------------------
  const saveUserToDB = async (userData, firebaseUser) => {
    const token = await firebaseUser.getIdToken();

    try {
      await axios.post(
        "http://localhost:3000/users",
        userData,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ----------------------------
  // 🔹 Password Validation
  // ----------------------------
  const validatePassword = (password) => {
    if (password.length < 6)
      return "Password must be at least 6 characters";

    if (!/[A-Z]/.test(password))
      return "Password must include at least 1 uppercase letter";

    if (!/[a-z]/.test(password))
      return "Password must include at least 1 lowercase letter";

    return null;
  };

  // ----------------------------
  // 🔹 Signup (Email/Password)
  // ----------------------------
  const signup = async (email, password, name, photo) => {
    const errorMsg = validatePassword(password);
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }

    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = result.user;

      // Update Profile
      await updateProfile(currentUser, {
        displayName: name,
        photoURL: photo,
      });

      // Save user to DB
      const userData = {
        name,
        photo,
        email,
        isPremium: false,
        role: "user"
      };

      await saveUserToDB(userData, currentUser);

      toast.success("Account created successfully!");
      return currentUser;
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // 🔹 Login (Email/Password)
  // ----------------------------
  const login = async (email, password) => {
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      return result.user;
    } catch (err) {
      toast.error("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // 🔹 Google Login
  // ----------------------------
  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const firebaseUser = result.user;

      const userData = {
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photo: firebaseUser.photoURL,
        isPremium: false,
        role: "user"
      };

      await saveUserToDB(userData, firebaseUser);

      toast.success("Google login successful!");
      return firebaseUser;
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // 🔹 Logout
  // ----------------------------
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      toast.success("Logged out");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // 🔹 Auth Observer
  // ----------------------------
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    signup,
    login,
    googleLogin,
    logout,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
