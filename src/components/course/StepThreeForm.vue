<template>
  <ConfirmDialog></ConfirmDialog>
  <Card class="mt-4 surface-ground w-auto">
    <template #title>STEP THREE FORM</template>
    <template #content>
      <ErrorMessage
        :message="validation.message"
        v-show="showErrorMessage"
        @close="onClickCloseErrorMessage"
      />
      <SuccessMessage
        :message="successMessage"
        v-show="showSuccessMessage"
        @close="onClickCloseSuccessMessage"
      />
      <form class="newCourse">
        <div class="field">
          <DateRangePicker
            :validationErrorMessages="[
              ...validation.errors.startDate,
              ...validation.errors.endDate,
            ]"
            @selected-date-range="
              (selectedDateRange) => (course.dateRange = selectedDateRange)
            "
          />
        </div>

        <div class="flex justify-content-between">
          <div class="flex">
            <Button
              class="mr-2"
              icon="pi pi-angle-double-left"
              label="Previous Step"
            />
            <Button
              class="mr-2"
              icon="pi pi-save"
              label="Save"
              @click="onClickSubmitButton()"
            />
          </div>
          <div class="flex align-self-end">
            <Button
              class="p-button-danger"
              icon="pi pi-trash"
              label="Cancel"
              @click="onClickCancelButton"
            />
          </div>
        </div>
      </form>
    </template>
  </Card>
</template>

<script setup>
import Button from 'primevue/button'
import Card from 'primevue/card'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import CourseService from '@/services/Course'
import DateRangePicker from '@/components/DateRangePicker.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import SuccessMessage from '@/components/SuccessMessage.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const confirm = useConfirm()
const router = useRouter()

const course = ref({ name: '', dateRange: [], teachingDays: [] })
const validation = ref({
  message: '',
  errors: { name: [], startDate: [], endDate: [], teachingDays: [] },
})

const successMessage = ref([])

const showErrorMessage = computed(() => {
  return validation.value.message !== ''
})

const showSuccessMessage = computed(() => {
  return successMessage.value.length !== 0
})

const onClickSubmitButton = async () => {
  const payload = {
    name: course.value.name,
    startDate: course.value.dateRange[0],
    endDate: course.value.dateRange[1],
    teachingDays: course.value.teachingDays,
  }

  // clear validation errors
  validation.value.message = ''
  validation.value.errors = {
    name: [],
    startDate: [],
    endDate: [],
    teachingDays: [],
  }

  try {
    const apiResult = await CourseService.new(payload)
    if (apiResult.status === 201) {
      successMessage.value = [...apiResult.data]

      // redirect to courses page after 3 seconds
      setTimeout(() => {
        router.push({ name: 'courses' })
      }, 2000)
    }
  } catch (error) {
    validation.value.message = error.response.data.message
    // update validation error msgs with error msgs
    // returned from API call
    validation.value.errors = {
      ...validation.value.errors,
      ...error.response.data.errors,
    }
  }
}

const onClickCancelButton = () => {
  confirm.require({
    message:
      'Are you sure you want to cancel? Clicking "Yes" will take you to the Courses list page and any unsaved changes will be lost.',
    header: 'Cancel',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      router.push({ name: 'courses' })
    },
  })
}

const onClickCloseErrorMessage = () => {
  validation.value.message = ''
}

const onClickCloseSuccessMessage = () => {
  successMessage.value = []
}
</script>
