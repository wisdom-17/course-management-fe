<template>
  <Card class="mt-4 surface-ground w-auto">
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

        <MultiStepFormButtons
          @save-button-clicked="onClickSubmitButton"
          @previous-button-clicked="onClickPreviousButton"
          :hasPreviousButton="true"
        />
      </form>
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
import CourseService from '@/services/Course'
import DateRangePicker from '@/components/DateRangePicker.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import MultiStepFormButtons from '@/components/course/MultiStepFormButtons.vue'
import SuccessMessage from '@/components/SuccessMessage.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

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

const onClickPreviousButton = async () => {
  router.push({ name: 'courseStepTwo' })
}

const onClickCloseErrorMessage = () => {
  validation.value.message = ''
}

const onClickCloseSuccessMessage = () => {
  successMessage.value = []
}
</script>
