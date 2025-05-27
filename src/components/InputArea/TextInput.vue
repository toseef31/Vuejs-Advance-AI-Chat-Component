<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const value = ref(props.modelValue)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const autoResize = async () => {
  await nextTick()
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 200) + 'px'
}

watch(() => props.modelValue, (newVal) => {
  value.value = newVal
})

watch(value, (val) => {
  emit('update:modelValue', val)
  autoResize()
})
</script>

<template>
  <Textarea ref="textareaRef" v-model="value" rows="1" class="text-area" @input="autoResize" placeholder="Write..." />
</template>
