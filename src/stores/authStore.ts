import type { LoginCredentials } from '@/features/auth/types/auth.types'
import type { User } from 'firebase/auth'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        loading: false,

        // Actions
        login: async (credentials: LoginCredentials) => {
          set({ loading: true })
          try {
            // Simulate login logic
            const user = { email: credentials.email } as User // Replace with actual login logic
            set({ user, isAuthenticated: true, loading: false })
          } catch (error) {
            set({ loading: false })
            throw error
          }
        },

        logout: () => {
          set({ user: null, isAuthenticated: false, loading: false })
        },

        clearError: () => {
          set({ loading: false })
        },
      }),
      { name: 'auth-storage' }
    )
  )
)
