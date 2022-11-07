import { defineStore } from 'pinia'

export const useCourseStore = defineStore({
  id: 'course',
  state: () => ({
    multiStepForm: {
      id: null,
      name: '',
      startDate: '',
      endDate: '',
    },
  }),
  getters: {},
  actions: {
    saveCourseDetails(course) {
      const { id, name, startDate, endDate } = course
      this.multiStepForm.id = id
      this.multiStepForm.name = name
      this.multiStepForm.startDate = startDate
      this.multiStepForm.endDate = endDate
    },
  },
})
