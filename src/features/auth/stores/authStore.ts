import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {
  AuthStore,
  LoginCredentials,
  SignUpCredentials,
} from '../types/auth.types'
import { authService } from '../services/authService'

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,

        // Actions
        login: async (credentials: LoginCredentials) => {
          set({ loading: true, error: null })
          try {
            const user = await authService.login(credentials)
            set({ user, isAuthenticated: true, loading: false })
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Login failed',
              loading: false,
            })
            throw error
          }
        },

        signup: async (credentials: SignUpCredentials) => {
          set({ loading: true, error: null })
          try {
            const user = await authService.signup(credentials)
            set({ user, isAuthenticated: true, loading: false })
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Signup failed',
              loading: false,
            })
            throw error
          }
        },

        logout: async () => {
          set({ loading: true })
          try {
            await authService.logout()
            set({ user: null, isAuthenticated: false, loading: false })
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Logout failed',
              loading: false,
            })
          }
        },

        clearError: () => set({ error: null }),
      }),
      {
        name: 'auth-storage',
        partialize: state => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'auth-store' }
  )
)
