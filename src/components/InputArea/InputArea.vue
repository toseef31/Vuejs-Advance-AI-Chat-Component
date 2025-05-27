<script setup lang="ts">
import { ref, watch } from "vue";
import { Card } from 'primevue';
import TextInput from '@/components/InputArea/TextInput.vue';
import SendButton from '@/components/InputArea/SendButton.vue'

const inputText = ref("")

watch(inputText, (val) => {
  console.log("Parent sees input value:", val)
})

</script>

<template>
  <Card class="input-area">
    <template #header>
      <p>{{ inputText }}</p>
    </template>
    <template #content>
      <TextInput v-model="inputText" />
    </template>
    <template #footer>
      <div></div>
      <SendButton icon="pi pi-send" />
    </template>
  </Card>
</template>

<style scoped></style>
