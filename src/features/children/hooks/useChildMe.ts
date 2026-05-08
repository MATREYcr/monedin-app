import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query/keys'
import { getChildMe } from '../api'

export function useChildMe() {
  return useQuery({
    queryKey: queryKeys.childMe.me,
    queryFn: getChildMe,
  })
}
