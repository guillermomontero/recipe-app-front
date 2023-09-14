import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../store/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/LoginView.vue'),
    meta: {
      requireAuth: false,
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/RegisterView.vue'),
    meta: {
      requireAuth: false,
    }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../views/auth/ForgotPasswordView.vue'),
    meta: {
      requireAuth: false,
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/user/ProfileView.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: () => import('../views/recipe/RecipesView.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/recipe',
    name: 'recipe',
    component: () => import('../views/recipe/RecipeView.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/my-recipes',
    name: 'my-recipes',
    component: () => import('../views/user/MyRecipesView.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/new-recipe',
    name: 'new-recipe',
    component: () => import('../views/recipe/CreateEditRecipeView.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/configuration',
    name: 'configuration',
    component: () => import('../views/configuration/ConfigurationView.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/AdminView.vue'),
    meta: {
      requireAuth: true,
      role: true,
      hideButtonNewRecipe: true,
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isLogged = authStore.isLogged;
  const needAuth = to.meta.requireAuth;
  const needRoleAdmin = to.meta.role;
  const isAdmin = authStore.user.role === 1;

  if (needAuth && !isLogged) next('/login');
  else if (needAuth && needRoleAdmin && !isAdmin) next('/');
  else next();
})

export default router;
