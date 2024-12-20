import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Initially, check localStorage for loggedIn and username
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });

  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || ""; // Retrieve username from localStorage if it exists
  });

  useEffect(() => {
    // Persist login state and username in localStorage
    localStorage.setItem("loggedIn", loggedIn ? "true" : "false");
    if (loggedIn) {
      localStorage.setItem("username", username); // Save username when logged in
    }
  }, [loggedIn, username]);

  const login = (user) => {
    setLoggedIn(true);
    setUsername(user); // Store the username when logging in
  };

  const logout = () => {
    setLoggedIn(false);
    setUsername(""); // Clear username on logout
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ loggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
