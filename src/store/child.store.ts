import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ChildProfile } from '@/features/children/types'

interface ChildStore {
  activeChild: ChildProfile | null
  setActiveChild: (child: ChildProfile) => void
  clearActiveChild: () => void
}

export const useChildStore = create<ChildStore>()(
  persist(
    (set) => ({
      activeChild: null,
      setActiveChild: (child) => set({ activeChild: child }),
      clearActiveChild: () => set({ activeChild: null }),
    }),
    { name: 'monedin-active-child' },
  ),
)
