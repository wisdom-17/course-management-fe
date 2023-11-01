<template>
  <div class="col new-course">
    <Steps :model="items" class="mt-4" :readonly="false" />
    <RouterView />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Steps from 'primevue/steps'

const items = ref([
  { label: 'Course Details', to: { name: 'courseStepOne' } },
  { label: 'Term Dates', to: { name: 'courseStepTwo' } },
  { label: 'Holiday Dates', to: { name: 'courseStepThree' } },
])
</script>
