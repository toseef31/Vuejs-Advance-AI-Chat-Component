<script setup lang="ts">
// import InputArea from './components/InputArea/InputArea.vue';
// import { Badge } from 'primevue';
// import { useSessionStore } from '@/stores/sessionStore'

// const store = useSessionStore()
</script>

<template>
  <div class="w-screen h-screen overflow-hidden dark:bg-[#292A2D] bg-white">
    <router-view></router-view>
  </div>
  <!-- <div class="main-container">
    <div class="inner-container">
      <div class="message-container">
        <div v-for="(msg, index) in store.messages" :key="index" class="message-list">
          <div v-if="msg.sender === 'user'" class="user-message">
            <Badge :value="msg.content" severity="secondary" class="send-message" />
          </div>
          <div v-else class="reply-message">
            <Badge :value="msg.content" severity="info" class="send-message" />
          </div>
        </div>
      </div>
      <div class="input-area">
        <InputArea />
      </div>
    </div>
  </div> -->
</template>



<style scoped>
/* .user-message {
  margin-left: auto;
  max-width: 80%;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 10px;
} */

/* .reply-message {
  max-width: 80%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 10px;
} */
</style>
