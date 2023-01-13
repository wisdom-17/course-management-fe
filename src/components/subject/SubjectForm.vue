<template>
  <ErrorMessage
    :message="validation.message"
    v-show="showErrorMessage"
    @close="onClickCloseErrorMessage"
  />
  <form class="subject">
    <div class="field">
      <label for="subjectName">Subject Name</label>
      <InputText
        id="subjectName"
        class="mr-1 w-6"
        type="text"
        v-model="storeSubject.newForm.name"
      />
      <small class="p-error">{{ validation.errors.name[0] }}</small>
    </div>
    <div class="field">
      <label for="teacher">Teacher(s)</label>
      <TeacherMultiSelect id="teacher" class="mr-1 w-6" />
      <small class="p-error">{{ validation.errors.teacherIds[0] }}</small>
    </div>

    <div class="field">
      <label for="calendars">Course Calendar</label>
      <CourseCalendarsDropdown id="calendars" class="mr-1 w-6" />
      <small class="p-error">{{ validation.errors.courseCalendarId[0] }}</small>
    </div>

    <h4 for="dayTime">Subject Days and Times</h4>
    <template v-for="(dayAndTime, index) in daysAndTimes" :key="index">
      <div v-if="dayAndTime" class="field">
        <DayAndTimePicker
          @clicked-delete-day-and-time-button="onClickDeleteDayTime(index)"
          @selected-day="
            (day) => (storeSubject.newForm.daysAndTimes[index].day = day)
          "
          @selected-start-time="
            (startTime) =>
              (storeSubject.newForm.daysAndTimes[index].startTime = startTime)
          "
          @selected-end-time="
            (endTime) =>
              (storeSubject.newForm.daysAndTimes[index].endTime = endTime)
          "
          :hasDeleteButton="showDeleteDayAndTimeButton"
          :validationErrors="{
            day:
              (validation.errors &&
                validation['errors'][`daysTimes.${index}.day`]) ||
              [],
            endTime:
              (validation.errors &&
                validation['errors'][`daysTimes.${index}.endTime`]) ||
              [],
            startTime:
              validation['errors'][`daysTimes.${index}.startTime`] || [],
          }"
        />
      </div>
      <!-- <pre>{{ validation['errors'] }}</pre> -->
    </template>
    <div class="field">
      <Button
        class="p-button-sm"
        :label="`Additional day and time`"
        icon="pi pi-plus"
        @click="onClickAdditionalDayAndTimesButton"
      />
    </div>
    <div class="mt-3">
      <Button
        v-if="operationType === 'new'"
        icon="pi pi-save"
        label="Save"
        @click="onClickSaveButton"
        :loading="storeSubject.newForm.loading"
      />

      <Button
        v-else-if="operationType === 'edit'"
        icon="pi pi-save"
        label="Update"
        @click="onClickUpdateButton"
        :loading="storeSubject.editForm.loading"
      />
    </div>
  </form>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useConfirm } from 'primevue/useconfirm'
import DayAndTimePicker from '@/components/subject/DayAndTimePicker.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import TeacherMultiSelect from '@/components/TeacherMultiSelect.vue'
import CourseCalendarsDropdown from '@/components/CourseCalendarsDropdown.vue'

import { useSubjectStore } from '@/stores/subject'
import { useTeacherStore } from '@/stores/teacher'
import { useToast } from 'primevue/usetoast'

const confirm = useConfirm()
const toast = useToast()
const storeSubject = useSubjectStore()
const storeTeacher = useTeacherStore()

const dialogRef = inject('dialogRef')

const operationType = computed(() => {
  return storeTeacher.editForm.id ? 'edit' : 'new'
})

const daysAndTimes = ref([1]) // show one day and time selector field by default

const validation = ref({
  message: '',
  errors: {
    name: [],
    teacherIds: [],
    courseCalendarId: [],
  },
})

// Don't show delete button if there is only one datepicker
const showDeleteDayAndTimeButton = computed(() => {
  return daysAndTimes.value.filter((x) => x).length > 1 ? true : false
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
  const formData = storeSubject.newForm
  const selectedTeacherIds = formData.teachers.map((obj) => obj.id)

  const selectedCourseCalendarId = formData.courseCalendar?.id

  const payload = {
    name: formData.name,
    teacherIds: selectedTeacherIds,
    courseCalendarId: selectedCourseCalendarId,
    daysTimes: formData.daysAndTimes,
  }

  // clear validation errors
  validation.value.message = ''
  validation.value.errors = {
    name: [],
    teacherIds: [],
    courseCalendarId: [],
  }

  storeSubject
    .saveNew(payload)
    .then(() => {
      dialogRef.value.close()
      showToast('Successfully saved new subject')
    })
    .catch((error) => {
      storeSubject.newForm.loading = false
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

const onClickAdditionalDayAndTimesButton = () => {
  daysAndTimes.value.push(daysAndTimes.value.length + 1)
  storeSubject.newForm.daysAndTimes.push({
    day: '',
    startTime: null,
    endTime: null,
  })
}

const onClickDeleteDayTime = (index) => {
  confirm.require({
    message:
      'Are you sure you want to delete this day and time selector? Any unsaved changes will be lost.',
    header: 'Delete day and time selector',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      // delete removes the element from the array and preserves the index
      // we need to preserve the index to ensure selected dates are handled correctly
      // howevever, the deleted element index position will still return 'empty'
      // so this needs to be handled
      delete daysAndTimes.value[index]
      delete storeSubject.newForm.daysAndTimes[index]
      // selectedDateRanges.value[rangeIndex] = []
    },
  })
}
</script>
