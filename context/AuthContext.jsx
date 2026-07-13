"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import * as store from "@/lib/store";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    const currentUser = store.getCurrentUser();
    setUser(currentUser);
    return currentUser;
  }, []);

  useEffect(() => {
    refresh();
    setReady(true);
  }, [refresh]);

  const login = (email, password) => {
    const loggedInUser = store.login(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const register = (fields) => {
    const registeredUser =
      store.submitApplication(fields);

    setUser(registeredUser);

    return registeredUser;
  };

  const logout = () => {
    store.logout();
    setUser(null);
  };

  const approve = (id) => {
    store.approveUser(id);
    refresh();
  };

  const deny = (id) => {
    store.denyUser(id);
    refresh();
  };

  const updateUser = async (fields) => {
    try {
      const updatedUser =
        store.updateUserProfile(fields);

      setUser(updatedUser);

      return updatedUser;
    } catch (error) {
      console.error(
        "Error updating user:",
        error
      );

      throw error;
    }
  };

  const isApprovedMember =
    user?.role === "member" &&
    user?.status === "approved";

  const isPending =
    user?.role === "member" &&
    user?.status === "pending";

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        ready,
        isApprovedMember,
        isPending,
        isAdmin,
        login,
        register,
        logout,
        approve,
        deny,
        refresh,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}