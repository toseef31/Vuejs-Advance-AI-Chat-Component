<template>
  <div>
    <div v-for="(msg, index) in store.messages" :key="index" class="message-list">
      <div v-if="msg.sender === 'user'" class="user-message">
        <UserMessage :message="msg.content" />
      </div>
      <div v-else class="reply-message">
        <div class="text-base px-2 dark:text-slate-100 my-2">
          {{ msg.content }}
        </div>
        <QuickReplies />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useSessionStore } from '@/stores/sessionStore'
import UserMessage from '@/components/UserMessage.vue';
import QuickReplies from '@/components/QuickReplies.vue';

const store = useSessionStore()

</script>
