<template>
  <Carousel :value="props.items" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
    <template #item="{ data }">
      <div class="flex flex-col items-center gap-4 p-4 flex-grow">
        <img :src="data.img" alt="Image" class="w-full max-w-md object-cover rounded-lg" />
        <h3 class="self-start text-xl font-semibold">{{ data.title }}</h3>
        <p class="text-gray-600 self-start">{{ data.description }}</p>
      </div>
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import Carousel from 'primevue/carousel';
import { ref } from "vue"
const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
]);

interface CarouselItem {
  title: string
  description: string
  img: string
}

const props = defineProps<{
  items: CarouselItem[]
}>()
</script>
