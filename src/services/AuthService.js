import { axiosClient } from '@/services/Axios'

export default {
  async login(payload) {
    await axiosClient.get('/sanctum/csrf-cookie')
    return axiosClient.post('/login', payload)
  },
  logout() {
    return axiosClient.post('/logout')
  },
  async forgotPassword(payload) {
    await axiosClient.get('/sanctum/csrf-cookie')
    return axiosClient.post('/forgot-password', payload)
  },
  getAuthUser() {
    return axiosClient.get('/api/users/auth')
  },
  async resetPassword(payload) {
    await axiosClient.get('/sanctum/csrf-cookie')
    return axiosClient.post('/reset-password', payload)
  },
  updatePassword(payload) {
    return axiosClient.put('/user/password', payload)
  },
  async registerUser(payload) {
    await axiosClient.get('/sanctum/csrf-cookie')
    return axiosClient.post('/register', payload)
  },
  sendVerification(payload) {
    return axiosClient.post('/email/verification-notification', payload)
  },
  updateUser(payload) {
    return axiosClient.put('/user/profile-information', payload)
  },
}
