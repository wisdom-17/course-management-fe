<template>
  <Dropdown
    :modelValue="selectedCourse"
    :options="courseDateOptions"
    optionLabel="name"
    placeholder="Select a Course "
    :loading="storeCourse.list.loading"
    @change="(e) => $emit('update:selectedCourse', e.value)"
  />
</template>
<script setup>
import { computed, onMounted } from 'vue'
import Dropdown from 'primevue/dropdown'
import { useCourseStore } from '@/stores/course'

const storeCourse = useCourseStore()

const courseDateOptions = computed(() => {
  return storeCourse.list.data.map((courseDateObj) => {
    return { id: courseDateObj.id, name: courseDateObj.name }
  })
})

defineProps(['selectedCourse'])
defineEmits(['update:selectedCourse'])

onMounted(() => {
  // check to prevent hammering the API unnecessarily
  if (storeCourse.list.data.length === 0) {
    storeCourse.getCourses()
  }
})
</script>
