import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query/keys'
import { getChildren } from '../api'

export function useChildren() {
  return useQuery({
    queryKey: queryKeys.children.all,
    queryFn: getChildren,
  })
}
