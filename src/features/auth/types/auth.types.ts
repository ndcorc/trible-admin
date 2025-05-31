import type { User } from 'firebase/auth'

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignUpCredentials extends LoginCredentials {
  confirmPassword: string
  firstName: string
  lastName: string
}

export interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>
  signup: (credentials: SignUpCredentials) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

export type AuthStore = AuthState & AuthActions
