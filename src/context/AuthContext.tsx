// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user credentials - in a real app, you'd want to handle this differently
const DEMO_USER = {
  email: 'user@test.com',
  password: 'Test123!'
};

const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID || '',
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID || ''
};

const userPool = new CognitoUserPool(poolData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.getSession((err: any, session: any) => {
          if (err) {
            setIsAuthenticated(false);
          } else if (session.isValid()) {
            setIsAuthenticated(true);
            setUser(cognitoUser);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setLoading(false);
    }
  };

  const login = (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Add some logging for the demo user case
      if (email === DEMO_USER.email) {
        console.log('Attempting demo user login...');
      }

      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      const userData = {
        Username: email,
        Pool: userPool,
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          console.log('Login successful');
          setIsAuthenticated(true);
          setUser(cognitoUser);
          resolve();
        },
        onFailure: (err) => {
          console.error('Login error:', err);
          reject(err);
        },
      });
    });
  };

  const logout = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper hook for demo login
export const useDemoLogin = () => {
  const { login } = useAuth();
  
  const loginWithDemo = async () => {
    try {
      await login(DEMO_USER.email, DEMO_USER.password);
      return true;
    } catch (error) {
      console.error('Demo login failed:', error);
      return false;
    }
  };

  return { loginWithDemo };
};
