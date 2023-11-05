<template>
  <div class="col courses">
    <h1>View #{{ id }} Course Timetable</h1>
    <div class="grid">
      <div v-for="(lessons, day) in timetable" :key="day" class="col-12">
        <h4>{{ day }}</h4>
        <h5>{{ lessons }}</h5>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useTimetableStore } from '@/stores/timetable'

const storeTimetable = useTimetableStore()

const timetable = computed(() => storeTimetable.timetable.data)

const props = defineProps({
  id: { type: Number, default: 0 },
})

onMounted(() => {
  storeTimetable.getTimetable(props.id)
})
</script>
