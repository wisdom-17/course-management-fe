<template>
  <Button
    class="p-button-danger"
    icon="pi pi-trash"
    label="Cancel"
    @click="onClickCancelButton"
  />
</template>

<script setup>
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useConfirm } from 'primevue/useconfirm'

const confirm = useConfirm()
const router = useRouter()

const onClickCancelButton = () => {
  confirm.require({
    message:
      'Are you sure you want to cancel? Clicking "Yes" will take you to the Course s list page and any unsaved changes will be lost.',
    header: 'Cancel',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      router.push({ name: 'courses' })
    },
  })
}
</script>
