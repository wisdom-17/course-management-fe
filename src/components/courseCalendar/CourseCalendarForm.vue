<template>
  <div class="col">
    <h1>Create New Course Calendar</h1>

    <form class="newCourseCalendar">
      <Fieldset legend="Calendar Details">
        <div class="field">
          <label for="courseCalendarName">Course Calendar Name</label>
          <InputText
            id="courseCalendarName"
            class="mr-1 w-6"
            type="text"
            v-model="storeCourseCalendar.newForm.calendarName"
          />
          <small class="p-error"></small>
        </div>

        <div class="field">
          <DateRangePicker
            label="Calendar Start and End Dates"
            @selected-date-range="
              (selectedDateRange) => {
                storeCourseCalendar.newForm.startDate = selectedDateRange[0]
                storeCourseCalendar.newForm.endDate = selectedDateRange[1]
              }
            "
          />
          <small class="p-error"></small>
        </div>
      </Fieldset>

      <Fieldset legend="Semesters" :toggleable="true" class="mt-4">
        <template
          v-for="(semester, index) in storeCourseCalendar.newForm.semesters"
          :key="index"
        >
          <!-- we need the v-if="semester" check to ensure deleted semester fields are handled as expected-->
          <div v-if="semester" class="field">
            <label for="semesterName">{{ `Semester ${index + 1} Name` }}</label>
            <InputText
              id="semesterName"
              class="mr-1 w-6"
              type="text"
              v-model="storeCourseCalendar.newForm.semesters[index].name"
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
          v-for="(term, index) in storeCourseCalendar.newForm.terms"
          :key="index"
        >
          <div v-if="term" class="formgrid grid">
            <div class="field col-3">
              <label for="semester">Semester</label>
              <Dropdown
                id="semester"
                class="w-full"
                :options="semesterNames"
                v-model="storeCourseCalendar.newForm.terms[index].semester"
              />
              <small class="p-error"></small>
            </div>
            <div class="field col-3">
              <label for="termName">{{ `Term ${index + 1} Name` }}</label>
              <InputText
                id="termName"
                class="w-full"
                type="text"
                v-model="storeCourseCalendar.newForm.terms[index].name"
              />
              <small class="p-error"></small>
            </div>
            <div class="field col-4">
              <DateRangePicker
                label="Term Start and End Dates"
                cssClass="w-8 mr-1"
                :minDate="new Date(storeCourseCalendar.newForm.startDate)"
                :maxDate="new Date(storeCourseCalendar.newForm.endDate)"
                @selected-date-range="
                  (selectedDateRange) => {
                    storeCourseCalendar.newForm.terms[index].startDate =
                      selectedDateRange[0]
                    storeCourseCalendar.newForm.terms[index].endDate =
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
          v-for="(holiday, index) in storeCourseCalendar.newForm.holidays"
          :key="index"
        >
          <div v-if="holiday" class="formgrid grid">
            <div class="field col-3">
              <label for="semester">Semester</label>
              <Dropdown
                id="semester"
                class="w-full"
                :options="semesterNames"
                v-model="storeCourseCalendar.newForm.holidays[index].semester"
              />
              <small class="p-error"></small>
            </div>
            <div class="field col-3">
              <label for="holidayName">{{
                `Holiday  ${index + 1} Name`
              }}</label>
              <InputText id="holidayName" class="w-full" type="text" />
              <small class="p-error"></small>
            </div>
            <div class="field col-4">
              <DateRangePicker
                label="Holiday Start and End Dates"
                cssClass="w-8 mr-1"
                :minDate="new Date(storeCourseCalendar.newForm.startDate)"
                :maxDate="new Date(storeCourseCalendar.newForm.endDate)"
                @selected-date-range="
                  (selectedDateRange) => {
                    storeCourseCalendar.newForm.holidays[index].startDate =
                      selectedDateRange[0]
                    storeCourseCalendar.newForm.holidays[index].endDate =
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

      <Fieldset legend="Actions" class="mt-4"></Fieldset>
    </form>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import Fieldset from 'primevue/fieldset'
import InputText from 'primevue/inputtext'
import { useConfirm } from 'primevue/useconfirm'
import { useCourseCalendarStore } from '@/stores/courseCalendar'
import DateRangePicker from '@/components/DateRangePicker.vue'

const confirm = useConfirm()
const storeCourseCalendar = useCourseCalendarStore()

const onClickAdditionalSemestersButton = () => {
  console.log('clicked + semester button')
  storeCourseCalendar.newForm.semesters.push({ name: '' })
}

const onClickAdditionalTermsButton = () => {
  console.log('clicked + term button')
  storeCourseCalendar.newForm.terms.push({ name: '' })
}

const onClickAdditionalHolidaysButton = () => {
  console.log('clicked + holiday button')
  storeCourseCalendar.newForm.holidays.push({ name: '' })
}

const showDeleteSemesterButton = computed(() => {
  return storeCourseCalendar.newForm.semesters.filter((x) => x).length > 1
    ? true
    : false
})

const showDeleteTermButton = computed(() => {
  return storeCourseCalendar.newForm.terms.filter((x) => x).length > 1
    ? true
    : false
})

const showDeleteHolidayButton = computed(() => {
  return storeCourseCalendar.newForm.holidays.filter((x) => x).length > 1
    ? true
    : false
})

const semesterNames = computed(() =>
  storeCourseCalendar.newForm.semesters
    .filter((obj) => obj.name !== '')
    .map((obj) => obj.name)
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
      delete storeCourseCalendar.newForm.semesters[index]
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
      delete storeCourseCalendar.newForm.terms[index]
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
      delete storeCourseCalendar.newForm.holidays[index]
    },
  })
}
</script>
