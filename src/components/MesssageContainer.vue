<template>
  <div>
    <div v-for="(msg, index) in store.messages" :key="index" class="message-list">
      <div v-if="msg.type === 'user_message'" class="user-message">
        <UserMessage :message="msg.content.text" />
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
  </div>
</template>


<script setup lang="ts">
import { useSessionStore } from '@/stores/sessionStore'
import UserMessage from '@/components/UserMessage.vue';

const store = useSessionStore()

</script>
