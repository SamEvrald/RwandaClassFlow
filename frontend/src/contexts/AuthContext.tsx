import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  school: number;
  preferred_language: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

type AuthAction = 
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token');
    if (token && token.startsWith('mock-jwt-token-')) {
      // For demo purposes, reconstruct user from mock token
      const userId = token.replace('mock-jwt-token-', '');
      const mockUsers: { [key: string]: User } = {
        '1': {
          id: 1,
          username: 'teacher',
          email: 'teacher@school.rw',
          role: 'teacher',
          first_name: 'Jean',
          last_name: 'Mukamana',
          school: 1,
          preferred_language: 'en'
        },
        '2': {
          id: 2,
          username: 'student',
          email: 'student@school.rw',
          role: 'student',
          first_name: 'Alice',
          last_name: 'Uwimana',
          school: 1,
          preferred_language: 'en'
        },
        '3': {
          id: 3,
          username: 'parent',
          email: 'parent@gmail.com',
          role: 'parent',
          first_name: 'Robert',
          last_name: 'Nzeyimana',
          school: 1,
          preferred_language: 'en'
        },
        '4': {
          id: 4,
          username: 'admin',
          email: 'admin@school.rw',
          role: 'school_admin',
          first_name: 'Grace',
          last_name: 'Uwimana',
          school: 1,
          preferred_language: 'en'
        }
      };
      
      if (mockUsers[userId]) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: mockUsers[userId],
            token,
          },
        });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // For demo purposes, simulate different user roles based on username
      const mockUsers: { [key: string]: User } = {
        'teacher': {
          id: 1,
          username: 'teacher',
          email: 'teacher@school.rw',
          role: 'teacher',
          first_name: 'Jean',
          last_name: 'Mukamana',
          school: 1,
          preferred_language: 'en'
        },
        'student': {
          id: 2,
          username: 'student',
          email: 'student@school.rw',
          role: 'student',
          first_name: 'Alice',
          last_name: 'Uwimana',
          school: 1,
          preferred_language: 'en'
        },
        'parent': {
          id: 3,
          username: 'parent',
          email: 'parent@gmail.com',
          role: 'parent',
          first_name: 'Robert',
          last_name: 'Nzeyimana',
          school: 1,
          preferred_language: 'en'
        },
        'admin': {
          id: 4,
          username: 'admin',
          email: 'admin@school.rw',
          role: 'school_admin',
          first_name: 'Grace',
          last_name: 'Uwimana',
          school: 1,
          preferred_language: 'en'
        }
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check demo credentials
      const demoPasswords: { [key: string]: string } = {
        'teacher': 'teacher123',
        'student': 'student123',
        'parent': 'parent123',
        'admin': 'admin123'
      };

      if (mockUsers[username] && password === demoPasswords[username]) {
        const user = mockUsers[username];
        const token = 'mock-jwt-token-' + user.id;
        
        localStorage.setItem('token', token);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user,
            token,
          },
        });
        
        return { success: true };
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
        return { success: false, error: 'Invalid username or password' };
      }

      // TODO: Replace with actual API call when backend is ready
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, error: error.message || 'An unexpected error occurred' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{
      user: state.user,
      token: state.token,
      isAuthenticated: state.isAuthenticated,
      isLoading: state.loading,
      login,
      logout
    }}>
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
