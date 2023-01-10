<template>
  <MultiSelect
    v-model="selectedTeacher"
    :options="teacherOptions"
    optionLabel="name"
    placeholder="Select Teacher(s)"
    :loading="storeTeacher.list.loading"
  />
</template>
<script setup>
import { computed, ref, onMounted } from 'vue'
import MultiSelect from 'primevue/multiselect'
import { useTeacherStore } from '@/stores/teacher'

const storeTeacher = useTeacherStore()

const selectedTeacher = ref(null)

const teacherOptions = computed(() => {
  return storeTeacher.list.data.map((teacherObj) => {
    return { id: teacherObj.id, name: teacherObj.name }
  })
})

onMounted(() => {
  // check to prevent hammering the API unnecessarily
  if (storeTeacher.list.data.length === 0) {
    storeTeacher.getTeachers()
  }
})
</script>
