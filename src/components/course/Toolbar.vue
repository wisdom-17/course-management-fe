<template>
  <Toolbar>
    <template #start>
      <Button
        class="mr-2"
        @click="onClickNewButton()"
        icon="pi pi-plus"
        label="New"
      />
      <Button
        class="p-button-danger"
        @click="onClickDeleteButton()"
        icon="pi pi-trash"
        label="Delete"
        :disabled="isDeleteButtonDisabled"
      />
    </template>
  </Toolbar>
</template>

<script setup>
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

defineProps({
  isDeleteButtonDisabled: {
    type: Boolean,
    default: true,
  },
})
const router = useRouter()

const onClickNewButton = () => {
  // for some reason, using route name doesn't
  // load the nested route component, in this case
  // /new-course/ should should show the step 1 course
  // details form
  // router.push({ name: 'newCourse' })
  router.push({ path: 'new-course' })
}

const onClickDeleteButton = () => {
  console.log('onClickDeleteButton')
}
</script>
