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
    editForm: {
      id: null,
      name: '',
      dateRange: [],
      teachingDays: [],
      loading: false,
    },
    list: {
      data: [],
      loading: false,
    },
  }),
  getters: {},
  actions: {
    async getCourses() {
      try {
        this.list.loading = true
        CourseService.list().then((data) => {
          // convert date string JS Date object
          const formattedData = data.data.map((obj) => {
            return {
              ...obj,
              startDate: new Date(obj.startDate),
              endDate: new Date(obj.endDate),
              createdAt: new Date(obj.createdAt),
              updatedAt: new Date(obj.updatedAt),
              deletedAt: new Date(obj.deletedAt),
            }
          })
          this.list.data = formattedData
          this.list.loading = false
        })
      } catch (error) {
        console.log(error)
      }
    },
    selectCourse(id) {
      this.selectedCoursesIds.push(id)
    },
    async saveNewCourse(payload) {
      this.loading = true

      return CourseService.new(payload).then((response) => {
        if (response.status === 201) {
          this.loading = false
          this.multiStepForm.id = response.data.id
          this.multiStepForm.name = payload.name
          this.multiStepForm.startDate = payload.startDate
          this.multiStepForm.endDate = payload.endDate

          this.getCourses() // refresh courses list in defineStore
        }
      })
    },
    async update(payload) {
      this.editForm.loading = true
      return CourseService.update(payload).then((response) => {
        if (response.status === 200) {
          this.getCourses() // refresh courses list in store
        }
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
