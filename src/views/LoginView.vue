<template>
  <div class="card h-screen flex justify-content-center align-items-center">
    <form>
      <div class="field mt-4 grid">
        <span class="p-float-label">
          <InputText id="email" type="text" v-model="email" />
          <label for="email">Email</label>
        </span>
      </div>
      <div class="field mt-4 grid">
        <span class="p-float-label">
          <Password
            id="password"
            v-model="password"
            :feedback="false"
            toggleMask
          />
          <label for="password">Password</label>
        </span>
      </div>
      <div class="field grid mt-4">
        <Button label="Login" />
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

const email = ref()
const password = ref()
</script>
