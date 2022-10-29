<template>
  <div class="col courses">
    <h1>Courses</h1>
    <Toolbar />
    <DataTable :value="courses" class="mt-4">
      <Column
        v-for="col in columns"
        :field="col.field"
        :header="col.header"
        :key="col.field"
      ></Column>
    </DataTable>
  </div>
</template>

<script setup>
import CourseService from '@/services/Course'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { onMounted, ref } from 'vue'
import Toolbar from '@/components/courses/Toolbar.vue'

const courses = ref([])
const columns = ref([
  { field: 'name', header: 'Name' },
  { field: 'startDate', header: 'Start Date' },
  { field: 'endDate', header: 'End Date' },
  { field: 'teachingDays', header: 'Teaching Days' },
  { field: 'createdAt', header: 'Created At' },
  { field: 'updatedAt', header: 'Updated At' },
])

onMounted(() => {
  console.log('the component is now mounted')
  CourseService.list().then((data) => {

    // const formattedCoursesData = data.data.map(obj => {
    //   { 
    //     name: obj.name,
    //     startDate:
    //   }
    // })
    console.log(data)
    courses.value = data.data
    console.log(courses.value)
  })
})
</script>
