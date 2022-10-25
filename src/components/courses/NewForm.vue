<template>
  <Card class="mt-4 surface-ground">
    <template #title>New Course</template>
    <template #content>
      <ErrorMessage
        :message="validation.message"
        v-show="showErrorMessage"
        @close="onClickClose"
      />
      <form>
        <div class="field">
          <label for="courseName">Course Name</label>
          <InputText
            id="courseName"
            class="w-full"
            :class="{ 'p-invalid': validation.errors.name.length > 0 }"
            type="text"
            v-model="course.name"
          />
          <small class="p-error">{{ validation.errors.name[0] }}</small>
        </div>
        <div class="flex justify-content-between">
          <div class="flex">
            <Button
              class="mr-2"
              icon="pi pi-save"
              label="Save"
              @click="handleOnClickSubmitButton()"
            />
            <Button
              class="mr-2"
              icon="pi pi-angle-double-right"
              label="Next Step"
            />
          </div>
          <div class="flex align-self-end">
            <Button class="p-button-danger" icon="pi pi-trash" label="Cancel" />
          </div>
        </div>
      </form>
    </template>
  </Card>
</template>

<script setup>
import Button from 'primevue/button'
import Card from 'primevue/card'
import CourseService from '@/services/Course'
import InputText from 'primevue/inputtext'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { ref } from 'vue'

const course = ref({ name: '' })
const validation = ref({ message: '', errors: { name: [] } })
const showErrorMessage = ref(false)

const handleOnClickSubmitButton = async () => {
  const payload = { name: course.value.name }

  // clear validation errors
  validation.value.message = ''
  validation.value.errors = { name: [] }

  try {
    const apiResult = await CourseService.new(payload)
    console.log(apiResult)
  } catch (error) {
    validation.value.message = error.response.data.message
    // update validation error messages with ones
    // returned from API call
    validation.value.errors = {
      ...validation.value.errors,
      ...error.response.data.errors,
    }
    showErrorMessage.value = true
    console.log(error)
  }
}

const onClickClose = () => {
  validation.value.message = ''
  showErrorMessage.value = false
}
</script>
<style scoped>
.field input {
  display: block;
}
</style>
