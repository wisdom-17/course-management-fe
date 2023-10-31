<template>
  <div class="col courses">
    <h1>View #{{ id }} Subject Timetable</h1>
    <pre>{{ timetable }}</pre>
  </div>
</template>

<script setup>
import { useSubjectStore } from '@/stores/subject'
import { computed } from 'vue'

const storeSubject = useSubjectStore()

const timetable = computed(() => {
  return storeSubject.list.data.find((subject) => {
    return subject.id == props.id
  })
})

const props = defineProps({
  id: { type: String, default: null },
})
</script>
