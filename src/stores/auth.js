import { defineStore } from 'pinia'
import AuthService from '@/services/AuthService'
// import router from '@/router'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
  }),
  getters: {
    // user: (state) => state.user,
  },
  actions: {
    async getAuthUser() {
      try {
        const response = await AuthService.getAuthUser()
        console.log(response)
        this.user = response.data.data
      } catch (error) {
        console.log(error)
      }
    },
    logout() {
      // return AuthService.logout()
      this.user = null
    },
  },
})
