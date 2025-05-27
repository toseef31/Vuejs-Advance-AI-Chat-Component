<template>
  <div>
    <CustomButton icon="pi pi-send" varient="text" ariaLabel="Send" severity="contrast" type="submit"
      :class="[customClass]" :disabled="disabled" @click="$emit('click', $event)" />
  </div>
</template>

<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue';

defineProps({
  disabled: { type: Boolean, default: false },
  customClass: { type: String, default: '' },
});

defineEmits(['click']);
</script>
