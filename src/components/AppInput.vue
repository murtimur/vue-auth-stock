<template>
  <div>
    <label style="font-weight: 600" v-if="label" :for="id" class="form-label">{{ label }}</label>
    <input
      ref="inputRef"
      style="font-weight: 700"
      :style="style"
      :disabled="disabled"
      autocomplete="off"
      class="form-control"
      :class="{ 'is-invalid': help }"
      :id="id"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :value="modelValue"
      @change="('change', $event)"
      :placeholder="placeholder"
    />
    <div class="invalid-feedback">{{ help }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputRef = ref()

defineExpose({
  focus: () => inputRef.value?.focus(),
  el: inputRef,
})

defineProps({
  id: String,
  label: String,
  help: String,
  modelValue: String,
  type: String,
  disabled: Boolean,
  placeholder: String,
  style: String,
})

defineEmits(['update:modelValue'])
</script>
