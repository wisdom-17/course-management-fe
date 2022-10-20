<template>
  <Toolbar>
    <template #start>
      <Button @click="handleNewButtonClick()" icon="pi pi-plus" label="New" />
    </template>
  </Toolbar>
</template>

<script setup>
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleNewButtonClick = () => {
  router.push({ name: 'newCourse' })
}
</script>
