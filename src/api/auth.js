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

export function findUser(uuid) {
    const apiURL = process.env.APP_AUTH_API || 'http://localhost:3000'
    const url = apiURL + '/user/info/' + uuid
  
    return request({
      url,
      method: 'get',
    })
}
  