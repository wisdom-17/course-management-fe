import { defineStore } from 'pinia'
import TimetableService from '@/services/Timetable'

export const useTimetableStore = defineStore({
  id: 'timetable',
  state: () => ({
    timetable: {
      data: {},
      loading: false,
    },
  }),
  getters: {},
  actions: {
    async getTimetable(courseId) {
      try {
        this.timetable.loading = true
        TimetableService.getTimetable(courseId).then((data) => {
          this.timetable.data = data.data
          this.timetable.loading = false
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
})
