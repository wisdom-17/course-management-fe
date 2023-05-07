import { axiosClient } from '@/services/Axios'

export default {
  async new(payload) {
    return axiosClient.post('/api/subjects', payload)
  },
  async update(payload) {
    return axiosClient.patch(`/api/subjects/${payload.id}`, payload)
  },
  async newDates(payload, subjectId) {
    return axiosClient.post(`/api/subjects/${subjectId}/dates`, payload)
  },
  async delete(subjectId) {
    return axiosClient.delete(`/api/subjects/${subjectId}`)
  },
  list(page = 1) {
    return axiosClient.get(`/api/subjects?page=${page}`)
  },
}
