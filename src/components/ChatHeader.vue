<template>
  <Card>
    <template #content>
      <div class="flex justify-between items-center">
        <div>
          <p>{{ title }}</p>
        </div>
        <div class="flex gap-2">
          <Badge size="small" :severity="badgeSeverity">
            {{ store.connectionStatus }}
          </Badge>
          <Badge size="small" severity="secondary">
            <RouterLink to="/history">History</RouterLink>
          </Badge>
          <Badge @click="startNewChat" size="small" severity="info" class="cursor-pointer">New session</Badge>
        </div>
      </div>
      <div class="flex justify-between mt-3" v-if="store.limitExceeded">
        <p class="text-red-500 mt-2">
          You've reaced the session limit. Please start chat in a new session.
        </p>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { Card, Badge } from "primevue";
import { computed } from "vue";
import { useSessionStore } from "@/stores/sessionStore";
import { useHistoryStore } from "@/stores/historyStore";
import { useRouter } from 'vue-router'

const store = useSessionStore();
const historyStore = useHistoryStore();
const router = useRouter();

defineProps({
  title: { type: String, default: "" },
});

const badgeSeverity = computed(() => {
  switch (store.connectionStatus) {
    case "connected":
      return "success";
    case "connecting":
      return "danger";
    case "disconnected":
    default:
      return "danger";
  }
});

const startNewChat = () => {
  if (store.sessionId && store.messages.length > 0) {
    historyStore.addSession(store.sessionId, store.messages);
  }
  router.push({ name: 'home', })
  store.endSession();
  store.resumeSession(store.sessionId);
  store.setConnected(true);
};
</script>
