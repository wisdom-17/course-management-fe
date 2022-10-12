<template>
  <Message severity="error">{{ message }}</Message>
</template>

<script setup>
import Message from 'primevue/message'

// eslint-disable-next-line no-unused-vars
const props = defineProps({ message: String })
</script>
