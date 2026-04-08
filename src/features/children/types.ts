export interface ChildProfile {
  id: string
  age: number | null
  avatar: string | null
  coins: number
  user: {
    id: string
    name: string
    username: string
  }
}

export interface CreateChildDto {
  name: string
  username: string
  password: string
  age?: number
  avatar?: string
}
