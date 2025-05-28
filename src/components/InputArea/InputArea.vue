<script setup lang="ts">
import { ref } from "vue";
import { Card } from 'primevue';
import TextInput from '@/components/InputArea/TextInput.vue';
import SendButton from '@/components/InputArea/SendButton.vue'

const inputText = ref("")

const onSubmit = () => {
  console.log(inputText.value);
}

</script>

<template>
  <form @submit.prevent="onSubmit">
    <Card class="input-area">
      <template #content>
        <TextInput v-model="inputText" />
      </template>
      <template #footer>
        <div></div>
        <SendButton icon="pi pi-send" type="submit" />
      </template>
    </Card>
  </form>
</template>

<style scoped></style>
