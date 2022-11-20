<template>
  <Card class="mt-4 surface-ground w-auto">
    <template #content>
      <CourseForm />
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
import CourseForm from '@/components/course/CourseForm.vue'
</script>
