<template>
  <h1>Login</h1>
  <form>
    <span class="p-float-label">
      <InputText id="email" type="text" v-model="email" />
      <label for="email">Email</label>
    </span>
    <span class="p-float-label">
      <Password id="password" v-model="password" :feedback="false" toggleMask />
      <label for="password">Password</label>
    </span>
  </form>
</template>
<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'

const email = ref()
const password = ref()
</script>
