<template>
  <DataTable
    :value="storeTeacher.list.data"
    :loading="storeTeacher.list.loading"
    class="mt-4"
  >
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
    <Column style="min-width: 10rem">
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
          :loading="storeTeacher.loading"
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
import { useTeacherStore } from '@/stores/teacher'

const storeTeacher = useTeacherStore()
const confirm = useConfirm()
const dialog = useDialog()

const stringValueColumns = ref([
  { field: 'name', header: 'Name' },
  { field: 'hourlyRate', header: 'Hourly Rate' },
])

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
    message:
      'Are you sure you want to delete the selected course(s) with their term and holiday dates?',
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
  if (storeTeacher.list.data.length === 0) {
    storeTeacher.getTeachers()
  }
})
</script>