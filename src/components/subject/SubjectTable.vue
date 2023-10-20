<template>
  <DataTable
    :value="subjectStore.list.data"
    :loading="subjectStore.list.loading"
    class="mt-4"
  >
    <Column field="name" header="Name"></Column>
    <Column field="teachers" header="Teachers">
      <template #body="slotProps">
        <ul>
          <li
            v-for="(teacher, index) in slotProps.data.teachers"
            :key="teacher.id"
          >
            {{ teacher.name
            }}<span v-if="index !== slotProps.data.teachers.length - 1"
              >,
            </span>
          </li>
        </ul>
      </template>
    </Column>
    <Column field="dayAndTime" header="Days and Times">
      <template #body="slotProps">
        <ul v-for="(dayAndTime, day) in slotProps.data.daysAndTimes" :key="day">
          <li>{{ day }}</li>
          <ul>
            <li v-for="time in dayAndTime" :key="time.id">
              {{ time.startTime }} - {{ time.endTime }}
            </li>
          </ul>
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
        <router-link
          :to="{
            name: 'viewSubjectTimetable',
            params: { id: slotProps.data.id },
          }"
        >
          <i class="pi pi-eye"></i>
        </router-link>
      </template>
    </Column>
  </DataTable>
  <TablePaginator
    :totalRecords="subjectStore.list.total"
    :rowsPerPage="15"
    @page-changed="(page) => onPageChange(page)"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import TablePaginator from '@/components/TablePaginator.vue'
import { useSubjectStore } from '@/stores/subject'
import { formatDate } from '@/utils/dateTimeFormatters'

const subjectStore = useSubjectStore()

const dateValueColumns = ref([
  { field: 'createdAt', header: 'Created At' },
  { field: 'updatedAt', header: 'Updated At' },
])

const onPageChange = (page) => {
  subjectStore.getSubjects(page)
}

onMounted(() => {
  // check to prevent hammering the API unnecessarily
  if (subjectStore.list.data.length === 0) {
    subjectStore.getSubjects()
  }
})
</script>
