import { create } from 'zustand'

interface UIStore {
  createChildOpen: boolean
  openCreateChild: () => void
  closeCreateChild: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  createChildOpen: false,
  openCreateChild: () => set({ createChildOpen: true }),
  closeCreateChild: () => set({ createChildOpen: false }),
}))
