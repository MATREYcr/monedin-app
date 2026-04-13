import { createAuthClient } from 'better-auth/react'
import { usernameClient } from 'better-auth/client/plugins'
import { FamilyRole } from '@/constants'

export { FamilyRole }

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  plugins: [usernameClient()],
})

export function getFamilyRole(user: Record<string, unknown>): FamilyRole {
  return (user.familyRole as FamilyRole) ?? FamilyRole.PARENT
}

export const { signIn, signOut, signUp, useSession } = authClient
