<template>
  <h1>Login</h1>
  <ErrorMessage
    :message="validation.message"
    v-show="showErrorMessage"
    @close="onClickClose"
  />
  <div class="card h-screen flex justify-content-center align-items-center">
    <form>
      <div class="field mt-4 grid">
        <span class="p-float-label">
          <InputText id="email" type="text" v-model="auth.email" size="23" />
          <label for="email">Email</label>
        </span>
      </div>
      <div class="field mt-4 grid">
        <span class="p-float-label">
          <Password
            id="password"
            v-model="auth.password"
            :feedback="false"
            toggleMask
            size="23"
          />
          <label for="password">Password</label>
        </span>
      </div>
      <div class="field grid mt-4">
        <Button @click="login" label="Login" />
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import AuthService from '@/services/AuthService'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import ErrorMessage from '@/components/ErrorMessage.vue'

const storeAuth = useAuthStore()

const auth = ref({ email: '', password: '' })
const validation = ref({ message: '' })
const showErrorMessage = ref(false)

const login = async () => {
  const payload = {
    email: auth.value.email,
    password: auth.value.password,
  }

  try {
    await AuthService.login(payload)
    await storeAuth.getAuthenticatedUserDetails()
    if (storeAuth.loggedInUser) {
      router.push({ name: 'home' })
    } else {
      console.error('loggedInUser is falsy')
    }
  } catch (error) {
    console.error(error.response.data)
    validation.value.message = error.response.data.message
    showErrorMessage.value = true
  }
}

const onClickClose = () => {
  validation.value.message = ''
  showErrorMessage.value = false
}
</script>
