<template>
  <div :class="`alert alert-${variant} ${center ? 'text-center' : ''}`" role="alert">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'success',
  },
  center: Boolean,
})
</script>
