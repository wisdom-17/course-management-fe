<template>
  <Card class="mt-4 surface-ground w-auto">
    <template #title>New Course</template>
    <template #content>
      <ErrorMessage
        :message="validation.message"
        v-show="showErrorMessage"
        @close="onClickClose"
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
          <label for="startDate">Start and End Dates</label>
          <Calendar
            id="dateRange"
            :class="{ 'p-invalid': dateRangeValidationMessages.length > 0 }"
            class="mr-1 w-4"
            v-model="course.dateRange"
            selectionMode="range"
            dateFormat="dd/mm/yy"
            :showButtonBar="true"
            :showIcon="true"
          />
          <template
            v-for="errorMessage in dateRangeValidationMessages"
            :key="errorMessage"
          >
            <small class="p-error">
              {{ errorMessage }}
            </small>
            {{ ' ' }}
          </template>
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

        <div class="flex justify-content-between">
          <div class="flex">
            <Button
              class="mr-2"
              icon="pi pi-save"
              label="Save"
              @click="handleOnClickSubmitButton()"
            />
            <Button
              class="mr-2"
              icon="pi pi-angle-double-right"
              label="Next Step"
            />
          </div>
          <div class="flex align-self-end">
            <Button class="p-button-danger" icon="pi pi-trash" label="Cancel" />
          </div>
        </div>
      </form>
    </template>
  </Card>
</template>

<script setup>
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Checkbox from 'primevue/checkbox'
import Card from 'primevue/card'
import CourseService from '@/services/Course'
import InputText from 'primevue/inputtext'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { computed, ref } from 'vue'

const course = ref({ name: '', dateRange: [], teachingDays: [] })

const validation = ref({
  message: '',
  errors: { name: [], startDate: [], endDate: [], teachingDays: [] },
})
const showErrorMessage = ref(false)

const startDate = computed(() => {
  const date = course.value.dateRange[0]
  // let string = JSON.stringify(date)
  // console.log(string)

  // After: JSON.stringify keeps date as-is!
  Date.prototype.toJSON = function () {
    const hoursDiff = this.getHours() - this.getTimezoneOffset() / 60
    this.setHours(hoursDiff)
    return this.toISOString()
  }
  // string = JSON.stringify(date)
  // console.log(string)
  // console.log(date)

  return date
})

const endDate = computed(() => {
  const date = course.value.dateRange[1]
  // let string = JSON.stringify(date)
  // console.log(string)

  // After: JSON.stringify keeps date as-is!
  Date.prototype.toJSON = function () {
    const hoursDiff = this.getHours() - this.getTimezoneOffset() / 60
    this.setHours(hoursDiff)
    return this.toISOString()
  }
  // string = JSON.stringify(date)
  // console.log(string)
  // console.log(date)

  return date
})

const dateRangeValidationMessages = computed(() => {
  return [
    ...validation.value.errors.startDate,
    ...validation.value.errors.endDate,
  ]
})

const handleOnClickSubmitButton = async () => {
  const payload = {
    name: course.value.name,
    startDate: startDate.value,
    endDate: endDate.value,
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
    console.log(apiResult)
  } catch (error) {
    validation.value.message = error.response.data.message
    // update validation error messages with ones
    // returned from API call
    validation.value.errors = {
      ...validation.value.errors,
      ...error.response.data.errors,
    }
    showErrorMessage.value = true
  }
}

const onClickClose = () => {
  validation.value.message = ''
  showErrorMessage.value = false
}
</script>
<style scoped>
.newCourse,
.field label {
  display: block;
}
</style>
