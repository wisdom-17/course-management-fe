<template>
  <Toolbar>
    <template #start>
      <Button
        class="mr-2"
        @click="() => router.push({ name: 'courses' })"
        icon="pi pi-arrow-left"
        label="Back to Courses list"
      />
    </template>
  </Toolbar>
</template>

<script setup>
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'

import { useRouter } from 'vue-router'

const router = useRouter()

</script>
