
import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  email: string;
  name: string;
  role: "victim" | "volunteer" | "organization" | "admin";
};

type AuthContextType = {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUserRole: (role: User["role"]) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In a real app, this would be handled by a backend service
const mockLogin = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Admin special case
      if (email === "admin@rescuehub.com" && password === "admin123") {
        const adminUser: User = {
          id: "admin-1",
          email: "admin@rescuehub.com",
          name: "Admin User",
          role: "admin"
        };
        // Store admin in localStorage if not already there
        if (!localStorage.getItem(`user-${email}`)) {
          localStorage.setItem(`user-${email}`, JSON.stringify(adminUser));
        }
        resolve(adminUser);
        return;
      }
      
      // For demo purposes, accept any valid email/password
      if (email && password) {
        // Check localStorage for existing user
        const storedUser = localStorage.getItem(`user-${email}`);
        if (storedUser) {
          resolve(JSON.parse(storedUser));
        } else {
          reject(new Error("User not found"));
        }
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};

const mockSignup = (email: string, password: string, name: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // For demo purposes, create a user with basic info
      if (email && password && name) {
        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          role: "victim", // Default role
        };
        
        // Store in localStorage (simulating a database)
        localStorage.setItem(`user-${email}`, JSON.stringify(newUser));
        
        resolve(newUser);
      } else {
        reject(new Error("Invalid user information"));
      }
    }, 1000);
  });
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Check for existing session on mount
  useEffect(() => {
    const storedSession = localStorage.getItem("currentSession");
    if (storedSession) {
      setCurrentUser(JSON.parse(storedSession));
    }
  }, []);
  
  const login = async (email: string, password: string) => {
    const user = await mockLogin(email, password);
    setCurrentUser(user);
    localStorage.setItem("currentSession", JSON.stringify(user));
  };
  
  const signup = async (email: string, password: string, name: string) => {
    const user = await mockSignup(email, password, name);
    setCurrentUser(user);
    localStorage.setItem("currentSession", JSON.stringify(user));
  };
  
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentSession");
  };
  
  const updateUserRole = (role: User["role"]) => {
    if (!currentUser) return;
    
    const updatedUser = { ...currentUser, role };
    setCurrentUser(updatedUser);
    
    // Update in both storage locations
    localStorage.setItem("currentSession", JSON.stringify(updatedUser));
    localStorage.setItem(`user-${currentUser.email}`, JSON.stringify(updatedUser));
  };
  
  const value = {
    currentUser,
    login,
    signup,
    logout,
    updateUserRole
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
