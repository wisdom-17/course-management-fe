<template>
  <h1>Login</h1>
  <Dialog v-model:visible="display">Hello World</Dialog>
</template>
<script setup>
import { ref } from 'vue'
// const props = defineProps(['display'])
const display = ref(true)
</script>
