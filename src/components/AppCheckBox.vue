<template>
  <div class="form-check">
    <input
      class="form-check-input"
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <label style="font-weight: 700" class="form-check-label" :for="id">{{ label }}</label>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  id: String,
  modelValue: String,
})

defineEmits(['update:modelValue'])
</script>
