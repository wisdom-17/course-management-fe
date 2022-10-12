<template>
  <h1>Login</h1>
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

const storeAuth = useAuthStore()

const auth = ref({ email: '', password: '' })

const login = async () => {
  const payload = {
    email: auth.value.email,
    password: auth.value.password,
  }
  console.log(payload)

  try {
    await AuthService.login(payload)
    const loggedInUser = storeAuth.getAuthUser()
    if (loggedInUser) {
      router.push({ name: 'home' })
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
