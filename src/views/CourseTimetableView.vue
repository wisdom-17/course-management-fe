<template>
  <div class="col courses">
    <h1>View #{{ id }} Course Timetable</h1>
    <TimetableToolbar />
    <div
      v-if="storeTimetable.timetable.loading"
      class="flex justify-content-center mt-2"
    >
      <ProgressSpinner />
    </div>
    <div v-else class="flex flex-row mt-2">
      <div v-for="(lessons, day) in timetable" :key="day" class="flex-1">
        <Day :day="day" />
        <!-- <h5>{{ lessons }}</h5> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
import { useTimetableStore } from '@/stores/timetable'
import Day from '@/components/timetable/Day.vue'
import TimetableToolbar from '../components/timetable/TimetableToolbar.vue'

const storeTimetable = useTimetableStore()

const timetable = computed(() => storeTimetable.timetable.data)

const props = defineProps({
  id: { type: Number, default: 0 },
})

onMounted(() => {
  storeTimetable.getTimetable(props.id)
})
</script>
