<template>
  <Dropdown
    :modelValue="selectedCourseCalendar"
    :options="courseDateOptions"
    optionLabel="name"
    placeholder="Select a Course Calendar"
    :loading="storeCourseCalendar.list.loading"
    @change="(e) => $emit('update:selectedCourseCalendar', e.value)"
  />
</template>
<script setup>
import { computed, onMounted } from 'vue'
import Dropdown from 'primevue/dropdown'
import { useCourseCalendarStore } from '@/stores/courseCalendar'

const storeCourseCalendar = useCourseCalendarStore()

const courseDateOptions = computed(() => {
  return storeCourseCalendar.list.data.map((courseDateObj) => {
    return { id: courseDateObj.id, name: courseDateObj.name }
  })
})

defineProps(['selectedCourseCalendar'])
defineEmits(['update:selectedCourseCalendar'])

onMounted(() => {
  // check to prevent hammering the API unnecessarily
  if (storeCourseCalendar.list.data.length === 0) {
    storeCourseCalendar.getCourseCalendars()
  }
})
</script>
