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
            <InputText id="semesterName" class="mr-1 w-6" type="text" />
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
        <div class="formgrid grid">
          <div class="field col-3">
            <label for="semester">Semester</label>
            <Dropdown id="semester" class="w-full" />
            <small class="p-error"></small>
          </div>
          <div class="field col-3">
            <label for="termName">Term 1 Name</label>
            <InputText id="termName" class="w-full" type="text" />
            <small class="p-error"></small>
          </div>
          <div class="field col-4">
            <DateRangePicker
              label="Term 1 Start and End Dates"
              cssClass="w-8 mr-1"
            />
            <small class="p-error"></small>
            <Button icon="pi pi-trash" class="p-button-danger" />
          </div>
        </div>
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
        <div class="formgrid grid">
          <div class="field col-3">
            <label for="semester">Semester</label>
            <Dropdown id="semester" class="w-full" />
            <small class="p-error"></small>
          </div>
          <div class="field col-3">
            <label for="holidayName">Holiday 1 Name</label>
            <InputText id="holidayName" class="w-full" type="text" />
            <small class="p-error"></small>
          </div>
          <div class="field col-4">
            <DateRangePicker
              label="Holiday 1 Start and End Dates"
              cssClass="w-8 mr-1"
            />
            <small class="p-error"></small>
            <Button icon="pi pi-trash" class="p-button-danger" />
          </div>
        </div>
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

const onClickAdditionalTermsButton = () => console.log('clicked + term button')
const onClickAdditionalHolidaysButton = () =>
  console.log('clicked + holiday button')

const showDeleteSemesterButton = computed(() => {
  return storeCourseCalendar.newForm.semesters.filter((x) => x).length > 1
    ? true
    : false
})

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
</script>
