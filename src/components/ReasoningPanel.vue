<template>
  <div class="p-4">
    <div class="inline-block bg-gray-500 py-2 px-4 mb-2 rounded">
      <p class="text-xs" v-if="isThinking">Thinking...</p>
      <p class="text-xs" v-else>Thought for 5 seconds</p>
    </div>
    <div v-if="!isThinking" class="text-sm border-l border-[#A6A6A6] px-2 dark:text-[#A6A6A6]">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus, neque. Atque iure incidunt qui ipsum quis
      nobis
      officiis quidem sequi delectus consectetur quos nihil praesentium, blanditiis ut corrupti eaque, distinctio
      cupiditate? Praesentium voluptas dicta maxime assumenda unde quisquam nihil consequuntur laudantium facilis facere
      asperiores deleniti numquam, dignissimos, perferendis dolorum suscipit nulla incidunt repellat magni doloremque
      possimus veniam corrupti? Assumenda id nesciunt nam dolorem provident modi voluptates accusamus, quia odit,
      debitis
      saepe, animi possimus ad ipsum expedita sunt rem necessitatibus quisquam? Nesciunt neque odio incidunt harum
      excepturi mollitia soluta, reprehenderit nemo, error enim, officia ipsam ea inventore voluptas praesentium
      exercitationem voluptatibus.
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from "vue"

const isThinking = ref(true);

setTimeout(() => {
  isThinking.value = false;
}, 5000);
</script>
