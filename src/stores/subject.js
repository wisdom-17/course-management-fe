import { defineStore } from 'pinia'
import TeacherService from '@/services/Teacher'

export const useSubjectStore = defineStore({
  id: 'subject',
  state: () => ({
    newForm: {
      name: '',
      selectedTeachers: [],
      courseCalendar: null,
      daysAndTimes: [{ day: '', startTime: null, endTime: null }],
      loading: false,
    },
    editForm: {
      id: null,
      name: '',
      hourlyPay: 0,
      loading: false,
    },
    list: {
      data: [],
      loading: false,
    },
    loading: false,
  }),
  getters: {},
  actions: {
    async getTeachers() {
      try {
        this.list.loading = true
        TeacherService.list().then((data) => {
          // convert date string JS Date object
          const formattedData = data.data.map((obj) => {
            return {
              ...obj,
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
    async saveNew(payload) {
      this.newForm.loading = true

      return TeacherService.new(payload).then((response) => {
        if (response.status === 201) {
          this.newForm.loading = false
          this.getTeachers() // refresh teachers list in store
        }
      })
    },
    async update(payload) {
      this.editForm.loading = true
      return TeacherService.update(payload).then((response) => {
        if (response.status === 200) {
          this.getTeachers() // refresh teachers list in store
        }
      })
    },
    async delete(teacherId) {
      try {
        this.loading = true
        const apiResult = await TeacherService.delete(teacherId)

        if (apiResult.status === 200) {
          this.loading = false
          this.getTeachers() // refresh
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
})
