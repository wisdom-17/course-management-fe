<template>
  <ErrorMessage
    :message="validation.message"
    v-show="showErrorMessage"
    @close="onClickCloseErrorMessage"
  />
  <form class="teacher">
    <div class="field">
      <label for="teacher">Teacher</label>
      <TeacherDropdown id="teacher" class="mr-1 w-6" />
      <small class="p-error">{{ validation.errors.teacher[0] }}</small>
    </div>

    <div class="field">
      <label for="dates">Course Dates</label>
      <CourseDatesDropdown id="dates" class="mr-1 w-6" />
      <small class="p-error">{{ validation.errors.courseDate[0] }}</small>
    </div>

    <h4>Teaching Days</h4>
    <div class="formgrid grid">
      <div class="col-2">
        <div class="field-checkbox">
          <Checkbox
            inputId="monday"
            value="monday"
            v-model="module.teachingDays"
          />
          <label for="monday">Monday</label>
        </div>
        <div class="field-checkbox">
          <Checkbox
            inputId="tuesday"
            value="tuesday"
            v-model="module.teachingDays"
          />
          <label for="tuesday">Tuesday</label>
        </div>
        <div class="field-checkbox">
          <Checkbox
            inputId="wednesday"
            value="wednesday"
            v-model="module.teachingDays"
          />
          <label for="wednesday">Wednesday</label>
        </div>
        <div class="field-checkbox">
          <Checkbox
            inputId="thursday"
            value="thursday"
            v-model="module.teachingDays"
          />
          <label for="thursday">Thursday</label>
        </div>
      </div>
      <div class="col-2">
        <div class="field-checkbox">
          <Checkbox
            inputId="friday"
            value="friday"
            v-model="module.teachingDays"
          />
          <label for="friday">Friday</label>
        </div>
        <div class="field-checkbox">
          <Checkbox
            inputId="saturday"
            value="saturday"
            v-model="module.teachingDays"
          />
          <label for="saturday">Saturday</label>
        </div>
        <div class="field-checkbox">
          <Checkbox
            inputId="sunday"
            value="sunday"
            v-model="module.teachingDays"
          />
          <label for="sunday">Sunday</label>
        </div>
      </div>
      <div class="col-4">
        <small class="p-error">{{ validation.errors.teachingDays[0] }}</small>
      </div>
    </div>

    <Button
      v-if="operationType === 'new'"
      icon="pi pi-save"
      label="Save"
      @click="onClickSaveButton"
      :loading="storeTeacher.newForm.loading"
    />

    <Button
      v-else-if="operationType === 'edit'"
      icon="pi pi-save"
      label="Update"
      @click="onClickUpdateButton"
      :loading="storeTeacher.editForm.loading"
    />
  </form>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import ErrorMessage from '@/components/ErrorMessage.vue'
import TeacherDropdown from '@/components/TeacherDropdown.vue'
import CourseDatesDropdown from '@/components/CourseDatesDropdown.vue'
import { useTeacherStore } from '@/stores/teacher'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const storeTeacher = useTeacherStore()

const dialogRef = inject('dialogRef')

const operationType = computed(() => {
  return storeTeacher.editForm.id ? 'edit' : 'new'
})

const module = ref({
  teachingDays: '',
})

const validation = ref({
  message: '',
  errors: { teacher: [], courseDate: [], teachingDays: [] },
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
  const payload = module.value

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

const onClickUpdateButton = async () => {
  const payload = {
    id: storeTeacher.editForm.id,
    name: module.value.name,
    hourlyRate: module.value.hourlyRate,
  }

  // update teacher
  storeTeacher
    .update(payload)
    .then(() => {
      dialogRef.value.close()
      setTimeout(() => {
        showToast('Teacher updated successfully!')
      }, 500)
    })
    .catch((error) => {
      // console.log(error)
      storeTeacher.editForm.loading = false
      console.log('error in edit teacher form')
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
