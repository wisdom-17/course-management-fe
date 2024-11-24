<template>
  <div class="col courses">
    <h1>Teachers</h1>
    <TeacherToolbar :showNewTeacherDialog="showNewTeacherDialog" />
    <TeachersTable />
  </div>
</template>

<script setup>
import TeacherToolbar from '@/components/teacher/TeacherToolbar.vue'
import TeachersTable from '@/components/teacher/TeachersTable.vue'

defineProps({
  showNewTeacherDialog: {
    type: Boolean,
    default: false,
  },
})
</script>
