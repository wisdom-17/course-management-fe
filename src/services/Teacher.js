import { axiosClient } from '@/services/Axios'

export default {
  async new(payload) {
    return axiosClient.post('/api/teachers', payload)
  },
  async update(payload) {
    return axiosClient.patch(`/api/teachers/${payload.id}`, payload)
  },
  async newDates(payload, teacherId) {
    return axiosClient.post(`/api/teachers/${teacherId}/dates`, payload)
  },
  async delete(teacherId) {
    return axiosClient.delete(`/api/teachers/${teacherId}`)
  },
  list(page = 1) {
    return axiosClient.get(`/api/teachers?page=${page}`)
  },
  all() {
    return axiosClient.get('/api/teachers/all')
  },
}
