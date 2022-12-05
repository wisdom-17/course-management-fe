<template>
  <Dropdown
    v-model="selectedCourseDate"
    :options="courseDateOptions"
    optionLabel="name"
    placeholder="Select a Course Date"
    :loading="storeCourseDates.list.loading"
  />
</template>
<script setup>
import { computed, ref, onMounted } from 'vue'
import Dropdown from 'primevue/dropdown'
import { useCourseStore } from '@/stores/course'

const storeCourseDates = useCourseStore()

const selectedCourseDate = ref(null)

const courseDateOptions = computed(() => {
  return storeCourseDates.list.data.map((courseDateObj) => {
    return { id: courseDateObj.id, name: courseDateObj.name }
  })
})

onMounted(() => {
  // check to prevent hammering the API unnecessarily
  if (storeCourseDates.list.data.length === 0) {
    storeCourseDates.getCourses()
  }
})
</script>
