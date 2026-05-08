import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import axios from 'axios'
import { queryKeys } from '@/constants'
import { createReward, updateReward, deleteReward, approveRedemption, rejectRedemption, redeemReward } from '../api'

function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? fallback
  }
  return fallback
}

export function useCreateReward() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: createReward,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.rewards.all })
      toast.success('¡Recompensa creada!')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Error al crear la recompensa'))
    },
  })
}

export function useUpdateReward() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Parameters<typeof updateReward>[1] }) =>
      updateReward(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.rewards.all })
      toast.success('Recompensa actualizada')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Error al actualizar la recompensa'))
    },
  })
}

export function useDeleteReward() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: deleteReward,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.rewards.all })
      toast.success('Recompensa eliminada')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Error al eliminar la recompensa'))
    },
  })
}

export function useApproveRedemption() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: approveRedemption,
    onSuccess: (redemption) => {
      qc.invalidateQueries({ queryKey: queryKeys.redemptions.all })
      qc.invalidateQueries({ queryKey: queryKeys.rewards.all })
      qc.invalidateQueries({ queryKey: queryKeys.children.all })
      toast.success(
        `¡Solicitud aprobada! -${redemption.coins} monedas de ${redemption.child.user.name}`,
      )
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Error al aprobar la solicitud'))
    },
  })
}

export function useRejectRedemption() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: rejectRedemption,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.redemptions.all })
      toast.info('Solicitud rechazada')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Error al rechazar la solicitud'))
    },
  })
}

export function useRedeemReward() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: redeemReward,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.rewards.all })
      qc.invalidateQueries({ queryKey: queryKeys.childMe.me })
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'Error al canjear la recompensa'))
    },
  })
}
