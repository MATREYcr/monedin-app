import { createAuthClient } from 'better-auth/react'
import { usernameClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  plugins: [usernameClient()],
})

export type FamilyRole = 'PARENT' | 'CHILD'

export function getFamilyRole(user: Record<string, unknown>): FamilyRole {
  return (user.familyRole as FamilyRole) ?? 'PARENT'
}

export const { signIn, signOut, signUp, useSession } = authClient
