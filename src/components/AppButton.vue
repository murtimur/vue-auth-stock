<template>
  <button
    style="font-weight: 700"
    :disabled="isDisabled || apiProgress"
    :class="`btn btn-${variant}`"
    @click="$emit('click')"
  >
    <AppSpinner v-if="apiProgress" />
    <slot></slot>
  </button>
</template>

<script setup>
import AppSpinner from './AppSpinner.vue'

defineEmits(['click'])

defineProps({
  isDisabled: Boolean,
  apiProgress: Boolean,
  variant: {
    type: String,
    default: 'primary',
  },
})
</script>
