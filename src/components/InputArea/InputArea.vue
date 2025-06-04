<script setup lang="ts">
import { Card } from "primevue";
// computed
import { ref, onMounted, } from "vue";
import TextInput from "@/components/InputArea/TextInput.vue";
import SendButton from "@/components/InputArea/SendButton.vue";
import { useSessionStore } from "@/stores/sessionStore";
import { connectWebSocket, sendCommand } from "@/services/webSocketService.ts";
// import { Button } from "primevue";

const inputText = ref("");
const store = useSessionStore();

const onSubmit = () => {
  const trimmed = inputText.value.trim();
  if (!trimmed || !store.isConnected) return;

  // Add user message using store method
  store.addUserMessage(trimmed);

  // Send command to mock WebSocket
  sendCommand({
    command: "send_message",
    sessionId: store.sessionId,
    timestamp: new Date().toISOString(),
    data: { content: trimmed }
  });

  inputText.value = "";
};

onMounted(() => {
  store.initSession();

  connectWebSocket({
    // onMessage(messages) {
    //   // store.addServerMessages(messages);
    // },
    onStatusChange(status) {
      store.setConnectionStatus(status);
    },
    debugPanelEnabled: true,
    authEnabled: false,
  });

  // Optional: send session initialization if needed
  sendCommand({
    command: "initialize_session",
    timestamp: new Date().toISOString(),
    sessionId: store.sessionId,
    data: {},
  });
});

// const varient = computed(() => {
//   return store.showReasoning ? "" : "outlined";
// });
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Card class="input-area">
      <template #content>
        <TextInput v-model="inputText" @submit="onSubmit" />
      </template>
      <template #footer>
        <!-- <div>
          <Button :variant="varient" size="small" rounded @click="store.toggleShowReasoning">
            Reasoning
          </Button>
        </div> -->
        <SendButton icon="pi pi-send" :disabled="inputText === '' || !store.isConnected" type="submit" />
      </template>
    </Card>
  </form>
</template>
