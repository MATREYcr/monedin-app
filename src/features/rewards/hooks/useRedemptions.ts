import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/constants'
import { getRedemptions } from '../api'

export function useRedemptions() {
  return useQuery({
    queryKey: queryKeys.redemptions.all,
    queryFn: getRedemptions,
  })
}
