import { createFileRoute, redirect } from '@tanstack/react-router'
import { authClient, getFamilyRole } from '@/lib/auth/client'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession()
    if (!session) throw redirect({ to: '/sign-in' })
    if (getFamilyRole(session.user) === 'CHILD') throw redirect({ to: '/child' })
    throw redirect({ to: '/dashboard' })
  },
})
