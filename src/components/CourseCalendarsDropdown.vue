<template>
  <Dropdown
    v-model="storeSubject.newForm.courseCalendar"
    :options="courseDateOptions"
    optionLabel="name"
    placeholder="Select a Course Calendar"
    :loading="storeCourseCalendar.list.loading"
  />
</template>
<script setup>
import { computed, onMounted } from 'vue'
import Dropdown from 'primevue/dropdown'
import { useCourseCalendarStore } from '@/stores/courseCalendar'
import { useSubjectStore } from '@/stores/subject'

const storeCourseCalendar = useCourseCalendarStore()
const storeSubject = useSubjectStore()

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
