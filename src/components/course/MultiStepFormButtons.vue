<template>
  <div class="flex justify-content-between">
    <div class="flex"></div>
    <div class="flex align-self-end">
      <CancelButton class="mr-2" />
      <Button
        v-if="hasPreviousButton"
        class="mr-2"
        icon="pi pi-angle-double-left"
        label="Previous Step"
        @click="$emit('previousButtonClicked')"
      />
      <Button
        v-if="hasSaveButton"
        class="mr-2"
        icon="pi pi-save"
        label="Save"
        @click="$emit('saveButtonClicked')"
        :loading="isLoading"
      />
      <Button
        v-if="hasNextButton"
        class="mr-2"
        icon="pi pi-angle-double-right"
        label="Next Step"
        @click="$emit('nextButtonClicked')"
        :loading="isLoading"
      />
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import CancelButton from '@/components/course/CancelButton.vue'

defineProps({
  hasSaveButton: { type: Boolean, default: false },
  hasNextButton: { type: Boolean, default: false },
  hasPreviousButton: { type: Boolean, default: false },
  isLoading: { type: Boolean, default: false },
})
</script>
