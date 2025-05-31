import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import { auth } from '@/services/firebase/config'
import type { LoginCredentials, SignUpCredentials } from '../types/auth.types'

export const authService = {
  async login({ email, password }: LoginCredentials): Promise<User> {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  },

  async signup({
    email,
    password,
    firstName,
    lastName,
  }: SignUpCredentials): Promise<User> {
    const result = await createUserWithEmailAndPassword(auth, email, password)

    // Update profile with name
    await updateProfile(result.user, {
      displayName: `${firstName} ${lastName}`,
    })

    return result.user
  },

  async logout(): Promise<void> {
    await signOut(auth)
  },

  getCurrentUser(): User | null {
    return auth.currentUser
  },
}
