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

  const [email, setEmail] = useState(() => {
    return localStorage.getItem("email") || ""; // Retrieve email from localStorage if it exists
  });

  const [account_id, setId] = useState(() => {
    return localStorage.getItem("account_id") || ""; // Retrieve id from localStorage if it exists
  });

  useEffect(() => {
    // Persist login state and username in localStorage
    localStorage.setItem("loggedIn", loggedIn ? "true" : "false");
    if (loggedIn) {
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      localStorage.setItem("account_id", account_id);
    }
  }, [loggedIn, username, email, account_id]);

  const login = (user, address, account_id) => {
    setLoggedIn(true);
    setUsername(user);
    setEmail(address);
    setId(account_id);
  };

  const logout = () => {
    setLoggedIn(false);
    setUsername(""); // Clear username on logout
    setEmail("");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("account_id");
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, username, email, account_id, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
