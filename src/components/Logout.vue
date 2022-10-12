<template> | <a href="#" @click="onClickLogout">Logout</a> | </template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const storeAuth = useAuthStore()

const onClickLogout = () => {
  console.log('clicked logout')
  storeAuth.logout()
}
</script>
