<template>
  <form class="teacher">
    <div class="field">
      <label for="teacherName">Name</label>
      <InputText
        id="teacherName"
        class="mr-1 w-6"
        type="text"
        v-model="teacher.name"
      />
    </div>

    <Button icon="pi pi-save" label="Save" />
  </form>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const teacher = ref({
  name: '',
})
</script>
