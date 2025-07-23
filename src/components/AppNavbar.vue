<template>
  <nav class="navbar bg-primary" data-bs-theme="dark">
    <div class="container-fluid">
      <span style="font-weight: bold; font-size: 25px" class="navbar-brand mb-0 h1">meganet</span>
      <span style="font-weight: bold; font-size: 25px; color: white">{{ auth.username }}</span>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const { auth } = useAuthStore()
</script>
