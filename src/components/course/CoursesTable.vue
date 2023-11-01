<template>
  <CoursesToolbar
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
    <Column header="Semester">
      <template #body="slotProps">
        <ul>
          <li v-for="semester in slotProps.data.semesters" :key="semester.id">
            {{ semester.name }}
            <ul v-if="semester.courseDates.length > 0">
              <li
                v-for="courseDate in semester.courseDates"
                :key="courseDate.id"
                class="mb-3"
              >
                {{ courseDate.name }}
                <br />
                {{
                  `${formatDate(new Date(courseDate.startDate))} - ${formatDate(
                    new Date(courseDate.endDate)
                  )}`
                }}
              </li>
            </ul>
            <p v-else><i>No dates in semester</i></p>
          </li>
        </ul>
        <ul>
          <li
            v-for="courseDate in slotProps.data.dates"
            :key="courseDate.id"
            class="mb-3"
          >
            {{ courseDate.name }}
            <br />
            {{
              `${formatDate(new Date(courseDate.startDate))} - ${formatDate(
                new Date(courseDate.endDate)
              )}`
            }}
          </li>
        </ul>
      </template>
    </Column>
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
    <Column header="Actions">
      <template #body="slotProps">
        <Button
          icon="pi pi-eye"
          class="p-button-rounded p-button-primary mr-2"
          @click="
            () =>
              router.push({
                name: 'viewCourseTimetable',
                params: { id: slotProps.data.id },
              })
          "
          aria-label="View Course Timetable"
          title="View Course Timetable"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import Column from 'primevue/column'
import { useRouter } from 'vue-router'
import CoursesToolbar from '@/components/course/CoursesToolbar.vue'
import { useCourseStore } from '@/stores/course'
import { formatDate } from '@/utils/dateTimeFormatters'

const router = useRouter()

const storeCourse = useCourseStore()

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
  if (storeCourse.list.data.length === 0) {
    storeCourse.getCourses()
  }
})
</script>
