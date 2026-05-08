import { createFileRoute } from '@tanstack/react-router'
import { RewardsPage } from '@/features/rewards/pages/RewardsPage'

export const Route = createFileRoute('/_parent/rewards/')({
  component: RewardsPage,
})
