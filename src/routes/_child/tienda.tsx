import { createFileRoute } from '@tanstack/react-router'
import { ChildRewardShopPage } from '@/features/rewards/pages/ChildRewardShopPage'

export const Route = createFileRoute('/_child/tienda')({
  component: ChildRewardShopPage,
})
