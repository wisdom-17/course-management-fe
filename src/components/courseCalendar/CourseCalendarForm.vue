<template>
  <ErrorMessage
    :message="validation.message"
    v-show="showErrorMessage"
    @close="onClickCloseErrorMessage"
  />
  <pre>{{ courseCalendar }}</pre>
  <form class="newCourseCalendar">
    <div class="field">
      <label for="courseCalendarName">Course Calendar Name</label>
      <InputText
        id="courseCalendarName"
        :class="{ 'p-invalid': validation.errors.name.length > 0 }"
        class="mr-1 w-6"
        type="text"
        v-model="courseCalendar.name"
      />
      <small class="p-error">{{ validation.errors.name[0] }}</small>
    </div>
    <div class="field">
      <DateRangePicker
        :validationErrorMessages="[
          ...validation.errors.startDate,
          ...validation.errors.endDate,
        ]"
        @selected-date-range="
          (selectedDateRange) => (courseCalendar.dateRange = selectedDateRange)
        "
        :existingDateRange="courseCalendar.dateRange"
      />
    </div>

    <MultiStepFormButtons
      v-if="operationType === 'new'"
      :hasNextButton="true"
      :hasSaveButton="false"
      @save-button-clicked="onClickSaveButton('newCourseCalendar')"
      @next-button-clicked="onClickSaveButton('courseCalendarStepTwo')"
      :isLoading="storeCourseCalendar.multiStepForm.loading"
    />

    <Button
      v-else-if="operationType === 'edit'"
      icon="pi pi-save"
      label="Update"
      @click="onClickUpdateButton"
      :loading="storeCourseCalendar.editForm.loading"
    />
  </form>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useToast } from 'primevue/usetoast'
import DateRangePicker from '@/components/DateRangePicker.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import MultiStepFormButtons from '@/components/courseCalendar/MultiStepFormButtons.vue'
import { useCourseCalendarStore } from '@/stores/courseCalendar'

const storeCourseCalendar = useCourseCalendarStore()

const router = useRouter()
const toast = useToast()

const operationType = computed(() => {
  return storeCourseCalendar.editForm.id ? 'edit' : 'new'
})

// inject dialog if editing course
const dialogRef = operationType.value === 'edit' ? inject('dialogRef') : null

const course = ref({
  name: storeCourseCalendar.editForm.name || '',
  dateRange: [...storeCourseCalendar.editForm.dateRange],
})

const courseCalendar =
  storeCourseCalendar.multiStepForm.formData.courseCalendarDetails

const validation = ref({
  message: '',
  errors: { name: [], startDate: [], endDate: [] },
})

const showErrorMessage = computed(() => {
  return validation.value.message !== ''
})

const onClickCloseErrorMessage = () => {
  validation.value.message = ''
}

const showToast = (message) => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: message,
    life: 2000,
  })
}

/* This handler is for save and next buttons as 
both buttons will call API to save the course. The difference
being where to redirect to after a successful save */
const onClickSaveButton = async (redirectRouteName) => {
  const payload = {
    name: course.value.name,
    startDate: course.value.dateRange[0],
    endDate: course.value.dateRange[1]
  }

  // clear validation errors
  validation.value.message = ''
  validation.value.errors = {
    name: [],
    startDate: [],
    endDate: [],
  }

  storeCourseCalendar
    .saveNewCourse(payload)
    .then(() => {
      showToast('Course Calendar saved successfully')
      // redirect to route (depending on which button was clicked) after 2 seconds
      setTimeout(() => {
        router.push({ name: redirectRouteName })
      }, 2000)
    })
    .catch((error) => {
      // console.log(error)
      storeCourseCalendar.multiStepForm.loading = false
      console.log('error in course calendar form')
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
    id: storeCourseCalendar.editForm.id,
    name: course.value.name,
    startDate: new Date(course.value.dateRange[0]).toLocaleDateString('fr-CA'),
    endDate: new Date(course.value.dateRange[1]).toLocaleDateString('fr-CA'),
    teachingDays: course.value.teachingDays,
  }

  // update course
  storeCourseCalendar
    .update(payload)
    .then(() => {
      dialogRef.value.close()
      setTimeout(() => {
        showToast('Course Calendar updated successfully!')
      }, 500)
    })
    .catch((error) => {
      // console.log(error)
      storeCourseCalendar.editForm.loading = false
      console.log('error in edit course calendar form')
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
