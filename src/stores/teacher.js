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
    list: {
      data: [],
      loading: false,
      total: 0,
    },
    loading: false,
  }),
  getters: {},
  actions: {
    async getTeachers(page = 1) {
      try {
        this.list.loading = true
        TeacherService.list(page).then((data) => {
          // convert date string JS Date object
          const formattedData = data.data.teachers.map((obj) => {
            return {
              ...obj,
              createdAt: new Date(obj.createdAt),
              updatedAt: new Date(obj.updatedAt),
              deletedAt: new Date(obj.deletedAt),
            }
          })
          this.list.data = formattedData
          this.list.total = data.data.meta.total
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
