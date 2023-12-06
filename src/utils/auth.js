const TokenKey = 'Admin-Token'
const RoleKey = 'Roles'
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

export function getRoles() {
  return localStorage.getItem(RoleKey)
}

export function setRoles(roles) {
  return localStorage.setItem(RoleKey, roles)
}

export function removeRoles() {
  return localStorage.removeItem(RoleKey)
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