import { useFirestoreCollectionData } from 'reactfire'
import { collection } from 'firebase/firestore'
import { useFirestore } from 'reactfire'

export const useUsers = () => {
  const firestore = useFirestore()
  const usersCollection = collection(firestore, 'users')

  return useFirestoreCollectionData(usersCollection, {
    idField: 'id',
  })
}
