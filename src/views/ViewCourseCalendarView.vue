<template>
  <div class="col courses">
    <Card class="mt-3">
      <template #title>View #{{ id }} Course Calendar</template>

      <template #content>Under construction</template>
    </Card>
  </div>
</template>

<script setup>
import Card from 'primevue/card'

defineProps({
  id: { type: Number, default: 0 },
})
</script>
