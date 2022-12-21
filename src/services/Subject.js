import { axiosClient } from '@/services/Axios'

export default {
  async new(payload) {
    return axiosClient.post('/api/subject', payload)
  },
  async update(payload) {
    return axiosClient.patch(`/api/subject/${payload.id}`, payload)
  },
  async newDates(payload, subjectId) {
    return axiosClient.post(`/api/subjects/${subjectId}/dates`, payload)
  },
  async delete(subjectId) {
    return axiosClient.delete(`/api/subjects/${subjectId}`)
  },
  list() {
    return axiosClient.get('/api/subjects')
  },
}
