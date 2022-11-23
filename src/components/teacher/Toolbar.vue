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
        :disabled="selectedCourses.length === 0"
      />
    </template>
  </Toolbar>
</template>

<script setup>
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import { useCourseStore } from '@/stores/course'
import { useConfirm } from 'primevue/useconfirm'
import { useDialog } from 'primevue/usedialog'
import TeacherForm from '@/components/teacher/TeacherForm.vue'

const storeCourse = useCourseStore()
const confirm = useConfirm()
const dialog = useDialog()

const props = defineProps({
  selectedCourses: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['deleteSuccess'])

const onClickNewButton = () => {
  console.log('new button clicked')
  dialog.open(TeacherForm)
}

const onClickDeleteButton = async () => {
  confirm.require({
    message:
      'Are you sure you want to delete the selected course(s) with their term and holiday dates?',
    header: 'Delete',
    icon: 'pi pi-trash',
    acceptClass: 'p-button-danger',
    accept: () => {
      const selectedCoursesIds = props.selectedCourses.map((obj) => obj.id)
      // this event is used to clear the selected courses which
      // in turn is used to determine the delete buttons active/disabled status
      storeCourse.delete(selectedCoursesIds).then(() => {
        emit('deleteSuccess')
      })
    },
  })
}
</script>
