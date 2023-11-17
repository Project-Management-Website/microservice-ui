const TokenKey = 'Admin-Token'
const PermissionKey = 'Permission'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function getPermissions() {
  return localStorage.getItem(PermissionKey)
}

export function setPermissions(permissions) {
  return localStorage.setItem(PermissionKey, permissions)
}

export function removePermissions() {
  return localStorage.removeItem(PermissionKey)
}