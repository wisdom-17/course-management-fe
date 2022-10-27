<template>
  <Menubar :model="items">
    <template v-slot:end>
      <Logout />
    </template>
  </Menubar>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Menubar from 'primevue/menubar'
import Logout from '@/components/Logout.vue'

const route = useRoute()

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    to: { name: 'home' },
  },
  {
    label: 'Courses',
    icon: 'pi pi-calculator',
    to: { name: 'courses' },
  },
  {
    label: 'About',
    icon: 'pi pi-info-circle',
    to: { name: 'about' },
  },
])

// Buggy since updating to Primevue v3.18.0
watch(
  () => route.name,
  (newRoute, previousRoute) => {
    // remove active style from link to previous page
    if (items.value.find((obj) => obj.to.name === previousRoute)) {
      items.value.find((obj) => obj.to.name === previousRoute).class = ''
    }

    // add active style to link on current page
    if (items.value.find((obj) => obj.to.name === newRoute)) {
      items.value.find((obj) => obj.to.name === newRoute).class =
        'p-menuitem-active'
    }
  },
  // this ensures the watch is run on initialisation too
  { immediate: true }
)
</script>
