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
import { useRouter } from 'vue-router'
import { useCourseStore } from '@/stores/course'
import { useConfirm } from 'primevue/useconfirm'

const storeCourse = useCourseStore()
const confirm = useConfirm()

const props = defineProps({
  selectedCourses: {
    type: Array,
    default: () => [],
  },
})
const router = useRouter()

const emit = defineEmits(['deleteSuccess'])

const onClickNewButton = () => {
  // for some reason, using route name doesn't
  // load the nested route component, in this case
  // /new-course/ should should show the step 1 course
  // details form
  // router.push({ name: 'newCourse' })
  router.push({ path: 'new-course-' })
}

const onClickDeleteButton = async () => {
  confirm.require({
    message:
      'Are you sure you want to delete the selected course (s) with their term and holiday dates?',
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
