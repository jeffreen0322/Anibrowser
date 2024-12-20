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

  useEffect(() => {
    // Persist login state and username in localStorage
    localStorage.setItem("loggedIn", loggedIn ? "true" : "false");
    if (loggedIn) {
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
    }
  }, [loggedIn, username, email]);

  const login = (user, address) => {
    setLoggedIn(true);
    setUsername(user);
    setEmail(address);
  };

  const logout = () => {
    setLoggedIn(false);
    setUsername(""); // Clear username on logout
    setEmail("");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
  };

  return (
    <AuthContext.Provider value={{ loggedIn, username, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
