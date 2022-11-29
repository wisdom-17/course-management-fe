<template>
  <DataTable
    :value="storeTeacher.list.data"
    :loading="storeTeacher.list.loading"
    class="mt-4"
  >
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
          :loading="storeTeacher.loading"
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
import CourseForm from '@/components/course/CourseForm.vue'
import { useTeacherStore } from '@/stores/teacher'

const storeTeacher = useTeacherStore()
const confirm = useConfirm()
const dialog = useDialog()

const stringValueColumns = ref([
  { field: 'name', header: 'Name' },
  { field: 'hourlyRate', header: 'Hourly Rate' },
])

const dateValueColumns = ref([
  { field: 'createdAt', header: 'Created At' },
  { field: 'updatedAt', header: 'Updated At' },
])

const showEditCourseDialog = () => {
  dialog.open(CourseForm, {
    props: {
      style: { width: '60vw' },
      header: 'Edit Course',
    },
    onClose: () => {
      storeTeacher.editForm = {
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
      storeTeacher.delete([rowData.id])
    },
  })
}

const editMenuItems = (rowData) => [
  {
    label: 'Edit Course Details',
    command: () => {
      const { id, name, teachingDays, startDate, endDate } = rowData

      storeTeacher.editForm = {
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
  if (storeTeacher.list.data.length === 0) {
    storeTeacher.getTeachers()
  }
})
</script>
