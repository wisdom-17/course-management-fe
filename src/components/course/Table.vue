<template>
  <Toolbar :selectedCoursesIds="selectedCoursesIds" />
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
  </DataTable>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Toolbar from '@/components/course/Toolbar.vue'
import { useCourseStore } from '@/stores/course'

const storeCourse = useCourseStore()

const selectedCourses = ref([])

const selectedCoursesIds = computed(() => {
  return selectedCourses.value.map((obj) => {
    return obj.id
  })
})

const columns = ref([
  { field: 'name', header: 'Name' },
  { field: 'startDate', header: 'Start Date' },
  { field: 'endDate', header: 'End Date' },
  { field: 'teachingDays', header: 'Teaching Days' },
  { field: 'createdAt', header: 'Created At' },
  { field: 'updatedAt', header: 'Updated At' },
])

onMounted(() => {
  // check to prevent hammering the API unnecessarily
  if (storeCourse.list.length === 0) {
    storeCourse.getCourses()
  }
})
</script>
