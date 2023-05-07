<template>
  <CourseCalendarsToolbar
    :selectedCourses="selectedCourses"
    @delete-success="selectedCourses = []"
  />
  <DataTable
    :value="storeCourseCalendar.list.data"
    v-model:selection="selectedCourses"
    :loading="storeCourseCalendar.list.loading"
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
    <Column style="min-width: 10rem">{{ Todo }} </Column>
  </DataTable>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import CourseCalendarsToolbar from '@/components/courseCalendar/CourseCalendarsToolbar.vue'
import { useCourseCalendarStore } from '@/stores/courseCalendar'
import { formatDate } from '@/utils/dateTimeFormatters'

const storeCourseCalendar = useCourseCalendarStore()

const selectedCourses = ref([])

const stringValueColumns = ref([{ field: 'name', header: 'Name' }])

const dateValueColumns = ref([
  { field: 'startDate', header: 'Start Date' },
  { field: 'endDate', header: 'End Date' },
  { field: 'createdAt', header: 'Created At' },
  { field: 'updatedAt', header: 'Updated At' },
])

onMounted(() => {
  // check to prevent hammering the API unnecessarily
  if (storeCourseCalendar.list.data.length === 0) {
    storeCourseCalendar.getCourseCalendars()
  }
})
</script>
