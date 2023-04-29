<template>
  <div class="formgrid grid">
    <div class="field col-3">
      <label for="day">Day</label>
      <Dropdown
        id="day"
        class="w-full"
        :options="days"
        placeholder="Select a Day"
        v-model="selectedDay"
        @change="(e) => $emit('selectedDay', e.value)"
      />
      <small class="p-error">{{ validationErrors.day[0] }}</small>
    </div>
    <div class="field col-3">
      <label for="startTime">Start Time</label>
      <Calendar
        id="startTime"
        v-model="selectedStartTime"
        :showTime="true"
        :timeOnly="true"
        @update:model-value="
          (value) =>
            $emit(
              'selectedStartTime',
              value.toLocaleTimeString().substring(0, 5)
            )
        "
      />
      <small class="p-error">{{ validationErrors.startTime[0] }}</small>
    </div>
    <div class="field col-4">
      <label for="endTime">End Time</label>
      <Calendar
        id="endTime"
        v-model="selectedEndTime"
        :showTime="true"
        :timeOnly="true"
        class="mr-1"
        @update:model-value="
          (value) =>
            $emit('selectedEndTime', value.toLocaleTimeString().substring(0, 5))
        "
      />
      <Button
        v-if="hasDeleteButton"
        @click="() => $emit('clickedDeleteDayAndTimeButton')"
        icon="pi pi-trash"
        class="p-button-danger"
      />
      <small class="p-error">{{ validationErrors.endTime[0] }}</small>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Dropdown from 'primevue/dropdown'

const days = ref([
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
])

const selectedDay = ref('')
const selectedStartTime = ref('')
const selectedEndTime = ref('')

defineProps({
  hasDeleteButton: {
    type: Boolean,
    default: false,
  },
  validationErrors: {
    type: Object,
    default() {
      return {
        day: [],
        startTime: [],
        endTime: [],
      }
    },
  },
})
</script>
