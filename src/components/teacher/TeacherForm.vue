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
        type="text"
        v-model="teacher.name"
      />
    </div>
    <div class="field">
      <label for="hourlyRate">Hourly Rate</label>
      <InputNumber
        id="hourlyRate"
        class="mr-1 w-6"
        v-model="teacher.hourlyRate"
        mode="currency"
        currency="GBP"
        locale="en-GB"
      />
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
import { useTeacherStore } from '@/stores/teacher'
import ErrorMessage from '@/components/ErrorMessage.vue'

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

const onClickCloseErrorMessage = () => {
  validation.value.message = ''
}

const onClickSaveButton = async () => {
  console.log('clicked saved button')

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
    })
    .catch((error) => {
      console.log(error)
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
