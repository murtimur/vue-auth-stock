<template>
  <div>
    <AppNavbar />
  </div>

  <div class="mx-1">
    <v-app>
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script setup>
import AppNavbar from './components/AppNavbar.vue'
</script>
