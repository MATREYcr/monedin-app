import { createFileRoute } from '@tanstack/react-router'
import { ChildHomePage } from '@/features/children/pages/ChildHomePage'

export const Route = createFileRoute('/_child/child')({
  component: ChildHomePage,
})
