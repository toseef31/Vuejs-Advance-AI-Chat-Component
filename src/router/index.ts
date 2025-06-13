import { createRouter, createWebHistory } from 'vue-router'
import WrapperComponent from "@/components/WrapperComponent.vue";
import SessionsHistory from "@/components/SessionsHistory.vue";

const routes = [
  { path: '/', name: 'home', component: WrapperComponent },
  { path: '/chat/:id', name: 'chat', component: WrapperComponent },
  { path: '/history', name: 'history', component: SessionsHistory },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
