<template>
  <div class="app">
    <nav v-if="currentRoute !== 'login'">
      <!-- <RouterLink to="/login">Login</RouterLink> -->
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/about">About</RouterLink>
      <Logout />
    </nav>
    <RouterView />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import Logout from '@/components/Logout.vue'

const currentRoute = computed(() => {
  return useRoute().name
})
</script>

<style>
.app {
  text-align: center;
}
</style>
