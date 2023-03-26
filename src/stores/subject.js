import { defineStore } from 'pinia'
import SubjectService from '@/services/Subject'

export const useSubjectStore = defineStore({
  id: 'subject',
  state: () => ({
    newForm: {
      name: '',
      teachers: [],
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
    async getSubjects() {
      try {
        this.list.loading = true
        SubjectService.list().then((data) => {
          // console.log(data.data)
          // convert date string JS Date object
          const formattedData = data.data.subjects.map((obj) => {
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

      return SubjectService.new(payload).then((response) => {
        if (response.status === 201) {
          this.newForm.loading = false
          this.getSubjects() // refresh teachers list in store
        }
      })
    },
    async update(payload) {
      this.editForm.loading = true
      return SubjectService.update(payload).then((response) => {
        if (response.status === 200) {
          this.getSubjects() // refresh teachers list in store
        }
      })
    },
    async delete(teacherId) {
      try {
        this.loading = true
        const apiResult = await SubjectService.delete(teacherId)

        if (apiResult.status === 200) {
          this.loading = false
          this.getSubjects() // refresh
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
})
