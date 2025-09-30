'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { UserProfile, defaultUserProfile } from '@/types/UserProfile'
import { useAuth } from './AuthContext' 
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

type UserProfileContextType = {
  profile: UserProfile
  setProfile: (data: UserProfile) => void
  reset: (data?: UserProfile) => void
  isLoading: boolean
}

const UserProfileContext = createContext<UserProfileContextType | null>(null)

export const UserProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile>(defaultUserProfile)
  const [isLoading, setIsLoading] = useState(true)

  const reset = (data?: UserProfile) => {
    setProfile(data || defaultUserProfile)
  }

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        reset()
        setIsLoading(false)
        return
      }

      try {
        const userRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(userRef)

        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfile
          setProfile(data)
        } else {
          setProfile(defaultUserProfile)
        }
      } catch (error) {
        console.error('Error loading profile:', error)
        reset()
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  return (
    <UserProfileContext.Provider value={{ profile, setProfile, reset, isLoading }}>
      {children}
    </UserProfileContext.Provider>
  )
}

export const useUserProfile = () => {
  const context = useContext(UserProfileContext)
  if (!context) throw new Error('useUserProfile debe usarse dentro de UserProfileProvider')
  return context
}
