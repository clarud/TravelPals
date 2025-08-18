// Shared types - move this to a separate file later
export interface User {
  id?: string
  name: string
  email: string
  avatar_url?: string
}

export interface AuthState {
  isAuthenticated: boolean
  currentUser: User | null
}
