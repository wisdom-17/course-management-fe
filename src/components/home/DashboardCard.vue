<template>
  <div class="col">
    <Card :class="cardColour" style="min-height: 262px">
      <template #title>{{ title }}</template>
      <template #content>
        <div class="grid" style="min-height: 118px">
          <div class="col-6 flex align-items-center">
            <i :class="mainIcon" style="font-size: 3.5rem" />
          </div>
          <div class="col-6">
            <div class="text-center">
              <ProgressSpinner
                v-if="isLoading"
                style="width: 75px; height: 75px"
              />
              <p v-else class="text-4xl">{{ count }}</p>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <router-link :to="addNewRoute">
          <Button icon="pi pi-plus" class="mr-2" />
        </router-link>
        <router-link :to="listRoute">
          <Button icon="pi pi-list" />
        </router-link>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import ProgressSpinner from 'primevue/progressspinner'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  mainIcon: {
    type: String,
    default: '',
  },
  isLoading: {
    type: Boolean,
    default: true,
  },
  count: {
    type: Number,
    default: null,
  },
  cardColour: {
    type: String,
    default: '',
  },
})

const listRoute = computed(() => {
  return { name: props.title.toLowerCase() }
})

const addNewRoute = computed(() => {
  let addNewRoute = { name: props.title.toLowerCase() }
  if (props.title === 'Courses') {
    addNewRoute = { name: 'newCourse' }
  }
  return addNewRoute
})
</script>
