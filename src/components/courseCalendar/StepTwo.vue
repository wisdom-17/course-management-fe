<template>
  <Card class="mt-4 surface-ground w-auto">
    <template #content>
      <DatesForm
        type="Term"
        :hasPreviousButton="false"
        :hasSaveButton="false"
        hasNextButton
      />
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
import DatesForm from '@/components/courseCalendar/DatesForm.vue'
</script>
