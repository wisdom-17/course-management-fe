<template>
  <ErrorMessage
    :message="validation.message"
    v-show="showErrorMessage"
    @close="onClickCloseErrorMessage"
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
        <small class="p-error">{{ validation.errors.teachingDays[0] }}</small>
      </div>
    </div>

    <MultiStepFormButtons
      :hasNextButton="true"
      :hasSaveButton="false"
      @save-button-clicked="onClickSaveButton('courses')"
      @next-button-clicked="onClickSaveButton('courseStepTwo')"
      :isLoading="storeCourse.loading"
    />
  </form>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'
import DateRangePicker from '@/components/DateRangePicker.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import MultiStepFormButtons from '@/components/course/MultiStepFormButtons.vue'
import { useCourseStore } from '@/stores/course'

const storeCourse = useCourseStore()
const { course, validation } = storeCourse.courseDetailsForm

const emit = defineEmits(['saveSuccess'])
const router = useRouter()

const showErrorMessage = computed(() => {
  return validation.message !== ''
})

const onClickCloseErrorMessage = () => {
  validation.message = ''
}

/* This handler is for save and next buttons as 
both buttons will call API to save the course. The difference
being where to redirect to after a successful save */
const onClickSaveButton = async (redirectRouteName) => {
  storeCourse
    .saveNewCourse()
    .then(() => {
      // emit saveSuccess event to show success toast from parent component
      emit('saveSuccess', 'Course details saved successfully!')

      // reset course object data in store
      storeCourse.courseDetailsForm.course = {
        dateRange: [],
        name: '',
        teachingDays: [],
      }
      // redirect to route (depending on which button was clicked) after 2 seconds
      setTimeout(() => {
        router.push({ name: redirectRouteName })
      }, 2000)
    })
    .catch(() => {
      console.log('error in new course form')
    })
}
</script>
