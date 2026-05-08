import { api } from '@/lib/axios/client'
import type { ChildProfile, CreateChildDto, UpdateChildDto } from './types'

export async function getChildren(): Promise<ChildProfile[]> {
  const { data } = await api.get('/children')
  return data
}

export async function getChildMe(): Promise<ChildProfile> {
  const { data } = await api.get('/children/me')
  return data
}

export async function createChild(dto: CreateChildDto): Promise<ChildProfile> {
  const { data } = await api.post('/children', dto)
  return data
}

export async function updateChild(id: string, dto: UpdateChildDto): Promise<ChildProfile> {
  const { data } = await api.patch(`/children/${id}`, dto)
  return data
}
