import { defineStore } from 'pinia'
import AuthService from '@/services/AuthService'
import router from '@/router'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    loggedInUser: null,
  }),
  getters: {
    // user: (state) => state.user,
  },
  actions: {
    async getAuthenticatedUserDetails() {
      try {
        const response = await AuthService.getAuthUser()
        console.log(response)
        this.loggedInUser = response.data.data
      } catch (error) {
        console.log(error)
      }
    },
    logout() {
      return AuthService.logout().then(() => {
        this.loggedInUser = null
        if (router.currentRoute.name !== 'login') router.push({ name: 'login' })
      })
    },
  },
})
