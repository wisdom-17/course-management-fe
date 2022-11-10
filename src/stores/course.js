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
    async getCourses() {
      try {
        this.loading = true
        CourseService.list().then((data) => {
          this.list = data.data
          this.loading = false
        })
      } catch (error) {
        console.log(error)
      }
    },
    selectCourse(id) {
      this.selectedCoursesIds.push(id)
    },
    saveCourseDetails(course) {
      const { id, name, startDate, endDate } = course
      this.multiStepForm.id = id
      this.multiStepForm.name = name
      this.multiStepForm.startDate = startDate
      this.multiStepForm.endDate = endDate
    },
    async delete(courseIds) {
      try {
        this.loading = true
        const payload = {
          courseIds: [...courseIds],
        }
        const apiResult = await CourseService.delete(payload)

        if (apiResult.status === 200) {
          this.loading = false
          this.getCourses() // refresh
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
})
