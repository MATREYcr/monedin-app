import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query/keys'
import { createChild } from '../api'

export function useCreateChild() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: createChild,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.children.all })
    },
  })
}
