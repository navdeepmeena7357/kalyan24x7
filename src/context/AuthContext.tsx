'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

import jwt from 'jsonwebtoken';

interface AuthContextType {
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for token in localStorage on mount
  useEffect(() => {
    if (isLocalStorageItemNotEmpty()) {
      setIsAuthenticated(true); // Set authenticated state if token exists
    }
  }, []);

  const authenticate = (token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', getSubFromToken(token));
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function isLocalStorageItemNotEmpty() {
  const token = localStorage.getItem('token');
  return token !== null && token !== '';
}

const getSubFromToken = (token: string): string => {
  try {
    const decodedToken = jwt.decode(token) as jwt.JwtPayload; // Cast as JwtPayload to access `sub`
    return decodedToken?.sub ?? 'null'; // Extract the `sub` claim (user ID)
  } catch (error) {
    console.error('Error decoding token:', error);
    return 'null';
  }
};
