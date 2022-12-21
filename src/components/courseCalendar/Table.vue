<template>
  <Toolbar
    :selectedCourses="selectedCourses"
    @delete-success="selectedCourses = []"
  />
  <DataTable
    :value="storeCourse.list.data"
    v-model:selection="selectedCourses"
    :loading="storeCourse.list.loading"
    class="mt-4"
  >
    <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
    <Column
      v-for="col in stringValueColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
    ></Column>
    <Column
      v-for="col in dateValueColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
    >
      <template #body="slotProps">
        {{ formatDate(slotProps.data[col.field]) }}
      </template>
    </Column>
    <Column style="min-width: 10rem">
      <template #body="slotProps">
        <SplitButton
          icon="pi pi-pencil"
          class="p-button-rounded p-button-primary mr-2"
          :model="editMenuItems(slotProps.data)"
        />
        <Button
          icon="pi pi-trash"
          class="p-button-rounded p-button-danger"
          @click="onClickDeleteButton(slotProps.data)"
          :loading="storeCourse.list.loading"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useDialog } from 'primevue/usedialog'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import SplitButton from 'primevue/splitbutton'
import Column from 'primevue/column'
import CourseCalendarForm from '@/components/courseCalendar/CourseCalendarForm.vue'
import Toolbar from '@/components/courseCalendar/Toolbar.vue'
import { useCourseStore } from '@/stores/course'

const storeCourse = useCourseStore()
const confirm = useConfirm()
const dialog = useDialog()

const selectedCourses = ref([])

const stringValueColumns = ref([
  { field: 'name', header: 'Name' },
  { field: 'teachingDays', header: 'Teaching Days' },
])

const dateValueColumns = ref([
  { field: 'startDate', header: 'Start Date' },
  { field: 'endDate', header: 'End Date' },
  { field: 'createdAt', header: 'Created At' },
  { field: 'updatedAt', header: 'Updated At' },
])

const showEditCourseDialog = () => {
  dialog.open(CourseCalendarForm, {
    props: {
      style: { width: '60vw' },
      header: 'Edit Course',
    },
    onClose: () => {
      storeCourse.editForm = {
        id: null,
        name: '',
        dateRange: [],
        teachingDays: [],
      }
    },
  })
}

const onClickDeleteButton = async (rowData) => {
  confirm.require({
    message:
      'Are you sure you want to delete the selected course(s) with their term and holiday dates?',
    header: 'Delete',
    icon: 'pi pi-trash',
    acceptClass: 'p-button-danger',
    accept: () => {
      storeCourse.delete([rowData.id])
    },
  })
}

const editMenuItems = (rowData) => [
  {
    label: 'Edit Course Details',
    command: () => {
      const { id, name, teachingDays, startDate, endDate } = rowData

      storeCourse.editForm = {
        id,
        name,
        teachingDays,
        dateRange: [startDate, endDate],
      }
      showEditCourseDialog()
    },
  },
  {
    label: 'Edit Term Dates',
    command: () => {
      console.log('clicked edit term dates details')
      console.log(rowData)
    },
  },
  {
    label: 'Edit Holiday Dates',
    command: () => {
      console.log('clicked edit holiday details')
      console.log(rowData)
    },
  },
]

const formatDate = (dateObj) => {
  return `${dateObj.getDate()}/${
    dateObj.getMonth() + 1
  }/${dateObj.getFullYear()}`
}

onMounted(() => {
  // check to prevent hammering the API unnecessarily
  if (storeCourse.list.data.length === 0) {
    storeCourse.getCourses()
  }
})
</script>
