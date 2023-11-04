import { axiosClient } from '@/services/Axios'

export default {
  getTimetable(courseId) {
    return axiosClient.get(`/api/courses/${courseId}/timetable`)
  },
}
