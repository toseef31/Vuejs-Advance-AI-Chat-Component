<template>
  <div class="flex justify-center item-center flex-col w-full h-full">
    <div class="md:w-3/4 lg:w-3/2 xl:w-1/2 mx-auto" v-for="item in getSessionData" :key="item.id">
      <div class="border border-white mb-2 p-2" @click="openSession(item.listId)">
        <p>{{ item.listId }}</p>
        <p>{{ item.content.text }}</p>
        <p>{{ item.timestamp }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHistoryStore } from '@/stores/historyStore';
import { useSessionStore } from '@/stores/sessionStore';
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

function openSession(sessionId: string) {
  const messages = historyStore.getMessagesBySession(sessionId)
  sessionStore.clearMessages()
  sessionStore.restoreSession(sessionId)
  sessionStore.addServerMessages(messages)

  router.push({ name: 'chat', params: { id: sessionId } })
}
</script>
