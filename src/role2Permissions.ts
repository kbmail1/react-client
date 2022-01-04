const r2p = [
  {
    'role': 'guest',
    'permissions': ['/login', '/about']
  },
  {
    'role': 'subscriber',
    'permissions': ['/dict', '/login', '/about']
  },
  {
    'role': 'admin',
    'permissions': ['/pwa', '/dict', '/login', '/about']
  },
  {
    role: 'root',
    permissions: ['hangman', '/pwa', '/dict', '/login', '/about']
  }
]

export const getPermsByRole = (role): string[] => {
  const r2pArray = r2p.filter((nxt) => {
    nxt.role === role
  })
  return r2pArray.length === 1 ? r2pArray[0].permissions : []
}

export const isPermValidForRole = (role): boolean => {
  const perms = getPermsByRole(role)
  return (perms.length > 0)
}

export const getAllRoles = (): string[] => {
  return r2p.map((obj) => {
    return obj.role
  })
}

// return flattened array of permissions
export const getAllPerms = (): string[] => {
  let flattened = []
  for (let obj in r2p) {
    flattened.concat([], obj['permissions'])
  }
  return flattened
}