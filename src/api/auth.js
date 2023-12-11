import request from '@/utils/request'

export async function loginUser(data) {
    const apiURL = process.env.APP_AUTH_API || 'http://localhost:3000'
    const url = apiURL + '/user/login'
  
    return request({
      url,
      method: 'post',
      data,
    })
}

export function getUserInfo(uuid) {
    const apiURL = process.env.APP_AUTH_API || 'http://localhost:3000'
    const url = apiURL + '/user/info/' + uuid
  
    return request({
      url,
      method: 'get',
    })
}

export function getListUsers() {
  const apiURL = process.env.APP_AUTH_API || 'http://localhost:3000'
  const url = apiURL + '/user/list'

  return request({
    url,
    method: 'get',
  })
}

export function register(data) {
  const apiURL = process.env.APP_AUTH_API || 'http://localhost:3000'
  const url = apiURL + '/user/register'
  return request({
    url,
    method: 'post',
    data,
  })
}
