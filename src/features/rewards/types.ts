export type RedemptionStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export interface RewardAssignment {
  rewardId: string
  childId: string
  coins: number
  child?: {
    id: string
    user: { id: string; name: string; username: string }
  }
}

export interface Reward {
  id: string
  title: string
  description?: string
  image?: string
  isActive: boolean
  createdAt: string
  parentId: string
  assignments: RewardAssignment[]
}

export interface Redemption {
  id: string
  status: RedemptionStatus
  coins: number
  createdAt: string
  updatedAt: string
  reward: Reward
  child: {
    id: string
    coins: number
    user: { id: string; name: string; username: string }
  }
}

export interface CreateRewardDto {
  title: string
  description?: string
  image?: string
  assignments: { childId: string; coins: number }[]
}

export interface UpdateRewardDto {
  title?: string
  description?: string
  image?: string
  isActive?: boolean
  assignments?: { childId: string; coins: number }[]
}
