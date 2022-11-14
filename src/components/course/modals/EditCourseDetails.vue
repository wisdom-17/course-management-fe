<template>
  <Dialog v-model:visible="showModal" :style="{ width: '60vw' }">
    <CourseForm />
  </Dialog>
</template>

<script setup>
import { computed } from 'vue'
import Dialog from 'primevue/dialog'
import CourseForm from '@/components/course/CourseForm.vue'

const emit = defineEmits(['editCourseModalHidden'])

const showModal = computed({
  get() {
    return props.displayEditModal
  },
  set() {
    emit('editCourseModalHidden')
  },
})

const props = defineProps({
  displayEditModal: {
    type: Boolean,
    default: false,
  },
  course: {
    type: Object
  }
})
</script>
