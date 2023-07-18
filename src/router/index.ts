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
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../views/ForgotPasswordView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: () => import('../views/RecipesView.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/recipe',
    name: 'recipe',
    component: () => import('../views/RecipeView.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/my-recipes',
    name: 'my-recipes',
    component: () => import('../views/MyRecipesView.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/new-recipe',
    name: 'new-recipe',
    component: () => import('../views/NewRecipeView.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/configuration',
    name: 'configuration',
    component: () => import('../views/ConfigurationView.vue'),
    beforeEnter: requireAuth,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
