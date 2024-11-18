<template>
  <div class="col">
    <Card class="bg-blue-100" style="min-height: 262px">
      <template #title>Teachers</template>
      <template #content>
        <div class="grid">
          <div class="col-6 flex align-items-center">
            <i class="pi pi-users" style="font-size: 3.5rem" />
          </div>
          <div class="col-6">
            <div class="text-center">
              <ProgressSpinner
                v-if="teacherStore.list.loading"
                style="width: 75px; height: 75px"
              />
              <p v-else class="text-4xl">{{ teacherStore.list.total }}</p>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <router-link :to="{ name: 'teachers' }">
          <Button icon="pi pi-plus" class="mr-2" />
        </router-link>
        <router-link :to="{ name: 'teachers' }">
          <Button icon="pi pi-list" />
        </router-link>
      </template>
    </Card>
  </div>
  <div class="col">
    <Card class="bg-yellow-100" style="min-height: 262px">
      <template #title>Courses</template>
      <template #content>
        <div class="grid">
          <div class="col-6 flex align-items-center">
            <i class="pi pi-calendar" style="font-size: 2.5rem" />
          </div>
          <div class="col-6">
            <div class="text-center">
              <ProgressSpinner
                v-if="courseStore.list.loading"
                style="width: 75px; height: 75px"
              />
              <p v-else class="text-4xl">{{ courseStore.list.data.length }}</p>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <router-link :to="{ name: 'newCourse' }">
          <Button icon="pi pi-plus" class="mr-2" />
        </router-link>
        <router-link :to="{ name: 'courses' }">
          <Button icon="pi pi-list" />
        </router-link>
      </template>
    </Card>
  </div>
  <div class="col">
    <Card class="bg-green-100" style="min-height: 262px">
      <template #title>Subjects</template>
      <template #content>
        <div class="grid">
          <div class="col-6 flex align-items-center">
            <i class="pi pi-briefcase" style="font-size: 2.5rem" />
          </div>
          <div class="col-6">
            <div class="text-center">
              <ProgressSpinner
                v-if="subjectStore.list.loading"
                style="width: 75px; height: 75px"
              />
              <p v-else class="text-4xl">{{ subjectStore.list.data.length }}</p>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <router-link :to="{ name: 'subjects' }">
          <Button icon="pi pi-plus" class="mr-2" />
        </router-link>
        <router-link :to="{ name: 'subjects' }">
          <Button icon="pi pi-list" />
        </router-link>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import ProgressSpinner from 'primevue/progressspinner'
import { useTeacherStore } from '@/stores/teacher'
import { useCourseStore } from '@/stores/course'
import { useSubjectStore } from '@/stores/subject'

const teacherStore = useTeacherStore()
const courseStore = useCourseStore()
const subjectStore = useSubjectStore()

onMounted(() => {
  teacherStore.getTeachers(1)
  courseStore.getCourses()
  subjectStore.getSubjects(1)
})
</script>
