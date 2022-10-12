<template> | <a href="#" @click="onClickLogout">Logout</a> </template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const storeAuth = useAuthStore()

const onClickLogout = () => {
  storeAuth.logout()
}
</script>
