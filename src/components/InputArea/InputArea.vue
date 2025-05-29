<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Card } from 'primevue';
import TextInput from '@/components/InputArea/TextInput.vue';
import SendButton from '@/components/InputArea/SendButton.vue';
import { useSessionStore } from '@/stores/sessionStore'
import { connectWebSocket, sendMessage as wsSend } from '@/services/webSocketServices'

const inputText = ref("")
const store = useSessionStore()

const onSubmit = () => {
  if (!inputText.value) return null;
  sendMessage(inputText.value)
  inputText.value = "";
}

const sendMessage = (msg: string) => {
  store.addMessage(msg, "user");
  wsSend(msg);
};

onMounted(() => {
  store.initSession();
  connectWebSocket((incoming) => {
    store.addMessage(incoming, "server");
  });
})

</script>

<template>
  <form @submit.prevent="onSubmit">
    <Card class="input-area">
      <template #content>
        <TextInput v-model="inputText" @submit="onSubmit" />
      </template>
      <template #footer>
        <div></div>
        <SendButton icon="pi pi-send" type="submit" />
      </template>
    </Card>
  </form>
</template>

<style scoped></style>
