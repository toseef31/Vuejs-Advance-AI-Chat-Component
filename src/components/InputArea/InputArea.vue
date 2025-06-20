<script setup lang="ts">
import { Card } from "primevue";
import { ref, onMounted, } from "vue";
import TextInput from "@/components/InputArea/TextInput.vue";
import SendButton from "@/components/InputArea/SendButton.vue";
import { useSessionStore } from "@/stores/sessionStore";
import { connectWebSocket, sendCommand } from "@/services/webSocketService.ts";
import CustomButton from "../CustomButton.vue";

const inputText = ref("");
const store = useSessionStore();

const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const onSubmit = () => {
  const trimmed = inputText.value.trim();

  if (!trimmed && !selectedFile.value) return;
  if (!store.isConnected) return;

  if (selectedFile.value) {
    const reader = new FileReader();
    reader.onload = () => {
      const fileData = {
        name: selectedFile.value!.name,
        type: selectedFile.value!.type,
        content: reader.result as string,
      };

      store.addUserMessage(trimmed, fileData);

      sendCommand({
        command: "send_message",
        sessionId: store.sessionId,
        timestamp: new Date().toISOString(),
        data: {
          content: trimmed,
          file: fileData,
        },
      });

      inputText.value = "";
      removeAttachment();
    };
    reader.readAsDataURL(selectedFile.value);
  } else {
    store.addUserMessage(trimmed);
    sendCommand({
      command: "send_message",
      sessionId: store.sessionId,
      timestamp: new Date().toISOString(),
      data: { content: trimmed },
    });
    inputText.value = "";
  }
};

onMounted(() => {
  store.initSession();

  connectWebSocket({
    onStatusChange(status) {
      store.setConnectionStatus(status);
    },
    debugPanelEnabled: true,
    authEnabled: false,
  });

  sendCommand({
    command: "initialize_session",
    timestamp: new Date().toISOString(),
    sessionId: store.sessionId,
    data: {},
  });
});

const fileInput = ref<HTMLInputElement | null>(null);

const attachFile = () => {
  fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  selectedFile.value = file;

  if (file.type.startsWith("image/")) {
    previewUrl.value = URL.createObjectURL(file);
  } else {
    previewUrl.value = null;
  }
};

const removeAttachment = () => {
  selectedFile.value = null;
  previewUrl.value = null;
  if (fileInput.value) fileInput.value.value = "";
};

</script>

<template>
  <form @submit.prevent="onSubmit">
    <Card class="input-area">
      <template #content>
        <!-- <input ref="fileInput" type="file" accept="image/*,.pdf,.doc,.docx,.txt" @change="handleFileChange"
          style="display: none" /> -->

        <div v-if="selectedFile" class="mb-1">
          <div class="relative inline-block max-w-32 p-2">
            <img v-if="previewUrl" :src="previewUrl" alt="Preview"
              class="border border-slate-500 rounded-md max-w-full" />
            <p v-else>{{ selectedFile.name }}</p>
            <CustomButton icon="pi pi-cross" type="button" @click="removeAttachment"
              class="remove-btn bg-white text-black ">✕</CustomButton>
          </div>
        </div>
        <TextInput v-model="inputText" @submit="onSubmit" />
      </template>
      <template #footer>
        <div>
          <input ref="fileInput" type="file" accept="image/*,.pdf,.doc,.docx,.txt" @change="handleFileChange"
            style="display: none" />
          <CustomButton icon="pi pi-plus" severity="secondary" type="button" @click="attachFile" />
          <div class="inline-block border border-[1px] rounded-md ml-2 px-3 cursor-pointer"
            :class="{ 'bg-green-500': store.showReasoning }" @click="store.toggleShowReasoning">Reasoning</div>
        </div>
        <SendButton icon="pi pi-send"
          :disabled="(!inputText.trim() && !selectedFile) || !store.isConnected || store.limitExceeded"
          type=" submit" />
      </template>
    </Card>
  </form>
</template>

<style scoped>
.remove-btn {
  position: absolute;
  top: -0px;
  right: -0px;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
