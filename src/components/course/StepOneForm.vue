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
          <label for="courseName">Course Name</label>
          <InputText
            id="courseName"
            :class="{ 'p-invalid': validation.errors.name.length > 0 }"
            class="mr-1 w-6"
            type="text"
            v-model="course.name"
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
              (selectedDateRange) => (course.dateRange = selectedDateRange)
            "
          />
        </div>
        <h4>Teaching Days</h4>
        <div class="formgrid grid">
          <div class="col-2">
            <div class="field-checkbox">
              <Checkbox
                inputId="monday"
                value="monday"
                v-model="course.teachingDays"
              />
              <label for="monday">Monday</label>
            </div>
            <div class="field-checkbox">
              <Checkbox
                inputId="tuesday"
                value="tuesday"
                v-model="course.teachingDays"
              />
              <label for="tuesday">Tuesday</label>
            </div>
            <div class="field-checkbox">
              <Checkbox
                inputId="wednesday"
                value="wednesday"
                v-model="course.teachingDays"
              />
              <label for="wednesday">Wednesday</label>
            </div>
            <div class="field-checkbox">
              <Checkbox
                inputId="thursday"
                value="thursday"
                v-model="course.teachingDays"
              />
              <label for="thursday">Thursday</label>
            </div>
          </div>
          <div class="col-2">
            <div class="field-checkbox">
              <Checkbox
                inputId="friday"
                value="friday"
                v-model="course.teachingDays"
              />
              <label for="friday">Friday</label>
            </div>
            <div class="field-checkbox">
              <Checkbox
                inputId="saturday"
                value="saturday"
                v-model="course.teachingDays"
              />
              <label for="saturday">Saturday</label>
            </div>
            <div class="field-checkbox">
              <Checkbox
                inputId="sunday"
                value="sunday"
                v-model="course.teachingDays"
              />
              <label for="sunday">Sunday</label>
            </div>
          </div>
          <div class="col-4">
            <small class="p-error">{{
              validation.errors.teachingDays[0]
            }}</small>
          </div>
        </div>

        <MultiStepFormButtons
          :hasNextButton="true"
          @save-button-clicked="onClickSaveButton('courses')"
          @next-button-clicked="onClickSaveButton('courseStepTwo')"
        />
      </form>
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'
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

// const onClickNextButton = async () => {
//   const saveCourseStatus = await saveCourseDetails()

//   // only redirect if API call was successful
//   if (saveCourseStatus === true) {
//     // redirect to courses page after 1.5 seconds
//     setTimeout(() => {
//       router.push({ name: 'courseStepTwo' })
//     }, 1500)
//   }
// }

const onClickCloseErrorMessage = () => {
  validation.value.message = ''
}

const onClickCloseSuccessMessage = async () => {
  successMessage.value = []
}

/* This handler is for save and next buttons as 
both buttons will call API to save the course. The difference
being where to redirect to after a successful save */
const onClickSaveButton = async (redirectRouteName) => {
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

      // redirect to route (depending on which button was clicked) after 1.5 seconds
      setTimeout(() => {
        router.push({ name: redirectRouteName })
      }, 1500)
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
</script>
