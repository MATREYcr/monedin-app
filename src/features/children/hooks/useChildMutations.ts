import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import axios from 'axios'
import { queryKeys } from '@/lib/query/keys'
import { createChild, updateChild } from '../api'

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

export function useUpdateChild() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Parameters<typeof updateChild>[1] }) =>
      updateChild(id, dto),
    onSuccess: (child) => {
      qc.invalidateQueries({ queryKey: queryKeys.children.all })
      toast.success(`¡${child.user.name} actualizado!`)
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Error al actualizar el hijo'))
    },
  })
}
