import { defineStore } from 'pinia'
import CourseCalendarService from '@/services/CourseCalendar'

export const useCourseCalendarStore = defineStore({
  id: 'courseCalendar',
  state: () => ({
    newForm: {
      calendarName: '',
      startDate: '',
      endDate: '',
      // default value for semester is:
      // 1 semester
      // 1 term date
      // 1 holiday date
      // (need to show at least one field in the form)
      semesters: [{ name: '' }],
      terms: [{ name: '' }],
      holidays: [{ name: '' }],
      loading: false,
    },
    multiStepForm: {
      id: null,
      name: '',
      startDate: '',
      endDate: '',
      loading: false,
      courseCalendarStatus: 'new',
      formData: {
        courseCalendarDetails: {
          name: '',
          dateRange: [],
        },
        termDates: {},
        holidayDates: {},
      },
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
    async getCourseCalendars() {
      try {
        this.list.loading = true
        CourseCalendarService.list().then((data) => {
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
      this.multiStepForm.loading = true

      return CourseCalendarService.new(payload).then((response) => {
        if (response.status === 201) {
          this.multiStepForm.loading = false
          this.multiStepForm.id = response.data.id
          this.multiStepForm.name = payload.name
          this.multiStepForm.startDate = payload.startDate
          this.multiStepForm.endDate = payload.endDate

          this.getCourseCalendars() // refresh courses list in defineStore
        }
      })
    },
    async saveNewCalendar(payload) {
      this.newForm.loading = true

      return CourseCalendarService.new(payload).then((response) => {
        if (response.status === 201) {
          this.newForm.loading = false
          this.getCourseCalendars() // refresh courses list in defineStore
        }
      })
    },
    async update(payload) {
      this.editForm.loading = true
      return CourseCalendarService.update(payload).then((response) => {
        if (response.status === 200) {
          this.getCourseCalendars() // refresh courses list in store
        }
      })
    },
    async delete(courseIds) {
      try {
        this.list.loading = true
        const payload = {
          courseIds: [...courseIds],
        }
        const apiResult = await CourseCalendarService.delete(payload)

        if (apiResult.status === 200) {
          this.list.loading = false
          this.getCourseCalendars() // refresh
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
})
