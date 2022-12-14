<template>
  <div class="formgrid grid">
    <div class="field col-3">
      <label for="day">Day</label>
      <Dropdown
        id="day"
        class="w-full"
        v-model="selectedDay"
        :options="days"
        placeholder="Select a Day"
      />
    </div>
    <div class="field col-3">
      <label for="startTime">Start Time</label>
      <Calendar
        id="startTime"
        v-model="selectedStartTime"
        :showTime="true"
        :timeOnly="true"
      />
    </div>
    <div class="field col-3">
      <label for="endTime">End Time</label>
      <Calendar
        id="endTime"
        v-model="selectedEndTime"
        :showTime="true"
        :timeOnly="true"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
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
</script>
