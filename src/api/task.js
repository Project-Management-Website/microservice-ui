import request from '@/utils/request'

export async function getListTask(data) {
    const apiURL = process.env.APP_PROJECT_API || 'http://localhost:3001'
    const url = apiURL + '/task'
  
    return request({
      url,
      method: 'get',
      data,
    })
}

export async function getDetailTask(uuid) {
  const apiURL = process.env.APP_PROJECT_API || 'http://localhost:3001'
  const url = apiURL + '/task/' + uuid

  return request({
    url,
    method: 'get',
  })
}

export async function updateDetailTask(data, uuid) {
  const apiURL = process.env.APP_PROJECT_API || 'http://localhost:3001'
  const url = apiURL + '/task/' + uuid

  console.log(data)
  return request({
    url,
    method: 'put',
    data
  })
}