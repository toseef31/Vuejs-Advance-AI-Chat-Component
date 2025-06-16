<template>
  <div class="flex justify-center item-center flex-col w-full h-full">
    <div v-if="getSessionData.length === 0" class="mx-auto text-center">
      <div>
        There is no chat data available for now.
      </div>
      <router-link to="/">
        <badge class="cursor-pointer">Start new chat</badge>
      </router-link>
    </div>
    <div class="md:w-3/4 lg:w-3/2 xl:w-1/2 mx-auto" v-for="item in getSessionData" :key="item.id">
      <div class="rounded-md cursor-pointer border border-white mb-2 p-2" @click="openSession(item.listId)">
        <p class="font-semibold capitalize">{{ item.content.text }}</p>
        <p>{{ formatedDate(item.timestamp) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHistoryStore } from '@/stores/historyStore';
import { useSessionStore } from '@/stores/sessionStore';
import { Badge } from 'primevue';
import { computed } from 'vue';
import { useRouter } from 'vue-router'

const historyStore = useHistoryStore();
const sessionStore = useSessionStore();
const router = useRouter()
const getSessionData = computed(() => {

  const sessionList = historyStore.getAllSessionIds()
  const sessionsData = sessionList.map(list => {
    const dataItem = historyStore.getMessagesBySession(list)
    return { ...dataItem[0], listId: list };
  })
  return sessionsData
})

const formatedDate = (d: string) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds} --- ${day}-${month}-${year}`;
};

function openSession(sessionId: string) {
  const messages = historyStore.getMessagesBySession(sessionId)
  sessionStore.clearMessages()
  sessionStore.restoreSession(sessionId)
  sessionStore.addServerMessages(messages)

  router.push({ name: 'chat', params: { id: sessionId } })
}
</script>
