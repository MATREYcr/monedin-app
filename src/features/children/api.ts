import { api } from '@/lib/axios/client'
import type { ChildProfile, CreateChildDto } from './types'

export async function getChildren(): Promise<ChildProfile[]> {
  const { data } = await api.get('/children')
  return data
}

export async function createChild(dto: CreateChildDto): Promise<ChildProfile> {
  const { data } = await api.post('/children', dto)
  return data
}
