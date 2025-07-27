// Shared types - move this to a separate file later
export interface User {
  name: string
  email: string
}

export interface AuthState {
  isAuthenticated: boolean
  currentUser: User | null
}
