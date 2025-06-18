<template>
  <div>
    <div v-for="(msg, index) in store.messages" :key="index" class="pb-1">
      <div v-if="msg.type === 'user_message'" class="user-message space-y-2">
        <UserMessage :message="msg.content.text" />

        <div v-if="msg.content.file" class="flex justify-end">
          <img v-if="msg.content.file.type.startsWith('image/')" :src="msg.content.file.content"
            :alt="msg.content.file.name" class="inline-block ml-auto max-w-xs max-h-40 border rounded-md" />
          <div v-else class="text-sm text-gray-600">
            📄 {{ msg.content.file.name }}
          </div>
        </div>
      </div>
      <div v-if="msg.content.format === 'json' && isCarousel(msg.content.body ?? '')">
        <CarouselMessage :items="parseCarouselItems(msg.content.body ?? '')" />
      </div>
      <div v-if="msg.type === 'response' && msg.content.format === 'markdown'" class="reply-message">
        <Markdown :source="msg.content.text ?? ''" />
      </div>

      <div v-else-if="msg.type === 'response'" class="reply-message">
        <div class="text-base px-2 dark:text-slate-100 my-2">
          {{ msg.content.text }}
        </div>
      </div>
      <div v-if="msg.type === 'debug'">
        Debug data will display here.
      </div>
      <div v-if="msg.type === 'reasoning'">
        <ReasoningPanel :message="msg.content.body" />
      </div>
    </div>
    <div ref="scrollAnchor"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useSessionStore } from '@/stores/sessionStore'
import UserMessage from '@/components/UserMessage.vue'
import { useHistoryStore } from '@/stores/historyStore'
import CarouselMessage from '@/components/CarouselMessage.vue'
import ReasoningPanel from '@/components/ReasoningPanel.vue'
// @ts-ignore
import Markdown from 'vue3-markdown-it';

const route = useRoute()
const store = useSessionStore()
const scrollAnchor = ref<HTMLElement | null>(null)

interface CarouselItem {
  title: string;
  description: string;
  img: string;
}

watch(
  () => route.params.id,
  (newId) => {
    if (typeof newId === 'string') {
      const historyStore = useHistoryStore()
      const messages = historyStore.getMessagesBySession(newId)
      store.clearMessages()
      store.restoreSession(newId)
      store.addServerMessages(messages)
    }
  },
  { immediate: true }
)

watch(() => store.messages.length, async () => {
  await nextTick()
  scrollAnchor.value?.scrollIntoView({ behavior: 'smooth' })
})

onMounted(() => {
  scrollAnchor.value?.scrollIntoView({ behavior: 'auto' })
})

function isCarousel(jsonBody: string): boolean {
  try {
    const parsed = JSON.parse(jsonBody);
    return parsed?.type === "carousel" && Array.isArray(parsed.cards);
  } catch {
    return false;
  }
}

function parseCarouselItems(jsonBody: string): CarouselItem[] {
  try {
    const parsed = JSON.parse(jsonBody);
    if (parsed?.type === "carousel" && Array.isArray(parsed.cards)) {
      return parsed.cards.filter((card: CarouselItem) =>
        typeof card.title === "string" &&
        typeof card.description === "string" &&
        typeof card.img === "string"
      );
    }
  } catch (err) {
    console.warn("Failed to parse carousel JSON:", err);
  }
  return [];
}
</script>
