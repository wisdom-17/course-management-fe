<template>
  <MultiSelect
    v-model="storeSubject.newForm.teachers"
    :options="teacherOptions"
    optionLabel="name"
    placeholder="Select Teacher(s)"
    :loading="storeTeacher.list.loading"
  />
</template>
<script setup>
import { computed, onMounted } from 'vue'
import MultiSelect from 'primevue/multiselect'
import { useSubjectStore } from '@/stores/subject'
import { useTeacherStore } from '@/stores/teacher'

const storeSubject = useSubjectStore()
const storeTeacher = useTeacherStore()

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
