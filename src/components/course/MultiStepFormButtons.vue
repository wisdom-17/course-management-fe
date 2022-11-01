<template>
  <div class="flex justify-content-between">
    <div class="flex">
      <Button
        class="mr-2"
        icon="pi pi-save"
        label="Save"
        @click="$emit('saveButtonClicked')"
      />
      <Button
        class="mr-2"
        icon="pi pi-angle-double-right"
        label="Next Step"
        @click="$emit('nextButtonClicked')"
      />
    </div>
    <div class="flex align-self-end">
      <CancelButton />
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import CancelButton from '@/components/course/CancelButton.vue'


</script>
