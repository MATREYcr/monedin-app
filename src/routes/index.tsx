import { createFileRoute, redirect } from '@tanstack/react-router'
import { authClient, getFamilyRole } from '@/lib/auth/client'
import { FamilyRole, ROUTES } from '@/constants'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession()
    if (!session) throw redirect({ to: ROUTES.SIGN_IN })
    if (getFamilyRole(session.user) === FamilyRole.CHILD) throw redirect({ to: ROUTES.CHILD_HOME })
    throw redirect({ to: ROUTES.DASHBOARD })
  },
})
