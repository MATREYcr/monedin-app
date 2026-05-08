import { createFileRoute, redirect } from '@tanstack/react-router'
import { authClient, getFamilyRole } from '@/lib/auth/client'
import { FamilyRole, ROUTES } from '@/constants'
import { ParentLayout } from '@/components/layout/ParentLayout'

export const Route = createFileRoute('/_parent')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession()
    if (!session) throw redirect({ to: ROUTES.SIGN_IN })
    if (getFamilyRole(session.user) === FamilyRole.CHILD) throw redirect({ to: ROUTES.CHILD_HOME })
  },
  component: ParentLayout,
})
