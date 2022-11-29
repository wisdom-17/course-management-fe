<template>
  <ErrorMessage
    :message="validation.message"
    v-show="showErrorMessage"
    @close="onClickCloseErrorMessage"
  />
  <form class="teacher">
    <div class="field">
      <label for="teacherName">Name</label>
      <InputText
        id="teacherName"
        class="mr-1 w-6"
        :class="{ 'p-invalid': validation.errors.name.length > 0 }"
        type="text"
        v-model="teacher.name"
      />
      <small class="p-error">{{ validation.errors.name[0] }}</small>
    </div>
    <div class="field">
      <label for="hourlyRate">Hourly Rate</label>
      <InputNumber
        id="hourlyRate"
        class="mr-1 w-6"
        :class="{ 'p-invalid': validation.errors.hourlyRate.length > 0 }"
        v-model="teacher.hourlyRate"
        mode="currency"
        currency="GBP"
        locale="en-GB"
      />
      <small class="p-error">{{ validation.errors.hourlyRate[0] }}</small>
    </div>

    <Button
      icon="pi pi-save"
      label="Save"
      @click="onClickSaveButton"
      :loading="storeTeacher.newForm.loading"
    />
  </form>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { useTeacherStore } from '@/stores/teacher'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const storeTeacher = useTeacherStore()

const dialogRef = inject('dialogRef')

const teacher = ref({
  name: '',
  hourlyRate: 0,
})

const validation = ref({
  message: '',
  errors: { name: [], hourlyRate: [] },
})

const showErrorMessage = computed(() => {
  return validation.value.message !== ''
})

const showToast = (message) => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: message,
    life: 2000,
  })
}

const onClickCloseErrorMessage = () => {
  validation.value.message = ''
}

const onClickSaveButton = async () => {
  const payload = teacher.value

  // clear validation errors
  validation.value.message = ''
  validation.value.errors = {
    name: [],
    hourlyRate: [],
  }

  storeTeacher
    .saveNew(payload)
    .then(() => {
      dialogRef.value.close()
      showToast('Successfully saved new teacher')
    })
    .catch((error) => {
      storeTeacher.newForm.loading = false
      validation.value.message = error.response.data.message
      // update validation error msgs with error msgs
      // returned from API call
      validation.value.errors = {
        ...validation.value.errors,
        ...error.response.data.errors,
      }
    })
}
</script>
