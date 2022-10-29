<template>
  <Message severity="success">
    <template v-for="message in message" :key="message">
      {{ message }}
    </template>
  </Message>
</template>

<script setup>
import Message from 'primevue/message'

defineProps({ message: Array })
</script>
