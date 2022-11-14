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
    courseDetailsForm: {
      course: { name: '', dateRange: [], teachingDays: [] },
      validation: {
        message: '',
        errors: { name: [], startDate: [], endDate: [], teachingDays: [] },
      },
    },
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
    async saveCourseDetails() {
      this.loading = true
      // clear validation errors
      this.courseDetailsForm.validation.message = ''
      this.courseDetailsForm.validation.errors = {
        name: [],
        startDate: [],
        endDate: [],
        teachingDays: [],
      }

      const { course } = this.courseDetailsForm
      const { name, teachingDays } = course
      const startDate = course.dateRange[0]
      const endDate = course.dateRange[1]

      const payload = {
        name,
        startDate,
        endDate,
        teachingDays,
      }
      return CourseService.new(payload)
        .then((response) => {
          if (response.status === 201) {
            this.loading = false
            this.multiStepForm.id = response.data.id
            this.multiStepForm.name = name
            this.multiStepForm.startDate = startDate
            this.multiStepForm.endDate = endDate
          }
          this.getCourses() // refresh courses list in store
        })
        .catch((error) => {
          console.log(error)
          this.loading = false
          this.courseDetailsForm.validation.message =
            error.response.data.message
          // update validation error msgs with error msgs
          // returned from API call
          this.courseDetailsForm.validation.errors = {
            ...this.courseDetailsForm.validation.errors,
            ...error.response.data.errors,
          }
          throw new Error('Error saving new course')
        })
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
