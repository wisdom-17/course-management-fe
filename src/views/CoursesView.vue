<template>
  <div class="col courses">
    <h1>Courses</h1>
    <Toolbar />
    <Table :courses="courses" class="mt-4" :loading="loading" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CourseService from '@/services/Course'
import Table from '@/components/course/Table.vue'
import Toolbar from '@/components/course/Toolbar.vue'

const courses = ref([])
const loading = ref(false)

onMounted(() => {
  loading.value = true
  CourseService.list().then((data) => {
    courses.value = data.data
    loading.value = false
  })
})
</script>
