import React from 'react'

export const enum Role {
  Guest = 0,
  Admin,
}
export interface IAppContext {
  isLoggedIn: boolean
  userId: string
  role: Role
  login: (creds: unknown) => boolean
  logout: () => unknown
  sinceEpoch: number
}

export const starterAppContext: IAppContext = {
  isLoggedIn: false,
  userId: 'guest',
  role: Role.Guest,
  login: () => false,
  logout: () => false,
  sinceEpoch: Date.now(),
}

const AppContext = React.createContext<IAppContext | null>(null)

export default AppContext
