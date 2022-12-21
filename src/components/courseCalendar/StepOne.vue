<template>
  <Card class="mt-4 surface-ground w-auto">
    <template #content>
      <CourseCalendarForm />
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
import CourseCalendarForm from '@/components/courseCalendar/CourseCalendarForm.vue'
</script>
