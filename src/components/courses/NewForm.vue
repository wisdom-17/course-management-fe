<template>
  <Card class="mt-4 surface-ground">
    <template #title>New Course</template>
    <template #content>
      <form>
        <div class="field">
          <label for="courseName">Course Name</label>
          <InputText
            id="courseName"
            class="w-full"
            type="text"
            v-model="courseName"
          />
        </div>
        <Button label="Submit" @click="handleOnClickSubmitButton()" />
      </form>
    </template>
  </Card>
</template>

<script setup>
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'

import { ref } from 'vue'

const courseName = ref('')

const handleOnClickSubmitButton = () => {
  console.log('clicked submit button')
}
</script>
<style scoped>
.field * {
  display: block;
}
</style>
