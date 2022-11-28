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
  async delete(payload) {
    return axiosClient.patch(`/api/teachers`, payload)
  },
  list() {
    return axiosClient.get('/api/teachers')
  },
}
