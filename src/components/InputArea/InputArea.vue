<script setup lang="ts">
import { Card } from "primevue";
import { ref, onMounted } from "vue";
import TextInput from "@/components/InputArea/TextInput.vue";
import SendButton from "@/components/InputArea/SendButton.vue";
import { useSessionStore } from "@/stores/sessionStore";
import { connectWebSocket, sendMessage as wsSend } from "@/services/webSocketService.ts";
import type { ChatMessage } from "@/stores/sessionStore";

const inputText = ref("");
const store = useSessionStore();

const onSubmit = () => {
  const trimmed = inputText.value.trim();
  if (!trimmed) return;

  const userMessage: Omit<ChatMessage, "id" | "timestamp"> = {
    sender: "user",
    type: "user_input",
    content: trimmed,
  };

  store.addMessage(userMessage);
  wsSend({ content: trimmed });

  inputText.value = "";
};

onMounted(() => {
  store.initSession();

  connectWebSocket({
    sessionId: store.sessionId,
    onInit(info) {
      console.log("WebSocket initialized:", info);
    },
    onMessage(msg) {
      store.addMessage({
        sender: "server",
        type: msg.type,
        format: msg.format,
        content: msg.content,
      });
    },
  });
});
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
