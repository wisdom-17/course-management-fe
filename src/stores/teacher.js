import { defineStore } from 'pinia'
import TeacherService from '@/services/Teacher'

export const useTeacherStore = defineStore({
  id: 'teacher',
  state: () => ({
    newForm: {
      loading: false,
    },
    editForm: {
      id: null,
      name: '',
      hourlyPay: 0,
      loading: false,
    },
    list: [],
  }),
  getters: {},
  actions: {
    async getTeachers() {
      try {
        this.loading = true
        TeacherService.list().then((data) => {
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
          this.list = formattedData
          this.loading = false
        })
      } catch (error) {
        console.log(error)
      }
    },
    selectCourse(id) {
      this.selectedCoursesIds.push(id)
    },
    async saveNew(payload) {
      this.newForm.loading = true

      return TeacherService.new(payload).then((response) => {
        if (response.status === 201) {
          this.newForm.loading = false
          // this.getTeachers() // refresh courses list in defineStore
        }
      })
    },
    async update(payload) {
      this.editForm.loading = true
      return TeacherService.update(payload).then((response) => {
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
        const apiResult = await TeacherService.delete(payload)

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
