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
  school_info?: {
    school_id: number;
    school_name: string;
    school_type: string;
    location: string;
  };
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
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (token && !token.startsWith('mock-jwt-token-')) {
        try {
          // Verify token with backend by fetching user profile
          const response = await fetch('http://localhost:8000/api/users/profile/detailed/', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const userData = await response.json();
            const user: User = {
              id: userData.id,
              username: userData.username,
              email: userData.email,
              role: userData.role,
              first_name: userData.first_name,
              last_name: userData.last_name,
              school: userData.school_info?.school_id || userData.school,
              preferred_language: userData.preferred_language || 'en',
              school_info: userData.school_info
            };

            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: {
                user,
                token,
              },
            });
          } else {
            // Token is invalid, remove it
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
            dispatch({ type: 'SET_LOADING', payload: false });
          }
        } catch (error) {
          // Network error or token invalid
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Make API call to Django backend
      const response = await fetch('http://localhost:8000/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        const user: User = {
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
          role: data.user.role,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          school: data.user.school_info?.school_id || data.user.school,
          preferred_language: data.user.preferred_language || 'en',
          school_info: data.user.school_info
        };
        
        const token = data.access;
        
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', data.refresh);
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user,
            token,
          },
        });
        
        return { success: true };
      } else {
        // Login failed
        dispatch({ type: 'SET_LOADING', payload: false });
        const errorMessage = data.non_field_errors?.[0] || data.detail || 'Login failed';
        return { success: false, error: errorMessage };
      }
    } catch (error: any) {
      dispatch({ type: 'SET_LOADING', payload: false });
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please check your connection and try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
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
