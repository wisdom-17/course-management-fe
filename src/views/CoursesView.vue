<template>
  <div class="col courses">
    <h1>Courses</h1>
    <Table :courses="storeCourse.list" :loading="storeCourse.loading" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Table from '@/components/course/Table.vue'
import { useCourseStore } from '@/stores/course'

const storeCourse = useCourseStore()

onMounted(() => {
  // check to prevent hammering the API unnecessarily
  if (storeCourse.list.length === 0) {
    storeCourse.getCourses()
  }
})
</script>
