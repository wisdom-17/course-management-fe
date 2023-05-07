<template>
  <Dropdown
    v-model="selectedTeacher"
    :options="teacherOptions"
    optionLabel="name"
    placeholder="Select a Teacher"
    :loading="storeTeacher.all.loading"
    filter
  />
</template>
<script setup>
import { computed, ref, onMounted } from 'vue'
import Dropdown from 'primevue/dropdown'
import { useTeacherStore } from '@/stores/teacher'

const teacherStore = useTeacherStore()

const selectedTeacher = ref(null)

const teacherOptions = computed(() => {
  return teacherStore.all.data.map((teacherObj) => {
    return { id: teacherObj.id, name: teacherObj.name }
  })
})

onMounted(() => {
  // check to prevent hammering the API unnecessarily
  if (teacherStore.all.data.length === 0) {
    teacherStore.getAllTeachers()
  }
})
</script>
