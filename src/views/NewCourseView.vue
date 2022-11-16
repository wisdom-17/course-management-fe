<template>
  <div class="col new-course">
    <Steps :model="items" class="mt-4" />
    <RouterView @save-success="showSuccessToast" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Steps from 'primevue/steps'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const items = ref([
  { label: 'Course Details', to: { name: 'courseStepOne' } },
  { label: 'Term Dates', to: { name: 'courseStepTwo' } },
  { label: 'Holiday Dates', to: { name: 'courseStepThree' } },
])

const showSuccessToast = (message) => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: message,
    life: 2000,
  })
}
</script>
