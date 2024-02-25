<template>
  <Card>
    <template v-slot:title>
      <h4>{{ day }}</h4>
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'

defineProps({
  day: { type: String, default: '' },
})
</script>
