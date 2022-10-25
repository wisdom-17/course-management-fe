<template>
  <div class="app">
    <Navigation v-if="currentRoute !== 'login'" />
    <div :class="{ grid: currentRoute !== 'login' }">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Navigation from '@/components/Navigation.vue'

const currentRoute = computed(() => {
  return useRoute().name
})
</script>
