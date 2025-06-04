<script setup lang="ts">
import { Card } from "primevue";
import { ref, onMounted, computed } from "vue";
import TextInput from "@/components/InputArea/TextInput.vue";
import SendButton from "@/components/InputArea/SendButton.vue";
import { useSessionStore } from "@/stores/sessionStore";
import { connectWebSocket, sendMessage as wsSend } from "@/services/webSocketService.ts";
import type { ChatMessage } from "@/stores/sessionStore";
import { Button } from "primevue";

const inputText = ref("");
const store = useSessionStore();

const onSubmit = () => {
  const trimmed = inputText.value.trim();
  if (!trimmed) return;

  if (!store.isConnected) return;

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
    onStatusChange(status) {
      store.setConnectionStatus(status);
      store.setConnected(status === "connected");
    },
  });
});
const varient = computed(() => {
  if (store.showReasoning) {
    return ''
  } else {

    return 'outlined'
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Card class="input-area">
      <template #content>
        <TextInput v-model="inputText" @submit="onSubmit" />
      </template>
      <template #footer>
        <div><Button :variant="varient" size="small" rounded @click="store.toggleShowReasoning">Reasoning</Button></div>
        <SendButton icon="pi pi-send" :disabled="inputText === '' || !store.isConnected" type="submit" />
      </template>
    </Card>
  </form>
</template>

<style scoped></style>
