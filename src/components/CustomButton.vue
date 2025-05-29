<template>
  <Button :icon="icon" :label="label" :severity="severity" :variant="variant" :icon-pos="iconPosition"
    :disabled="disabled" :aria-label="ariaLabel" :type="type" :pt="{ root: { class: customClass } }" v-bind="$attrs"
    @click="handleClick">
    <slot />
  </Button>
</template>

<script setup lang="ts">
type ButtonType = 'button' | 'submit' | 'reset';

import { defineEmits, type PropType } from 'vue';
import Button from 'primevue/button';

const emit = defineEmits(['click']);

const props = defineProps({
  icon: { type: String, default: '' },
  label: { type: String, default: '' },
  severity: { type: String, default: 'contrast' },
  variant: { type: String, default: 'text' },
  iconPosition: { type: String, default: 'left' },
  disabled: { type: Boolean, default: false },
  ariaLabel: { type: String, default: '' },
  customClass: { type: String, default: '' },
  type: {
    type: String as PropType<ButtonType>,
    default: 'button',
  },
});

function handleClick(event: Event) {
  if (props.type !== 'submit') {
    emit('click', event);
  }
}
</script>
