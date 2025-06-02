<template>
  <Card class="user-message ml-auto max-w-[80%] w-fit my-2">
    <template #content>
      {{ props.message }}
    </template>
  </Card>
</template>

<script setup lang="ts">
import { Card } from 'primevue';
const props = defineProps({
  message: { type: String, default: "" }
})
</script>

<style>
.user-message .p-card-body {
  padding: 12px !important;
}
</style>
