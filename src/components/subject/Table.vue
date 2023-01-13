<template>
  <DataTable
    :value="storeSubject.list.data"
    :loading="storeSubject.list.loading"
    class="mt-4"
  >
    <Column field="name" header="Name"></Column>
    <Column field="teachers" header="Teachers">
      <template #body="slotProps">
        <li
          v-for="(teacher, index) in slotProps.data.teachers"
          :key="teacher.id"
        >
          {{ teacher.name }}<span v-if="index !== slotProps.data.teachers.length - 1">, </span>
        </li>
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
    <Column style="min-width: 5rem">
      <template #body="slotProps">
        <Button
          icon="pi pi-pencil"
          class="p-button-rounded p-button-primary mr-2"
          @click="onClickEditButton(slotProps.data)"
        />
        <Button
          icon="pi pi-trash"
          class="p-button-rounded p-button-danger"
          @click="onClickDeleteButton(slotProps.data)"
          :loading="storeSubject.loading"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useDialog } from 'primevue/usedialog'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import Column from 'primevue/column'
import TeacherForm from '@/components/teacher/TeacherForm.vue'
import { useSubjectStore } from '@/stores/subject'
import { useTeacherStore } from '@/stores/teacher'

const storeSubject = useSubjectStore()
const storeTeacher = useTeacherStore()
const confirm = useConfirm()
const dialog = useDialog()

const dateValueColumns = ref([
  { field: 'createdAt', header: 'Created At' },
  { field: 'updatedAt', header: 'Updated At' },
])

const showEditTeacherDialog = () => {
  dialog.open(TeacherForm, {
    props: {
      style: { width: '60vw' },
      header: 'Edit Teacher',
    },
    onClose: () => {
      storeTeacher.editForm = {
        id: null,
        name: '',
        hourlyRate: 0,
      }
    },
  })
}

const onClickDeleteButton = async (rowData) => {
  confirm.require({
    message: 'Are you sure you want to delete the teacher?',
    header: 'Delete',
    icon: 'pi pi-trash',
    acceptClass: 'p-button-danger',
    accept: () => {
      storeTeacher.delete([rowData.id])
    },
  })
}

const onClickEditButton = async (rowData) => {
  const { id, name, hourlyRate } = rowData
  storeTeacher.editForm = {
    id,
    name,
    hourlyRate: parseFloat(hourlyRate),
  }
  showEditTeacherDialog()
}

const formatDate = (dateObj) => {
  return `${dateObj.getDate()}/${
    dateObj.getMonth() + 1
  }/${dateObj.getFullYear()}`
}

onMounted(() => {
  // check to prevent hammering the API unnecessarily
  if (storeSubject.list.data.length === 0) {
    storeSubject.getSubjects()
  }
})
</script>
