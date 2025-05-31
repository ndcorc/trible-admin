import { useUser } from 'reactfire'
import { useAuthStore } from '../stores/authStore'

export function useAuth() {
  const { status, data: firebaseUser } = useUser()
  const { login, logout, signup, clearError, loading, error } = useAuthStore()

  return {
    user: firebaseUser,
    isAuthenticated: !!firebaseUser,
    loading: status === 'loading' || loading,
    error,
    login,
    logout,
    signup,
    clearError,
  }
}
