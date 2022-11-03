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
    @date-select="onSelectedDateRange"
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

const emit = defineEmits(['selectedDateRange'])
const selectedDateRange = ref([])

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

defineProps({
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
})
</script>
