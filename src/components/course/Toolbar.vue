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
  // for some reason, using route name doesn't
  // load the nested route component, in this case
  // /new-course/ should should show the step 1 course
  // details form
  // router.push({ name: 'newCourse' })
  router.push({ path: 'new-course' })
}
</script>
