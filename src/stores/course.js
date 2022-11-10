import { defineStore } from 'pinia'
import CourseService from '@/services/Course'

export const useCourseStore = defineStore({
  id: 'course',
  state: () => ({
    multiStepForm: {
      id: null,
      name: '',
      startDate: '',
      endDate: '',
    },
    list: [],
    loading: false,
  }),
  getters: {},
  actions: {
    getCourses() {
      this.loading = true
      CourseService.list().then((data) => {
        this.list = data.data
        this.loading = false
      })
    },
    saveCourseDetails(course) {
      const { id, name, startDate, endDate } = course
      this.multiStepForm.id = id
      this.multiStepForm.name = name
      this.multiStepForm.startDate = startDate
      this.multiStepForm.endDate = endDate
    },
  },
})
