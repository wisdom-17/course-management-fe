<template>
  <Toolbar>
    <template #start>
      <Button
        class="mr-2"
        @click="onClickNewButton()"
        icon="pi pi-plus"
        label="New"
      />
    </template>
  </Toolbar>
</template>

<script setup>
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import { useDialog } from 'primevue/usedialog'
import TeacherForm from '@/components/teacher/TeacherForm.vue'

const dialog = useDialog()

const onClickNewButton = () => {
  dialog.open(TeacherForm, {
    props: {
      style: { width: '60vw' },
      header: 'New Teacher',
    },
  })
}
</script>
