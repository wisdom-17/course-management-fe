<template>
  <div class="col courses">
    <h1>Teachers</h1>
    <TeacherToolbar />
    <TeachersTable />
  </div>
</template>

<script setup>
import TeacherToolbar from '@/components/teacher/TeacherToolbar.vue'
import TeachersTable from '@/components/teacher/TeachersTable.vue'
</script>
