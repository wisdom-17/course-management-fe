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
        <template v-for="(term, index) in terms" :key="index">
          <div class="field">
            <DateRangePicker
              :label="`Term ${term} Start and End Dates`"
              :disabledDates="
                formattedSelectedDates
                  .filter((obj, rangeIndex) => index !== rangeIndex)
                  .flat()
              "
              :validationErrorMessages="[
                ...validation.errors.startDate,
                ...validation.errors.endDate,
              ]"
              @selected-date-range="
                (selectedDateRange) => (termDates[index] = selectedDateRange)
              "
              @cleared-date-range="() => (termDates[index] = [])"
            />
          </div>
        </template>
        <div class="field">
          <Button
            class="p-button-sm"
            label="Additional Terms"
            icon="pi pi-plus"
            @click="onClickAdditionalTermsButton"
          />
        </div>

        <MultiStepFormButtons
          @save-button-clicked="onClickSubmitButton"
          @next-button-clicked="onClickNextButton"
          @previous-button-clicked="onClickPreviousButton"
          :hasNextButton="true"
        />
      </form>
    </template>
  </Card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Card from 'primevue/card'
import CourseService from '@/services/Course'
import DateRangePicker from '@/components/DateRangePicker.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import MultiStepFormButtons from '@/components/course/MultiStepFormButtons.vue'
import SuccessMessage from '@/components/SuccessMessage.vue'

const router = useRouter()

const termDates = ref([])
const terms = ref([1])
const validation = ref({
  message: '',
  errors: { name: [], startDate: [], endDate: [], teachingDays: [] },
})
const successMessage = ref([])

// formattedSelectedDates is used to disable selected
// dates in daterange pickers for other terms (i.e. cannot
// select date already selected in another term)
const formattedSelectedDates = computed(() => {
  return termDates.value.map((dates) => {
    if (dates.length === 2) {
      const startDate = new Date(dates[0].replace(/-/g, '/'))
      const endDate = new Date(dates[1].replace(/-/g, '/'))
      return getDatesInRange(startDate, endDate)
    }
    return []
  })
})

// helper/utility method to get all dates within a range
const getDatesInRange = (startDate, endDate) => {
  const date = new Date(startDate.getTime())
  const dates = []

  while (date <= endDate) {
    dates.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }

  return dates
}

const showErrorMessage = computed(() => {
  return validation.value.message !== ''
})
const showSuccessMessage = computed(() => {
  return successMessage.value.length !== 0
})

const onClickSubmitButton = async () => {
  const payload = {
    terms: termDates.value,
  }
  console.log(payload)

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

      // redirect to courses page after 2 seconds
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

const onClickNextButton = async () => {
  router.push({ name: 'courseStepThree' })
}

const onClickAdditionalTermsButton = () => {
  const termNumber = terms.value.length + 1
  terms.value.push(termNumber)
}

const onClickPreviousButton = async () => {
  router.push({ name: 'courseStepOne' })
}

const onClickCloseErrorMessage = () => {
  validation.value.message = ''
}

const onClickCloseSuccessMessage = () => {
  successMessage.value = []
}
</script>
