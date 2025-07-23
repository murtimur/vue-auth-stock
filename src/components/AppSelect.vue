<template>
  <label style="font-weight: 600" v-if="label" :for="id" class="form-label">{{ label }}</label>
  <select
    style="font-weight: 600"
    :style="style"
    :id="id"
    class="form-select form-select-lg"
    :class="{ 'is-invalid': help }"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option style="font-weight: 600" v-for="(item, index) in data" :key="index" :value="item.id">
      {{ item.adi || item.kod || item.kodu }}
    </option>
  </select>
  <div class="invalid-feedback">{{ help }}</div>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  label: String,
  modelValue: [String, Number],
  id: String,
  help: String,
  style: String,
})
defineEmits(['update:modelValue'])
</script>
