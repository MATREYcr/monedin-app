import { api } from '@/lib/axios/client'
import type { Reward, Redemption, CreateRewardDto, UpdateRewardDto } from './types'

export async function getRewards(): Promise<Reward[]> {
  const { data } = await api.get('/rewards')
  return data
}

export async function createReward(dto: CreateRewardDto): Promise<Reward> {
  const { data } = await api.post('/rewards', dto)
  return data
}

export async function updateReward(id: string, dto: UpdateRewardDto): Promise<Reward> {
  const { data } = await api.patch(`/rewards/${id}`, dto)
  return data
}

export async function deleteReward(id: string): Promise<void> {
  await api.delete(`/rewards/${id}`)
}

export async function getRedemptions(): Promise<Redemption[]> {
  const { data } = await api.get('/rewards/redemptions')
  return data
}

export async function approveRedemption(id: string): Promise<Redemption> {
  const { data } = await api.patch(`/rewards/redemptions/${id}/approve`)
  return data
}

export async function rejectRedemption(id: string): Promise<Redemption> {
  const { data } = await api.patch(`/rewards/redemptions/${id}/reject`)
  return data
}

export async function redeemReward(id: string): Promise<Redemption> {
  const { data } = await api.post(`/rewards/${id}/redeem`)
  return data
}
