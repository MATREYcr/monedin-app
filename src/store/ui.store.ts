import { create } from 'zustand'

interface UIStore {
  createChildOpen: boolean
  openCreateChild: () => void
  closeCreateChild: () => void
  createTaskOpen: boolean
  openCreateTask: () => void
  closeCreateTask: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  createChildOpen: false,
  openCreateChild: () => set({ createChildOpen: true }),
  closeCreateChild: () => set({ createChildOpen: false }),
  createTaskOpen: false,
  openCreateTask: () => set({ createTaskOpen: true }),
  closeCreateTask: () => set({ createTaskOpen: false }),
}))
