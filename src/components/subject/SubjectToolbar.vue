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
import { onMounted } from 'vue'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import { useDialog } from 'primevue/usedialog'
import SubjectForm from '@/components/subject/SubjectForm.vue'

const dialog = useDialog()

const props = defineProps({
  showNewSubjectDialog: {
    type: Boolean,
    default: false,
  },
})

const onClickNewButton = () => {
  openNewSubjectDialog()
}

const openNewSubjectDialog = () => {
  dialog.open(SubjectForm, {
    props: {
      style: { width: '60vw' },
      header: 'New Subject',
      modal: true,
    },
  })
}

onMounted(() => {
  if (props.showNewSubjectDialog) {
    openNewSubjectDialog()
  }
})
</script>
