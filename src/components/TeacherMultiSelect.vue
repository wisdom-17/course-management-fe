<template>
  <MultiSelect
    v-model="subjectStore.newForm.teachers"
    :options="teacherOptions"
    optionLabel="name"
    placeholder="Select Teacher(s)"
    :loading="teacherStore.all.loading"
    :filter="true"
  />
</template>
<script setup>
import { computed, onMounted } from 'vue'
import MultiSelect from 'primevue/multiselect'
import { useSubjectStore } from '@/stores/subject'
import { useTeacherStore } from '@/stores/teacher'

const subjectStore = useSubjectStore()
const teacherStore = useTeacherStore()

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
