<script setup lang="ts">

import { ref, watch, nextTick, onMounted } from 'vue'
import { Textarea } from 'primevue';

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const value = ref(props.modelValue)
const textareaRef = ref<any>(null)

const autoResize = async () => {
  await nextTick()
  const componentRef = textareaRef.value
  if (!componentRef) return

  const el = componentRef.$el as HTMLTextAreaElement
  if (!el) return

  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 200) + 'px'
}

const handleInput = () => {
  const componentRef = textareaRef.value
  if (componentRef) {
    const el = componentRef.$el as HTMLTextAreaElement
    if (el) {
      emit('update:modelValue', el.value)
      autoResize()
    }
  }
}

watch(() => props.modelValue, (newVal) => {
  value.value = newVal
  autoResize()
})

onMounted(() => {
  autoResize()
})
</script>

<template>
  <Textarea ref="textareaRef" v-model="value" rows="1" class="text-area" @input="handleInput" placeholder="Write..." />
</template>

<style>
.p-textarea {
  font-size: 30px;
  padding: 4px 10px !important;
  line-height: 20px;
  width: 100%;
  border-radius: 8px;
  min-height: 40px;
  border: none !important;
  background-color: transparent !important;
  outline: none !important;
  resize: none !important;
  box-shadow: none !important;
}

.p-textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.p-textarea:focus {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}
</style>
