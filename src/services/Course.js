import { axiosClient } from '@/services/Axios'

export default {
  async new(payload) {
    return axiosClient.post('/api/courses', payload)
  },
  list() {
    return axiosClient.get('/api/courses')
  },
}
