<template>
  <div class="formgrid grid">
    <div class="field col-3">
      <label for="day">Day</label>
      <Dropdown
        id="day"
        class="w-full"
        :options="days"
        placeholder="Select a Day"
        @change="onChangeDay"
        v-model="selectedDay"
      />
    </div>
    <div class="field col-3">
      <label for="startTime">Start Time</label>
      <Calendar
        id="startTime"
        v-model="selectedStartTime"
        :showTime="true"
        :timeOnly="true"
        @date-select="onChangeStartTime"
      />
    </div>
    <div class="field col-4">
      <label for="endTime">End Time</label>
      <Calendar
        id="endTime"
        v-model="selectedEndTime"
        :showTime="true"
        :timeOnly="true"
        class="mr-1"
        @date-select="onChangeEndTime"
      />
      <Button
        v-if="hasDeleteButton"
        @click="onClickDeleteButton"
        icon="pi pi-trash"
        class="p-button-danger"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Dropdown from 'primevue/dropdown'

const emit = defineEmits([
  'clickedDeleteDayAndTimeButton',
  'selectedDay',
  'selectedStartTime',
  'selectedEndTime',
])

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
})

const onClickDeleteButton = () => {
  emit('clickedDeleteDayAndTimeButton')
}

const onChangeDay = (event) => {
  emit('selectedDay', event.value)
}

const onChangeStartTime = (startTime) => {
  emit('selectedStartTime', startTime.toLocaleTimeString().substring(0, 5))
}

const onChangeEndTime = (endTime) => {
  emit('selectedEndTime', endTime.toLocaleTimeString().substring(0, 5))
}
</script>
