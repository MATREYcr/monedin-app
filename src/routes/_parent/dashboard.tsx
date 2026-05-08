import { createFileRoute } from '@tanstack/react-router'
import { DashboardPage } from '@/features/children/pages/DashboardPage'

export const Route = createFileRoute('/_parent/dashboard')({
  component: DashboardPage,
})
