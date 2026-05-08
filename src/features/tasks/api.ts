import { api } from '@/lib/axios/client'
import type { Task, CreateTaskDto, UpdateTaskDto } from './types'

export async function getTasks(): Promise<Task[]> {
  const { data } = await api.get('/tasks')
  return data
}

export async function createTask(dto: CreateTaskDto): Promise<Task[]> {
  const { data } = await api.post('/tasks', dto)
  return data
}

export async function updateTask(id: string, dto: UpdateTaskDto): Promise<Task> {
  const { data } = await api.patch(`/tasks/${id}`, dto)
  return data
}

export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`)
}

export async function approveTask(id: string): Promise<Task> {
  const { data } = await api.patch(`/tasks/${id}/approve`)
  return data
}

export async function rejectTask(id: string): Promise<Task> {
  const { data } = await api.patch(`/tasks/${id}/reject`)
  return data
}

export async function completeTask(id: string): Promise<Task> {
  const { data } = await api.patch(`/tasks/${id}/complete`)
  return data
}
