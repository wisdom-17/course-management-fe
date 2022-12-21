import { axiosClient } from '@/services/Axios'

export default {
  async new(payload) {
    return axiosClient.post('/api/course-calendars', payload)
  },
  async update(payload) {
    return axiosClient.patch(`/api/course-calendars/${payload.id}`, payload)
  },
  async newDates(payload, courseId) {
    return axiosClient.post(`/api/course-calendars/${courseId}/dates`, payload)
  },
  async delete(payload) {
    return axiosClient.patch(`/api/course-calendars`, payload)
  },
  list() {
    return axiosClient.get('/api/course-calendars')
  },
}
