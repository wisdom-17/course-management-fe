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
      />
    </template>
  </Toolbar>
</template>

<script setup>
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import { useConfirm } from 'primevue/useconfirm'
import { useDialog } from 'primevue/usedialog'
import TeacherForm from '@/components/teacher/TeacherForm.vue'

const confirm = useConfirm()
const dialog = useDialog()

const onClickNewButton = () => {
  dialog.open(TeacherForm, {
    props: {
      style: { width: '60vw' },
      header: 'New Teacher',
    },
  })
}

const onClickDeleteButton = async () => {
  confirm.require({
    message:
      'Are you sure you want to delete the selected course(s) with their term and holiday dates?',
    header: 'Delete',
    icon: 'pi pi-trash',
    acceptClass: 'p-button-danger',
    accept: () => {},
  })
}
</script>
