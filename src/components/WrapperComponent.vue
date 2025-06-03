<template>
  <div class="flex flex-col h-full">
    <div class="overflow-y-auto px-4 w-11/12 md:w-3/4 lg:w-1/2 mx-auto">
      <ChatHeader title="Chat title" />
    </div>
    <div class="flex-1 overflow-y-auto px-4 w-11/12 md:w-3/4 lg:w-1/2 mx-auto">
      <div class="flex gap-4">
        <div class="flex-1">
          <MesssageContainer />
        </div>
        <div class="flex-1" v-if="store.showReasoning">
          <ReasoningPanel />
        </div>
      </div>
    </div>
    <div class=" px-4 py-2  w-11/12 md:w-3/4 lg:w-1/2 mx-auto">
      <InputArea />
    </div>
  </div>
</template>

<script setup lang="ts">
import InputArea from '@/components/InputArea/InputArea.vue';
import MesssageContainer from '@/components/MesssageContainer.vue';
import ChatHeader from '@/components/ChatHeader.vue';
import ReasoningPanel from "@/components/ReasoningPanel.vue";
import { useSessionStore } from "@/stores/sessionStore";

const store = useSessionStore()

</script>
