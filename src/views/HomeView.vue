<template>
  <DashboardCard
    v-for="card in cards"
    :key="card.title"
    :title="card.title"
    :mainIcon="card.mainIcon"
    :isLoading="card.isLoading"
    :count="card.count"
    :cardColour="card.cardColour"
  />
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useTeacherStore } from '@/stores/teacher'
import { useCourseStore } from '@/stores/course'
import { useSubjectStore } from '@/stores/subject'
import DashboardCard from '@/components/home/DashboardCard.vue'

const teacherStore = useTeacherStore()
const courseStore = useCourseStore()
const subjectStore = useSubjectStore()

const cards = computed(() => [
  {
    title: 'Teachers',
    mainIcon: 'pi pi-users',
    isLoading: teacherStore.list.loading,
    count: teacherStore.list.total,
    cardColour: 'bg-blue-100',
  },
  {
    title: 'Courses',
    mainIcon: 'pi pi-calendar',
    isLoading: courseStore.list.loading,
    count: courseStore.list.data.length,
    cardColour: 'bg-yellow-100',
  },
  {
    title: 'Subjects',
    mainIcon: 'pi pi-briefcase',
    isLoading: subjectStore.list.loading,
    count: subjectStore.list.data.length,
    cardColour: 'bg-green-100',
  },
])

onMounted(() => {
  teacherStore.getTeachers(1)
  courseStore.getCourses()
  subjectStore.getSubjects(1)
})
</script>
