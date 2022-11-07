<template>
  <Card class="mt-4 surface-ground w-auto">
    <template #content>
      <CourseForm @save-success="emitSaveSuccessEvent" />
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
import CourseForm from '@/components/course/CourseForm.vue'

const emit = defineEmits(['saveSuccess'])

const emitSaveSuccessEvent = (message) => {
  emit('saveSuccess', message)
}
</script>
