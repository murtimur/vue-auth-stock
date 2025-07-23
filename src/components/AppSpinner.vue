<template>
  <span
    class="spinner-border"
    :class="{ 'spinner-border-sm': size === 'small' }"
    aria-hidden="true"
  ></span>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'small',
  },
})
</script>
