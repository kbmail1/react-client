const r2p = [
  {
    'role': 'guest',
    'permissions': ['/about', '/logout']
  },
  {
    'role': 'subscriber',
    'permissions': ['/dict', '/about', '/logout']
  },
  {
    'role': 'admin',
    'permissions': ['/pwa', '/dict', '/about', '/logout']
  },
  {
    role: 'root',
    permissions: ['/hangman', '/pwa', '/dict', '/about', '/logout']
  }
]

// BUG: TODO: empty perms...
export const getPermsByRole = (role): string[] => {
  console.log(`getPermesByRole: role: ${role}`)
  let returnPerms = []
  r2p.forEach(element => {
    if (role === element.role) {
      return element.permissions
    }
  });
  console.log(`getPermsByRole: returning perms: ${returnPerms}`)
  // return returnPerms

  return ['/hangman', '/pwa', '/dict', '/login', '/about']
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