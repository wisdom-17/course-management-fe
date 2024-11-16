<template>
  <div class="app">
    <Navigation v-if="loginStatus" />
    <div :class="{ 'grid pt-5': loginStatus }">
      <ConfirmDialog />
      <DynamicDialog />
      <Toast />
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import ConfirmDialog from 'primevue/confirmdialog'
import DynamicDialog from 'primevue/dynamicdialog'
import Toast from 'primevue/toast'
import Navigation from '@/components/Navigation.vue'
import { useAuthStore } from '@/stores/auth'

const storeAuth = useAuthStore()

const loginStatus = computed(() => {
  return !!storeAuth.loggedInUser
})
</script>
