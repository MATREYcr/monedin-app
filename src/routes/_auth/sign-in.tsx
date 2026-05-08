import { createFileRoute } from '@tanstack/react-router'
import { SignInPage } from '@/features/auth/pages/SignInPage'

export const Route = createFileRoute('/_auth/sign-in')({
  component: SignInPage,
})
