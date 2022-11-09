<template>
  <!-- <pre>{{ selectedCourses }}</pre> -->
  <Toolbar :isDeleteButtonDisabled="selectedCourses.length === 0" />
  <DataTable
    :value="courses"
    v-model:selection="selectedCourses"
    :loading="loading"
    @rowSelect="rowSelected"
    class="mt-4"
  >
    <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
    <Column
      v-for="col in columns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
    ></Column>
  </DataTable>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Toolbar from '@/components/course/Toolbar.vue'

const selectedCourses = ref([])

defineProps({
  courses: {
    type: Array,
    default: () => {
      return []
    },
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const columns = ref([
  { field: 'name', header: 'Name' },
  { field: 'startDate', header: 'Start Date' },
  { field: 'endDate', header: 'End Date' },
  { field: 'teachingDays', header: 'Teaching Days' },
  { field: 'createdAt', header: 'Created At' },
  { field: 'updatedAt', header: 'Updated At' },
])

const rowSelected = (obj) => {

}
</script>
