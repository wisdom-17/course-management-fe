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
    <div class="field">
      <label for="hourlyPay">Hourly Pay</label>
      <InputNumber
        id="hourlyPay"
        class="mr-1 w-6"
        v-model="teacher.hourlyPay"
        mode="currency"
        currency="GBP"
        locale="en-GB"
      />
    </div>

    <Button icon="pi pi-save" label="Save" />
  </form>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'

const teacher = ref({
  name: '',
  hourlyPay: 0,
})
</script>
