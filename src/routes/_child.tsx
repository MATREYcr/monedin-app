import { createFileRoute, redirect } from '@tanstack/react-router'
import { authClient, getFamilyRole } from '@/lib/auth/client'
import { FamilyRole, ROUTES } from '@/constants'
import { ChildLayout } from '@/components/layout/ChildLayout'

export const Route = createFileRoute('/_child')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession()
    if (!session) throw redirect({ to: ROUTES.SIGN_IN })
    if (getFamilyRole(session.user) === FamilyRole.PARENT) throw redirect({ to: ROUTES.DASHBOARD })
  },
  component: ChildLayout,
})
