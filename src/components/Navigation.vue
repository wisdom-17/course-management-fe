<template>
  <Menubar :model="items">
    <template v-slot:end>
      <Logout />
    </template>
  </Menubar>
</template>

<script setup>
import Menubar from 'primevue/menubar'
import Logout from '@/components/Logout.vue'

const items = [
  {
    label: 'Home',
    icon: 'pi pi-home',
    to: { name: 'home' },
  },
  {
    label: 'About',
    icon: 'pi pi-info-circle',
    to: { name: 'about' },
  },
]
</script>
