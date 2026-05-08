import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/constants'
import { getRewards } from '../api'

export function useRewards() {
  return useQuery({
    queryKey: queryKeys.rewards.all,
    queryFn: getRewards,
  })
}
