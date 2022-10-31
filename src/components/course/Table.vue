<template>
  <DataTable :value="courses">
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

defineProps({
  courses: Array,
})

const columns = ref([
  { field: 'name', header: 'Name' },
  { field: 'startDate', header: 'Start Date' },
  { field: 'endDate', header: 'End Date' },
  { field: 'teachingDays', header: 'Teaching Days' },
  { field: 'createdAt', header: 'Created At' },
  { field: 'updatedAt', header: 'Updated At' },
])
</script>
