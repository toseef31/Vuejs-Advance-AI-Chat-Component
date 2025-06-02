<template>
  <Card>
    <template #content>
      <div class="header-container">
        <div>
          <p>{{ title }}</p>
        </div>
        <div>
          <Badge size="small" :severity="isConnected ? 'success' : 'danger'">Connected</Badge>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { Card, Badge } from "primevue"
defineProps({
  isConnected: { type: Boolean, default: false },
  title: { type: String, default: '' },
})


</script>


<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
