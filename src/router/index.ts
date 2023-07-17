import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../store/auth';

const requireAuth = (to, from, next) => {
  const authStore = useAuthStore();
  const isLogged = authStore.isLogged;

  if (isLogged) next();
  else next('/login')
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    beforeEnter: requireAuth,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
