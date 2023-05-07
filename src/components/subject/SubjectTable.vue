<template>
  <DataTable
    :value="storeSubject.list.data"
    :loading="storeSubject.list.loading"
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
    <Column style="min-width: 5rem"> </Column>
  </DataTable>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useSubjectStore } from '@/stores/subject'
import { formatDate } from '@/utils/dateTimeFormatters'

const storeSubject = useSubjectStore()

const dateValueColumns = ref([
  { field: 'createdAt', header: 'Created At' },
  { field: 'updatedAt', header: 'Updated At' },
])

onMounted(() => {
  // check to prevent hammering the API unnecessarily
  if (storeSubject.list.data.length === 0) {
    storeSubject.getSubjects()
  }
})
</script>
