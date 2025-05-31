import {
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider,
  useFirebaseApp,
} from 'reactfire'
import { BrowserRouter } from 'react-router-dom'
import app from '@/services/firebase/config'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <FirebaseAppProvider firebaseApp={app}>
      <FirebaseProviders>{children}</FirebaseProviders>
    </FirebaseAppProvider>
  )
}

function FirebaseProviders({ children }: ProvidersProps) {
  const app = useFirebaseApp()
  const firestore = getFirestore(app)
  const auth = getAuth(app)
  return (
    <FirebaseAppProvider firebaseApp={app}>
      <AuthProvider sdk={auth}>
        <FirestoreProvider sdk={firestore}>
          <BrowserRouter>{children}</BrowserRouter>
        </FirestoreProvider>
      </AuthProvider>
    </FirebaseAppProvider>
  )
}
