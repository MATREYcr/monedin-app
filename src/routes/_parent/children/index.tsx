import { createFileRoute } from '@tanstack/react-router'
import { ChildrenPage } from '@/features/children/pages/ChildrenPage'

export const Route = createFileRoute('/_parent/children/')({
  component: ChildrenPage,
})
