import { axiosClient } from '@/services/Axios'

export default {
  async new(payload) {
    return axiosClient.post('/api/courses', payload)
  },
  async newDates(payload, courseId) {
    return axiosClient.post(`/api/courses/${courseId}/dates`, payload)
  },
  list() {
    return axiosClient.get('/api/courses')
  },
}
