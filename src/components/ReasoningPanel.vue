<template>
  <div class="p-4">
    <div class="inline-flex gap-3 bg-gray-500 py-2 px-4 mb-2 rounded cursor-pointer"
      @click="toggleTinkingPanel = !toggleTinkingPanel">
      <p class="text-xs" v-if="isThinking">Thinking...</p>
      <p class="text-xs" v-else>Thought for 5 seconds</p>
      <i class="pi pi-chevron-up" v-if="toggleTinkingPanel"></i>
      <i class="pi pi-chevron-down text-[6px]" v-else></i>
    </div>
    <div v-if="!isThinking && toggleTinkingPanel" class="text-sm border-l border-[#A6A6A6] px-2 dark:text-[#A6A6A6]">
      {{ props.message }}
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from "vue"

const props = defineProps({
  message: {
    type: String,
    default: "",

  }
})

const isThinking = ref(true);
const toggleTinkingPanel = ref(false);

setTimeout(() => {
  isThinking.value = false;
}, 5000);
</script>
