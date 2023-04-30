<template>
  <Paginator
    :rows="props.rowsPerPage"
    :totalRecords="props.totalRecords"
    @page="(e) => $emit('pageChanged', e.page + 1)"
    :alwaysShow="false"
  ></Paginator>
</template>

<script setup>
import Paginator from 'primevue/paginator'

const props = defineProps({
  totalRecords: {
    type: Number,
    default: 0,
  },
  rowsPerPage: {
    type: Number,
    default: 15,
  },
})
</script>
