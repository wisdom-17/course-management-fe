<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

const currentRoute = computed(() => {
  return useRoute().name
})
</script>

<template>
  <div class="app">
    <nav>
      <RouterLink to="/login">Login</RouterLink> |
      <RouterLink to="/logout">Logout</RouterLink> |
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style>
.app {
  text-align: center;
}
</style>
