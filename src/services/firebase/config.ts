import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { env } from '@/config/environment'

const app = initializeApp(env.firebase)

export const auth = getAuth(app)
export const firestore = getFirestore(app)
export const storage = getStorage(app)
export default app
