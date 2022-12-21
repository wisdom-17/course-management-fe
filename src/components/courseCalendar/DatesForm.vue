<template>
  <ErrorMessage
    :message="validation.message"
    v-show="showErrorMessage"
    @close="onClickCloseErrorMessage"
  />
  <form class="newCourse">
    <template v-for="(term, index) in dateRanges" :key="index">
      <!-- we need the v-if="term" check to ensure deleted datepickers are handled as expected-->
      <div v-if="term" class="field">
        <DateRangePicker
          :label="`${type} ${term} Start and End Dates`"
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
            (selectedDateRange) =>
              (selectedDateRanges[index] = selectedDateRange)
          "
          @cleared-date-range="() => (selectedDateRanges[index] = [])"
          :hasDeleteButton="showDeleteDatePickerButton"
          @clicked-delete-date-picker-button="onClickDeleteDatePicker(index)"
          :minDate="minAndMaxDates.minDate"
          :maxDate="minAndMaxDates.maxDate"
        />
      </div>
    </template>
    <div class="field">
      <Button
        class="p-button-sm"
        :label="`Additional ${type} Dates`"
        icon="pi pi-plus"
        @click="onClickAdditionalDateRangesButton"
      />
    </div>
    <MultiStepFormButtons
      @save-button-clicked="onClickSaveButton('courseCalendars')"
      @next-button-clicked="onClickSaveButton('courseStepThree')"
      :hasNextButton="hasNextButton"
      :hasPreviousButton="hasPreviousButton"
      :hasSaveButton="hasSaveButton"
      :isLoading="isLoading"
    />
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import CourseCalendarService from '@/services/CourseCalendar'
import DateRangePicker from '@/components/DateRangePicker.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import MultiStepFormButtons from '@/components/courseCalendar/MultiStepFormButtons.vue'
import { useCourseStore } from '@/stores/course'

const storeCourse = useCourseStore()
const confirm = useConfirm()
const toast = useToast()

const router = useRouter()
const props = defineProps({
  type: { type: String, default: '' },
  hasPreviousButton: { type: Boolean, default: false },
  hasNextButton: { type: Boolean, default: true },
  hasSaveButton: { type: Boolean, default: false },
})

const dateRanges = ref([1]) // show one date range picker field by default
const selectedDateRanges = ref([])
const validation = ref({
  message: '',
  errors: { startDate: [], endDate: [] },
})
const successMessage = ref([])

const isLoading = ref(false)

// formattedSelectedDates is used to disable selected
// dates in daterange pickers for other terms (i.e. cannot
// select date already selected in another date range picker on the page)
const formattedSelectedDates = computed(() => {
  return selectedDateRanges.value.map((dates) => {
    if (dates.length === 2) {
      const startDate = new Date(dates[0].replace(/-/g, '/'))
      const endDate = new Date(dates[1].replace(/-/g, '/'))
      return getDatesInRange(startDate, endDate)
    }
    return []
  })
})

const minAndMaxDates = computed(() => {
  return {
    minDate: new Date(storeCourse.multiStepForm.startDate.replace(/-/g, '/')),
    maxDate: new Date(storeCourse.multiStepForm.endDate.replace(/-/g, '/')),
  }
})

// Don't show delete button if there is only one datepicker
const showDeleteDatePickerButton = computed(() => {
  return dateRanges.value.filter((x) => x).length > 1 ? true : false
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

const onClickAdditionalDateRangesButton = () => {
  dateRanges.value.push(dateRanges.value.length + 1)
}

const showToast = (message) => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: message,
    life: 2000,
  })
}

const onClickSaveButton = async (redirectRouteName) => {
  const payload = {
    // only send date ranges with selected values
    // deleted date range fields are an empty array
    // so filter them out
    dates: selectedDateRanges.value.filter(
      (dateRange) => dateRange.length === 2
    ),
    dateType: props.type,
  }
  // clear validation errors
  validation.value.message = ''
  validation.value.errors = {
    startDate: [],
    endDate: [],
  }

  const { id } = storeCourse.multiStepForm
  try {
    isLoading.value = true
    const apiResult = await CourseCalendarService.newDates(payload, id)
    if (apiResult.status === 201) {
      isLoading.value = false
      successMessage.value = [...apiResult.data]
      showToast(`Course ${props.type} dates saved successfully!`)
      // redirect to route (depending on which button was clicked) after 2.5 seconds
      setTimeout(() => {
        router.push({ name: redirectRouteName })
      }, 2500)
    }
  } catch (error) {
    validation.value.message = error.response.data.message
    // update validation error msgs with error msgs
    // returned from API call
    validation.value.errors = {
      ...validation.value.errors,
      ...error.response.data.errors,
    }
    isLoading.value = false
  }
}

const showErrorMessage = computed(() => {
  return validation.value.message !== ''
})

const onClickCloseErrorMessage = () => {
  validation.value.message = ''
}

const onClickDeleteDatePicker = (rangeIndex) => {
  confirm.require({
    message:
      'Are you sure you want to delete this date range picker? Any unsaved changes will be lost.',
    header: 'Delete Date',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      // delete removes the element from the array and preserves the index
      // we need to preserve the index to ensure selected dates are handled correctly
      // howevever, the deleted element index position will still return 'empty'
      // so this needs to be handled
      delete dateRanges.value[rangeIndex]
      selectedDateRanges.value[rangeIndex] = []
    },
  })
}
</script>
