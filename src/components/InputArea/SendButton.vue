<template>
  <CustomButton icon="pi pi-send" variant="text" ariaLabel="Send" severity="contrast" type="submit"
    :class="[customClass]" :disabled="disabled" />
</template>

<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue';

defineProps({
  disabled: { type: Boolean, default: false },
  customClass: { type: String, default: '' },
});
</script>
