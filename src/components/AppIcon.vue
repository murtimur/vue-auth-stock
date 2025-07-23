<template>
  <v-icon @click="$emit('click')" :animation="animation" :name="name" :style="style"></v-icon>
</template>

<script setup>
defineProps({
  name: String,
  animation: String,
  style: [String, Object],
})

defineEmits(['click'])
</script>
