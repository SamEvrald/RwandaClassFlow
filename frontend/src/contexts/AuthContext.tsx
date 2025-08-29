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

const AuthContext = createContext<{
  state: AuthState;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
} | null>(null);

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
          username: 'teacher1',
          email: 'teacher1@school.rw',
          role: 'teacher',
          first_name: 'Jean',
          last_name: 'Mukamana',
          school: 1,
          preferred_language: 'en'
        },
        '2': {
          id: 2,
          username: 'student1',
          email: 'student1@school.rw',
          role: 'student',
          first_name: 'Alice',
          last_name: 'Uwimana',
          school: 1,
          preferred_language: 'en'
        },
        '3': {
          id: 3,
          username: 'parent1',
          email: 'parent1@gmail.com',
          role: 'parent',
          first_name: 'Robert',
          last_name: 'Nzeyimana',
          school: 1,
          preferred_language: 'en'
        },
        '4': {
          id: 4,
          username: 'admin1',
          email: 'admin1@school.rw',
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

  const login = async (credentials: { username: string; password: string }) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // For demo purposes, simulate different user roles based on username
      const mockUsers: { [key: string]: User } = {
        'teacher1': {
          id: 1,
          username: 'teacher1',
          email: 'teacher1@school.rw',
          role: 'teacher',
          first_name: 'Jean',
          last_name: 'Mukamana',
          school: 1,
          preferred_language: 'en'
        },
        'student1': {
          id: 2,
          username: 'student1',
          email: 'student1@school.rw',
          role: 'student',
          first_name: 'Alice',
          last_name: 'Uwimana',
          school: 1,
          preferred_language: 'en'
        },
        'parent1': {
          id: 3,
          username: 'parent1',
          email: 'parent1@gmail.com',
          role: 'parent',
          first_name: 'Robert',
          last_name: 'Nzeyimana',
          school: 1,
          preferred_language: 'en'
        },
        'admin1': {
          id: 4,
          username: 'admin1',
          email: 'admin1@school.rw',
          role: 'school_admin',
          first_name: 'Grace',
          last_name: 'Uwimana',
          school: 1,
          preferred_language: 'en'
        }
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (mockUsers[credentials.username] && credentials.password === 'password123') {
        const user = mockUsers[credentials.username];
        const token = 'mock-jwt-token-' + user.id;
        
        localStorage.setItem('token', token);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user,
            token,
          },
        });
      } else {
        throw new Error('Invalid credentials');
      }

      // TODO: Replace with actual API call when backend is ready
      /*
      const response = await fetch('/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: data.user,
            token: data.access,
          },
        });
      } else {
        throw new Error('Login failed');
      }
      */
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
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
