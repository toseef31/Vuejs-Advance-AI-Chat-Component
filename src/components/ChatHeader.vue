<template>
  <Card>
    <template #content>
      <div class="flex justify-between items-center">
        <div>
          <p>{{ title }}</p>
        </div>
        <div>
          <Badge size="small" :severity="badgeSeverity">
            {{ store.connectionStatus }}
          </Badge>
        </div>
      </div>
      <div>
        {{ store.sessionInitMessage }}
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { Card, Badge } from "primevue";
import { computed } from "vue";
import { useSessionStore } from "@/stores/sessionStore";

const store = useSessionStore();

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
</script>
