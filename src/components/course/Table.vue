<template>
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
    <Column>
      <template #body="slotProps">
        <SplitButton
          icon="pi pi-pencil"
          class="p-button-rounded p-button-success mr-2"
          :model="editMenuItems(slotProps.data)"
        />
        <Button
          icon="pi pi-trash"
          class="p-button-rounded p-button-danger"
          @click="onClickDeleteButton(slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import SplitButton from 'primevue/splitbutton'
import Column from 'primevue/column'
import Toolbar from '@/components/course/Toolbar.vue'
import { useCourseStore } from '@/stores/course'

const storeCourse = useCourseStore()

const selectedCourses = ref([])

const columns = ref([
  { field: 'name', header: 'Name' },
  { field: 'startDate', header: 'Start Date' },
  { field: 'endDate', header: 'End Date' },
  { field: 'teachingDays', header: 'Teaching Days' },
  { field: 'createdAt', header: 'Created At' },
  { field: 'updatedAt', header: 'Updated At' },
])

const onClickDeleteButton = (rowData) => {
  console.log('clicked delete button')
  console.log(rowData)
}

const editMenuItems = (rowData) => [
  {
    label: 'Edit Course Details',
    command: () => {
      console.log(rowData)
      console.log('clicked edit course details')
      // console.log(currentRowData.value)
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

onMounted(() => {
  // check to prevent hammering the API unnecessarily
  if (storeCourse.list.length === 0) {
    storeCourse.getCourses()
  }
})
</script>
