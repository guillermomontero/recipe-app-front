import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../store/auth';

const requireAuth = (to, from, next) => {
  const authStore = useAuthStore();
  const isLogged = authStore.isLogged;

  if (isLogged) next();
  else next('/login')
}

const requireAuthAdmin = (to, from, next) => {
  const authStore = useAuthStore();
  const isAdmin = authStore.user.role === 1;

  if (isAdmin) next();
  else next('/')
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
    component: () => import('../views/auth/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/RegisterView.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../views/auth/ForgotPasswordView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/user/ProfileView.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: () => import('../views/recipe/RecipesView.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/recipe',
    name: 'recipe',
    component: () => import('../views/recipe/RecipeView.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/my-recipes',
    name: 'my-recipes',
    component: () => import('../views/user/MyRecipesView.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/new-recipe',
    name: 'new-recipe',
    component: () => import('../views/recipe/CreateEditRecipeView.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/configuration',
    name: 'configuration',
    component: () => import('../views/configuration/ConfigurationView.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/AdminView.vue'),
    beforeEnter: requireAuthAdmin,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
