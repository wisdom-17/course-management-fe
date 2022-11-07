import { defineStore } from 'pinia'

export const useCourseStore = defineStore({
  id: 'course',
  state: () => ({
    multiStepForm: {
      courseId: null,
    },
  }),
  getters: {},
  actions: {
    saveCourseId(courseId) {
      this.multiStepForm.courseId = courseId
    },
  },
})
