<template>
  <Dropdown
    v-model="selectedCalendar"
    :options="courseDateOptions"
    optionLabel="name"
    placeholder="Select a Course Calendar"
    :loading="storeCourseDates.list.loading"
  />
</template>
<script setup>
import { computed, ref, onMounted } from 'vue'
import Dropdown from 'primevue/dropdown'
import { useCourseCalendarStore } from '@/stores/courseCalendar'

const storeCourseCalendar = useCourseCalendarStore()

const selectedCalendar = ref(null)

const courseDateOptions = computed(() => {
  return storeCourseCalendar.list.data.map((courseDateObj) => {
    return { id: courseDateObj.id, name: courseDateObj.name }
  })
})

onMounted(() => {
  // check to prevent hammering the API unnecessarily
  if (storeCourseCalendar.list.data.length === 0) {
    storeCourseCalendar.getCourseCalendars()
  }
})
</script>
