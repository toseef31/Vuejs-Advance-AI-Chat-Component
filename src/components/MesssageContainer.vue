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
      <div v-if="msg.type === 'response'" class="reply-message">
        <div class="text-base px-2 dark:text-slate-100 my-2">
          {{ msg.content.text }}
        </div>
      </div>
      <div v-if="msg.content.format === 'json'">
        carousel data will display here.
      </div>
      <div v-if="msg.type === 'debug'">
        Debug data will display here.
      </div>
      <div v-if="msg.type === 'reasoning'">
        Reasoning data will display here.
      </div>
    </div>
    <div ref="scrollAnchor"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import { useSessionStore } from '@/stores/sessionStore'
import UserMessage from '@/components/UserMessage.vue';

const store = useSessionStore()
const scrollAnchor = ref<HTMLElement | null>(null)

watch(() => store.messages.length, async () => {
  await nextTick()
  scrollAnchor.value?.scrollIntoView({ behavior: 'smooth' })
})

onMounted(() => {
  scrollAnchor.value?.scrollIntoView({ behavior: 'auto' })
})
</script>
