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
        this.loggedInUser = response.data.data
      } catch (error) {
        console.error(error)
        this.loggedInUser = null
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
