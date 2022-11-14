<template>
  <EditCourseDetails
    :displayEditModal="displayEditModal"
    @editCourseModalHidden="onHideEditCourseModal"
  />
  <Toolbar
    :selectedCourses="selectedCourses"
    @delete-success="selectedCourses = []"
  />
  <DataTable
    :value="storeCourse.list"
    v-model:selection="selectedCourses"
    :loading="storeCourse.loading"
    class="mt-4"
  >
    <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
    <Column
      v-for="col in columns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
    ></Column>
    <Column style="min-width:10rem">
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
          :loading="storeCourse.loading"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import SplitButton from 'primevue/splitbutton'
import Column from 'primevue/column'
import EditCourseDetails from './modals/EditCourseDetails.vue'
import Toolbar from '@/components/course/Toolbar.vue'
import { useCourseStore } from '@/stores/course'

const storeCourse = useCourseStore()
const confirm = useConfirm()

const selectedCourses = ref([])

const columns = ref([
  { field: 'name', header: 'Name' },
  { field: 'startDate', header: 'Start Date' },
  { field: 'endDate', header: 'End Date' },
  { field: 'teachingDays', header: 'Teaching Days' },
  { field: 'createdAt', header: 'Created At' },
  { field: 'updatedAt', header: 'Updated At' },
])

const displayEditModal = ref(false)

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
      console.log(rowData)
      console.log('clicked edit course details')
      displayEditModal.value = true
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

const onHideEditCourseModal = () => {
  displayEditModal.value = false
}

onMounted(() => {
  // check to prevent hammering the API unnecessarily
  if (storeCourse.list.length === 0) {
    storeCourse.getCourses()
  }
})
</script>
