import React, { createContext, useContext, useState, useEffect } from 'react'; // 👈 Added useEffect here

interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
}

interface LoginPayload {
  email: string;
  name?: string;
  password?: string;

}

interface AuthContextType {
  user: User | null;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (newUser: User, newToken: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const updateUser = (newUser: User, newToken: string) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('token', newToken);
  };

  // 👇 ADDED THIS: The listener for the Google/GitHub Popup 👇
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Check if the message is our success signal from the server
      if (event.data?.type === 'OAUTH_SUCCESS' && event.data?.token) {
        // Save the JWT token
        localStorage.setItem('token', event.data.token);
        localStorage.setItem('user', JSON.stringify(event.data.user));
        
        // Reload the page so the app recognizes the user is now logged in!
        window.location.href = '/'; 
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);
  // 👆 END OF NEW LISTENER 👆

  const login = async ({ email, name }: LoginPayload) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    // 🔥 IMPORTANT FIX
    const { user, token } = await response.json();

    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token); // ✅ STORE JWT
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // ✅ CLEAR TOKEN
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};