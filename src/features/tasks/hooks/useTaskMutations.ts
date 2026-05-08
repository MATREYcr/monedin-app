import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import axios from 'axios'
import { queryKeys } from '@/lib/query/keys'
import { createTask, updateTask, deleteTask, approveTask, rejectTask, completeTask } from '../api'

function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? fallback
  }
  return fallback
}

export function useCreateTask() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tasks.all })
      toast.success('¡Tarea creada!')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Error al crear la tarea'))
    },
  })
}

export function useUpdateTask() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Parameters<typeof updateTask>[1] }) =>
      updateTask(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tasks.all })
      toast.success('Tarea actualizada')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Error al actualizar la tarea'))
    },
  })
}

export function useDeleteTask() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tasks.all })
      toast.success('Tarea eliminada')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Error al eliminar la tarea'))
    },
  })
}

export function useApproveTask() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: approveTask,
    onSuccess: (task) => {
      qc.invalidateQueries({ queryKey: queryKeys.tasks.all })
      toast.success(`¡Tarea aprobada! +${task.coins} monedas para ${task.child.user.name}`)
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Error al aprobar la tarea'))
    },
  })
}

export function useRejectTask() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: rejectTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tasks.all })
      toast.info('Tarea rechazada, vuelve a estado pendiente')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Error al rechazar la tarea'))
    },
  })
}

export function useCompleteTask() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: completeTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tasks.all })
      qc.invalidateQueries({ queryKey: queryKeys.childMe.me })
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Error al completar la tarea'))
    },
  })
}
