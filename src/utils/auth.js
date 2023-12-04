const TokenKey = 'Admin-Token'
const PermissionKey = 'Permission'
const UserKey = 'User'
const UserUuidKey = 'Uuid'

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

export function getUser() {
  return localStorage.getItem(UserKey)
}

export function setUser(user) {
  return localStorage.setItem(UserKey, user)
}

export function removeUser() {
  return localStorage.removeItem(UserKey)
}

export function getUserUuid() {
  return localStorage.getItem(UserUuidKey)
}

export function setUserUuid(uuid) {
  return localStorage.setItem(UserUuidKey, uuid)
}

export function removeUserUuid() {
  return localStorage.removeItem(UserUuidKey)
}