<script setup lang="ts">
import { type PropType, computed, onMounted, reactive, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
  },
  placeholder: {
    type: String,
  },
  label: {
    type: String,
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium',
  },
})
const emit = defineEmits(['update:modelValue', 'onChange', 'onPressEnter'])
const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  },
})
function handleInput(e: Event) {
  // console.log(e)
}
function handleChange(e: Event) {
  // console.log(e)
}
function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter')
    emit('onPressEnter', e)
}
</script>

<template>
  <input
    v-model="value"
    :placeholder="placeholder"
    type="text"
    required
    @input="handleInput"
    @change="handleChange"
    @keydown="handleKeyDown"
  >
</template>

<style></style>
