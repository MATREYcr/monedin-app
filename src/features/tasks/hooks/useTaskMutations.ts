import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query/keys'
import { createTask, deleteTask, approveTask, rejectTask } from '../api'

export function useCreateTask() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tasks.all })
    },
  })
}

export function useDeleteTask() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tasks.all })
    },
  })
}

export function useApproveTask() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: approveTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tasks.all })
    },
  })
}

export function useRejectTask() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: rejectTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tasks.all })
    },
  })
}
