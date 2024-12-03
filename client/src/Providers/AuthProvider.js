import React, { createContext, useContext, useState } from 'react';

// Authentication Context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    user: null,       // Stores user info if logged in as a user
    company: null,    // Stores company info if logged in as a company
  });

  const login = (type, data) => {
    if (type === "user") {
      setAuth({ user: data, company: null });
    } else if (type === "company") {
      setAuth({ user: null, company: data });
    }
  };

  const logout = () => {
    setAuth({ user: null, company: null });
  };

  const isAuthenticated = auth.user != null || auth.company != null;

  return (
    <AuthContext.Provider value={{ auth, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
