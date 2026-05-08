import { create } from 'zustand'
import type { ChildProfile } from '@/features/children/types'
import type { Task } from '@/features/tasks/types'
import type { Reward } from '@/features/rewards/types'

interface UIStore {
  createChildOpen: boolean
  openCreateChild: () => void
  closeCreateChild: () => void
  editChild: ChildProfile | null
  openEditChild: (child: ChildProfile) => void
  closeEditChild: () => void

  createTaskOpen: boolean
  openCreateTask: () => void
  closeCreateTask: () => void
  editTask: Task | null
  openEditTask: (task: Task) => void
  closeEditTask: () => void

  createRewardOpen: boolean
  openCreateReward: () => void
  closeCreateReward: () => void
  editReward: Reward | null
  openEditReward: (reward: Reward) => void
  closeEditReward: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  createChildOpen: false,
  openCreateChild: () => set({ createChildOpen: true }),
  closeCreateChild: () => set({ createChildOpen: false }),
  editChild: null,
  openEditChild: (child) => set({ editChild: child }),
  closeEditChild: () => set({ editChild: null }),

  createTaskOpen: false,
  openCreateTask: () => set({ createTaskOpen: true }),
  closeCreateTask: () => set({ createTaskOpen: false }),
  editTask: null,
  openEditTask: (task) => set({ editTask: task }),
  closeEditTask: () => set({ editTask: null }),

  createRewardOpen: false,
  openCreateReward: () => set({ createRewardOpen: true }),
  closeCreateReward: () => set({ createRewardOpen: false }),
  editReward: null,
  openEditReward: (reward) => set({ editReward: reward }),
  closeEditReward: () => set({ editReward: null }),
}))
