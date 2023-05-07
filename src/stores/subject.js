import { defineStore } from 'pinia'
import _pick from 'lodash/pick'
import SubjectService from '@/services/Subject'

const defaultState = {
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
    total: 0,
  },
  loading: false,
}

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
    async getSubjects(page = 1) {
      try {
        this.list.loading = true
        SubjectService.list(page).then((data) => {
          const formattedData = data.data.subjects.map((obj) => {
            return {
              ...obj,
              daysAndTimes: obj.daysAndTimes.reduce((group, item) => {
                const day = item.day
                group[day] = group[day] ?? []
                group[day].push(item)
                return group
              }, {}),
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

      return SubjectService.new(payload).then((response) => {
        if (response.status === 201) {
          this.newForm.loading = false
          this.reset(['newForm'])
          this.getSubjects() // refresh subjects list in store
        }
      })
    },
    async update(payload) {
      this.editForm.loading = true
      return SubjectService.update(payload).then((response) => {
        if (response.status === 200) {
          this.getSubjects() // refresh subjects list in store
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
    reset(keys) {
      // defaultState is reactive so will not return expected results in some circumstances
      // to address this, we have to do a fresh copy of defaultState
      const freshDefaultState = JSON.parse(JSON.stringify(defaultState))
      Object.assign(
        this,
        keys?.length ? _pick(freshDefaultState, keys) : freshDefaultState
      )
    },
  },
})
