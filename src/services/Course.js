import { axiosClient } from '@/services/Axios'

export default {
  async new(payload) {
    return axiosClient.post('/api/courses', payload)
  },
  async update(payload) {
    return axiosClient.patch(`/api/courses/${payload.id}`)
  },
  async newDates(payload, courseId) {
    return axiosClient.post(`/api/courses/${courseId}/dates`, payload)
  },
  async delete(payload) {
    return axiosClient.patch(`/api/courses`, payload)
  },
  list() {
    return axiosClient.get('/api/courses')
  },
}
