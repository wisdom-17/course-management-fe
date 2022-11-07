<template>
  <Card class="mt-4 surface-ground w-auto">
    <template #content>
      <DatesForm
        type="Term"
        :hasPreviousButton="false"
        :hasSaveButton="false"
        hasNextButton
        @save-success="emitSaveSuccessEvent"
        hasDeleteDatePickerButton
      />
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
import DatesForm from '@/components/course/DatesForm.vue'

const emit = defineEmits(['saveSuccess'])

const emitSaveSuccessEvent = (message) => {
  emit('saveSuccess', message)
}
</script>
