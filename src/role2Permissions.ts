const r2p = [
  {
    role: 'guest',
    permissions: ['/about', '/login',],
  },
  {
    role: 'subscriber',
    permissions: ['/dict', '/about', '/logout',],
  },
  {
    'role': 'admin',
    'permissions': ['/pwa', '/dict', '/about', '/logout',],
  },
  {
    role: 'root',
    permissions: ['/hangman', '/pwa', '/dict', '/about', '/logout',],
  }
]

// BUG: TODO: empty perms...
export const getPermsByRole = (role): string[] => {
  console.log(`getPermsByRole: role: "${role}"`)
  if (role) {
    role = role.trim().toLowerCase()
  }
  if (role.length === 0) {
    role = 'guest'
  }
  console.log('gePerms: ROLE IS: ', role)

  for (let ind = 0; ind < r2p.length; ind++) {
    if (r2p[ind].role === role) {
      console.log('GOOD GOOD Perms found in For Loop... ')
      return r2p[ind].permissions
    }
  }
  console.log('BAD BAD Perms not found in For Loop... ')
  return ['/hangman', '/pwa', '/dict', '/about', '/logout',]
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