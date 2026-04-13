import { createFileRoute } from '@tanstack/react-router'
import { SignUpPage } from '@/features/auth/pages/SignUpPage'

export const Route = createFileRoute('/_auth/sign-up')({
  component: SignUpPage,
})
