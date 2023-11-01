<template>
  <div class="col">
    <h1 ref="top">Create New Course</h1>
    <ErrorMessage
      :message="validation.message"
      v-show="showErrorMessage"
      @close="onClickCloseErrorMessage"
    />
    <form class="newCourse">
      <Fieldset legend=" Details">
        <div class="field">
          <label for="courseName">Course  Name</label>
          <InputText
            id="courseName"
            :class="{ 'p-invalid': validation.errors.name.length > 0 }"
            class="mr-1 w-6"
            type="text"
            v-model="storeCourse.newForm.Name"
          />
          <small class="p-error">{{ validation.errors.name[0] }}</small>
        </div>

        <div class="field">
          <DateRangePicker
            label=" Start and End Dates"
            @selected-date-range="
              (selectedDateRange) => {
                storeCourse.newForm.startDate = selectedDateRange[0]
                storeCourse.newForm.endDate = selectedDateRange[1]
              }
            "
            :validationErrorMessages="[
              ...validation.errors.startDate,
              ...validation.errors.endDate,
            ]"
          />
          <small class="p-error"></small>
        </div>
      </Fieldset>

      <Fieldset legend="Semesters" :toggleable="true" class="mt-4">
        <template
          v-for="(semester, index) in storeCourse.newForm.semesters"
          :key="index"
        >
          <!-- we need the v-if="semester" check to ensure deleted semester fields are handled as expected-->
          <div v-if="semester" class="field">
            <label for="semesterName">{{ `Semester ${index + 1} Name` }}</label>
            <InputText
              id="semesterName"
              class="mr-1 w-6"
              type="text"
              v-model="storeCourse.newForm.semesters[index].name"
            />
            <small class="p-error"></small>
            <Button
              v-if="showDeleteSemesterButton"
              @click="onClickDeleteSemesterButton(index)"
              icon="pi pi-trash"
              class="p-button-danger"
            />
          </div>
        </template>
        <div class="field">
          <Button
            class="p-button-sm"
            label="Additional Semesters"
            icon="pi pi-plus"
            @click="onClickAdditionalSemestersButton"
          />
        </div>
      </Fieldset>

      <Fieldset legend="Terms" class="mt-4">
        <template
          v-for="(term, index) in storeCourse.newForm.terms"
          :key="index"
        >
          <div v-if="term" class="formgrid grid">
            <div class="field col-3">
              <label for="semester">Semester</label>
              <Dropdown
                id="semester"
                class="w-full"
                :options="semesters.map((obj) => obj.name)"
                v-model="storeCourse.newForm.terms[index].semester"
              />
              <small class="p-error"></small>
            </div>
            <div class="field col-3">
              <label for="termName">{{ `Term ${index + 1} Name` }}</label>
              <InputText
                id="termName"
                class="w-full"
                type="text"
                v-model="storeCourse.newForm.terms[index].name"
              />
              <small class="p-error"></small>
            </div>
            <div class="field col-4">
              <DateRangePicker
                label="Term Start and End Dates"
                cssClass="w-8 mr-1"
                :minDate="new Date(storeCourse.newForm.startDate)"
                :maxDate="new Date(storeCourse.newForm.endDate)"
                :disabledDates="getDisabledDates(index, 'terms')"
                @selected-date-range="
                  (selectedDateRange) => {
                    storeCourse.newForm.terms[index].startDate =
                      selectedDateRange[0]
                    storeCourse.newForm.terms[index].endDate =
                      selectedDateRange[1]
                  }
                "
              />
              <small class="p-error"></small>
              <Button
                v-if="showDeleteTermButton"
                icon="pi pi-trash"
                class="p-button-danger"
                @click="onClickDeleteTermButton(index)"
              />
            </div>
          </div>
        </template>
        <div class="field">
          <Button
            class="p-button-sm"
            label="Additional Term Dates"
            icon="pi pi-plus"
            @click="onClickAdditionalTermsButton"
          />
        </div>
      </Fieldset>

      <Fieldset legend="Holidays" class="mt-4">
        <template
          v-for="(holiday, index) in storeCourse.newForm.holidays"
          :key="index"
        >
          <div v-if="holiday" class="formgrid grid">
            <div class="field col-3">
              <label for="semester">Semester</label>
              <Dropdown
                id="semester"
                class="w-full"
                :options="semesters.map((obj) => obj.name)"
                v-model="storeCourse.newForm.holidays[index].semester"
              />
              <small class="p-error"></small>
            </div>
            <div class="field col-3">
              <label for="holidayName">{{
                `Holiday  ${index + 1} Name`
              }}</label>
              <InputText
                id="holidayName"
                class="w-full"
                type="text"
                v-model="storeCourse.newForm.holidays[index].name"
              />
              <small class="p-error"></small>
            </div>
            <div class="field col-4">
              <DateRangePicker
                label="Holiday Start and End Dates"
                cssClass="w-8 mr-1"
                :minDate="new Date(storeCourse.newForm.startDate)"
                :maxDate="new Date(storeCourse.newForm.endDate)"
                :disabledDates="getDisabledDates(index, 'holidays')"
                @selected-date-range="
                  (selectedDateRange) => {
                    storeCourse.newForm.holidays[index].startDate =
                      selectedDateRange[0]
                    storeCourse.newForm.holidays[index].endDate =
                      selectedDateRange[1]
                  }
                "
              />
              <small class="p-error"></small>
              <Button
                v-if="showDeleteHolidayButton"
                icon="pi pi-trash"
                class="p-button-danger"
                @click="onClickDeleteHolidayButton(index)"
              />
            </div>
          </div>
        </template>
        <div class="field">
          <Button
            class="p-button-sm"
            label="Additional Holiday Dates"
            icon="pi pi-plus"
            @click="onClickAdditionalHolidaysButton"
          />
        </div>
      </Fieldset>

      <Fieldset legend="Actions" class="mt-4">
        <Button
          icon="pi pi-save"
          label="Save"
          @click="onClickSaveButton"
          :loading="storeCourse.newForm.loading"
        />
      </Fieldset>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import Fieldset from 'primevue/fieldset'
import InputText from 'primevue/inputtext'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { useCourseStore } from '@/stores/course'
import DateRangePicker from '@/components/DateRangePicker.vue'

const confirm = useConfirm()
const router = useRouter()
const storeCourse = useCourseStore()
const toast = useToast()

const validation = ref({
  message: '',
  errors: { name: [], startDate: [], endDate: [] },
})

const top = ref(null)

const showDeleteSemesterButton = computed(() => {
  return storeCourse.newForm.semesters.filter((x) => x).length > 1
    ? true
    : false
})

const showDeleteTermButton = computed(() => {
  return storeCourse.newForm.terms.filter((x) => x).length > 1
    ? true
    : false
})

const showDeleteHolidayButton = computed(() => {
  return storeCourse.newForm.holidays.filter((x) => x).length > 1
    ? true
    : false
})

const showErrorMessage = computed(() => {
  return validation.value.message !== ''
})

const onClickAdditionalSemestersButton = () => {
  console.log('clicked + semester button')
  storeCourse.newForm.semesters.push({ name: '' })
}

const onClickAdditionalTermsButton = () => {
  storeCourse.newForm.terms.push({ name: '' })
}

const onClickAdditionalHolidaysButton = () => {
  storeCourse.newForm.holidays.push({ name: '' })
}

const semesters = computed(() =>
  storeCourse.newForm.semesters
    .filter((obj) => obj.name !== '')
    .map((obj) => {
      return { name: obj.name }
    })
)

const terms = computed(() =>
  storeCourse.newForm.terms
    .filter((obj) => obj.name !== '')
    .map((obj) => {
      return {
        name: obj.name,
        semester: obj.semester,
        startDate: obj.startDate,
        endDate: obj.endDate,
      }
    })
)

const holidays = computed(() =>
  storeCourse.newForm.holidays
    .filter((obj) => obj.name !== '')
    .map((obj) => {
      return {
        name: obj.name,
        startDate: obj.startDate,
        endDate: obj.endDate,
        semester: obj.semester,
      }
    })
)

const onClickDeleteSemesterButton = (index) => {
  confirm.require({
    message:
      'Are you sure you want to delete this semester? Any unsaved changes will be lost.',
    header: 'Delete Semester',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      // delete removes the element from the array and preserves the index
      // we need to preserve the index to ensure selected dates are handled correctly
      // howevever, the deleted element index position will still return 'empty'
      // so this needs to be handled
      delete storeCourse.newForm.semesters[index]
    },
  })
}

const onClickDeleteTermButton = (index) => {
  confirm.require({
    message:
      'Are you sure you want to delete this term? Any unsaved changes will be lost.',
    header: 'Delete Term',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      // delete removes the element from the array and preserves the index
      // we need to preserve the index to ensure selected dates are handled correctly
      // howevever, the deleted element index position will still return 'empty'
      // so this needs to be handled
      delete storeCourse.newForm.terms[index]
    },
  })
}

const onClickDeleteHolidayButton = (index) => {
  confirm.require({
    message:
      'Are you sure you want to delete this holiday? Any unsaved changes will be lost.',
    header: 'Delete Holiday',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      // delete removes the element from the array and preserves the index
      // we need to preserve the index to ensure selected dates are handled correctly
      // howevever, the deleted element index position will still return 'empty'
      // so this needs to be handled
      delete storeCourse.newForm.holidays[index]
    },
  })
}

const getDisabledDates = (fieldIndex, type) => {
  // get all selected term dates
  const selectedTermsDates = storeCourse.newForm.terms
    .filter((obj, index) => {
      if (!!obj.startDate && !!obj.endDate) {
        if (type === 'terms') {
          // this check removes dates that are selected by the field calling this method
          return index !== fieldIndex
        } else {
          return obj
        }
      }
    })
    .map((obj) =>
      getDatesInRange(new Date(obj.startDate), new Date(obj.endDate))
    )

  // get all selected holiday dates
  const selectedHolidaysDates = storeCourse.newForm.holidays
    .filter((obj, index) => {
      if (!!obj.startDate && !!obj.endDate) {
        if (type === 'holidays') {
          return index !== fieldIndex
        } else {
          return obj
        }
      }
    })
    .map((obj) =>
      getDatesInRange(new Date(obj.startDate), new Date(obj.endDate))
    )

  return [...selectedTermsDates.flat(), ...selectedHolidaysDates.flat()]
}

const getDatesInRange = (startDate, endDate) => {
  const date = new Date(startDate.getTime())
  const dates = []

  while (date <= endDate) {
    dates.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return dates
}

const onClickSaveButton = async () => {
  const payload = {
    name: storeCourse.newForm.Name,
    startDate: storeCourse.newForm.startDate,
    endDate: storeCourse.newForm.endDate,
    semesters: semesters.value,
    terms: terms.value,
    holidays: holidays.value,
  }

  // clear validation errors
  validation.value.message = ''
  validation.value.errors = {
    name: [],
    startDate: [],
    endDate: [],
  }

  storeCourse
    .saveNew(payload)
    .then(() => {
      showToast('Course  saved successfully')
      setTimeout(() => {
        // redirect to course  list page
        router.push({ name: 'courses' })
      }, 2000)
    })
    .catch((error) => {
      console.log(error)
      storeCourse.newForm.loading = false
      console.log('error in course  form')
      validation.value.message = error.response.data.message
      // update validation error msgs with error msgs
      // returned from API call
      validation.value.errors = {
        ...validation.value.errors,
        ...error.response.data.errors,
      }
      top.value.scrollIntoView({ behavior: 'smooth' })
    })
}

const onClickCloseErrorMessage = () => {
  validation.value.message = ''
}

const showToast = (message) => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: message,
    life: 1500,
  })
}
</script>
