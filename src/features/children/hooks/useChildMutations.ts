import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import axios from 'axios'
import { queryKeys } from '@/lib/query/keys'
import { createChild } from '../api'

function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? fallback
  }
  return fallback
}

export function useCreateChild() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: createChild,
    onSuccess: (child) => {
      qc.invalidateQueries({ queryKey: queryKeys.children.all })
      toast.success(`¡${child.user.name} ha sido añadido!`)
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Error al crear el hijo'))
    },
  })
}
