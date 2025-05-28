<script setup lang="ts">
import InputArea from './components/InputArea/InputArea.vue';
import { Badge } from 'primevue';
</script>

<template>
  <div class="main-container">
    <div class="inner-container">
      <div class="message-container">
        <div class="message-list" v-for="i in 20" :key="i">
          <div class="user-message">
            <Badge value="Lorem ipsum dolor sit amet consectetur." severity="secondary" class="send-message" />
          </div>
          <div class="reply-message">
            <Badge value="Lorem ipsum dolor sit amet consectetur." severity="secondary" class="send-message" />
          </div>

        </div>
      </div>
      <div class="input-area">
        <InputArea />
      </div>
    </div>
  </div>
</template>



<style scoped>
.user-message {
  margin-left: auto;
  max-width: 80%;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 10px;
}

.reply-message {
  max-width: 80%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 10px;
}
</style>
