import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query/keys'
import { getTasks } from '../api'

export function useTasks(childId?: string) {
  const query = useQuery({
    queryKey: queryKeys.tasks.all,
    queryFn: getTasks,
  })

  const data = childId ? query.data?.filter((t) => t.child.id === childId) : query.data

  return { ...query, data }
}
