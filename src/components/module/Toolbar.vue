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
import ModuleForm from '@/components/module/ModuleForm.vue'

const dialog = useDialog()

const onClickNewButton = () => {
  dialog.open(ModuleForm, {
    props: {
      style: { width: '60vw' },
      header: 'New Module',
      modal: true,
    },
  })
}
</script>
