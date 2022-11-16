<template>
  <div class="app">
    <Navigation v-if="currentRoute !== 'login'" />
    <div :class="{ grid: currentRoute !== 'login' }">
      <ConfirmDialog />
      <DynamicDialog />
      <Toast />
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import ConfirmDialog from 'primevue/confirmdialog'
import DynamicDialog from 'primevue/dynamicdialog'
import Toast from 'primevue/toast'
import Navigation from '@/components/Navigation.vue'

const currentRoute = computed(() => {
  return useRoute().name
})
</script>
