<template>
  <label for="dateRange">{{ label }}</label>
  <Calendar
    id="dateRange"
    :class="{ 'p-invalid': validationErrorMessages.length > 0 }"
    class="mr-1 w-4"
    v-model="selectedDateRange"
    selectionMode="range"
    dateFormat="dd/mm/yy"
    :numberOfMonths="2"
    :showButtonBar="true"
    :showIcon="true"
    :disabledDates="disabledDates"
    @date-select="onSelectedDateRange"
    @clear-click="onClearedDateRange"
    :minDate="minDate"
    :maxDate="maxDate"
    :hide-on-range-selection="true"
  />
  <Button
    v-if="hasDeleteButton"
    @click="onClickDeleteButton"
    icon="pi pi-trash"
    class="p-button-danger"
  />
  <template v-for="errorMessage in validationErrorMessages" :key="errorMessage">
    <small class="p-error">
      {{ errorMessage }}
    </small>
    {{ ' ' }}
  </template>
</template>

<script setup>
import { ref } from 'vue'
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'

const props = defineProps({
  validationErrorMessages: {
    type: Array,
    default() {
      return []
    },
  },
  label: {
    type: String,
    default: 'Start and End Dates',
  },
  disabledDates: {
    type: Array,
    default() {
      return []
    },
  },
  hasDeleteButton: {
    type: Boolean,
    default: false,
  },
  minDate: {
    type: Date,
    default: null,
  },
  maxDate: {
    type: Date,
    default: null,
  },
  existingDateRange: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits([
  'selectedDateRange',
  'clearedDateRange',
  'clickedDeleteDatePickerButton',
])
const selectedDateRange = ref(
  props.existingDateRange.length === 2 ? props.existingDateRange : []
)

const onSelectedDateRange = () => {
  // emit event only after two dates (i.e. range) have been selected and formatted
  if (selectedDateRange.value.filter((elem) => !!elem).length === 2) {
    const formattedStartDate = new Date(
      selectedDateRange.value[0]
    ).toLocaleDateString('fr-CA') // Canadian date format is yyyy-mm-dd

    const formattedEndDate = new Date(
      selectedDateRange.value[1]
    ).toLocaleDateString('fr-CA')

    emit('selectedDateRange', [formattedStartDate, formattedEndDate])
  }
}

const onClearedDateRange = () => {
  emit('clearedDateRange')
}

const onClickDeleteButton = () => {
  emit('clickedDeleteDatePickerButton')
}
</script>
