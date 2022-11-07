<template>
  <div class="col new-course">
    <ConfirmDialog></ConfirmDialog>
    <Toast />
    <Steps :model="items" class="mt-4" :readonly="false" />
    <RouterView @save-success="showSuccessToast" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import ConfirmDialog from 'primevue/confirmdialog'
import Steps from 'primevue/steps'
import Toast from 'primevue/toast'
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
