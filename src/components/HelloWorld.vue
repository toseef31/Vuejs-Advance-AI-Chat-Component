<template>
  <Button :icon="icon" :label="label" :severity="severity" :variant="variant" :icon-pos="iconPosition"
    :disabled="disabled" :aria-label="ariaLabel" :pt="{
      root: { class: customClass }
    }" v-bind="$attrs" @click="$emit('click', $event)">
    <slot />
  </Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button';

defineProps({
  icon: { type: String, default: '' },
  label: { type: String, default: '' },
  severity: { type: String, default: 'contrast' },
  variant: { type: String, default: 'text' },
  iconPosition: { type: String, default: 'left' },
  disabled: { type: Boolean, default: false },
  ariaLabel: { type: String, default: '' },
  customClass: { type: String, default: '' },
});

defineEmits(['click']);
</script>

<style scoped>
.testing {
  background: red !important;
  font-size: 30px;
}
</style>
