<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import router from '../../router';
import { useAuthStore } from '../../store/auth';
import { useLayoutStore } from '../../store/layout';

const { t } = useI18n();
const storeAuth = useAuthStore();
const storeLayout = useLayoutStore();

const goToPage = (url: string = '/') => {
  storeLayout.triggerMenu(false);
  router.push(url)
};

const signOut = () => {
  storeLayout.triggerMenu(false);
  storeAuth.logout();
}

window.addEventListener('click', (e) => {
  if (!document.getElementById('menuTrigger')?.contains(e.target)) storeLayout.triggerMenu(false);
});

</script>

<template>
  <header class="header" v-if="storeAuth.logged">
    <div class="header__logo" @click="goToPage('/')">
      <img src="images/your-recipes-logo.png" alt="Your Recipes">
    </div>
    <div class="header__actions">
      <div v-if="$route.path !== '/new-recipe' && !$route.meta.hideButtonNewRecipe" class="mr-1">
        <button class="btn btn--md" @click="goToPage('/new-recipe?m=create&id=0')">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
          {{ t('nuevaReceta') }}
        </button>
      </div>
      <div class="header__actions--menu" id="menuTrigger">
        <div class="header__actions--menu--avatar" @click="storeLayout.triggerMenu(!storeLayout.isMenuActive)">
          <img :src="storeAuth.user.imageProfile" :alt="storeAuth.user.name">
        </div>
        <nav class="header__actions--menu--nav" v-if="storeLayout.isMenuActive">
          <button @click="goToPage('/')" class="header__actions--menu--nav--link" :class="{ 'header__actions--menu--nav--link--active': $route.path === '/' }">{{ t('inicio') }}</button>
          <button @click="goToPage('/profile')" class="header__actions--menu--nav--link" :class="{ 'header__actions--menu--nav--link--active': $route.path === '/profile' }">{{ t('miPerfil') }}</button>
          <button @click="goToPage('/my-recipes')" class="header__actions--menu--nav--link" :class="{ 'header__actions--menu--nav--link--active': $route.path === '/my-recipes' }">{{ t('misRecetas') }}</button>
          <button @click="goToPage('/configuration')" class="header__actions--menu--nav--link" :class="{ 'header__actions--menu--nav--link--active': $route.path === '/configuration' }">{{ t('configuracion') }}</button>
          <button @click="goToPage('/admin/admin-panel')" class="header__actions--menu--nav--link" :class="{ 'header__actions--menu--nav--link--active': $route.path === '/admin/admin' }">{{ t('admin') }}</button>
          <button @click="signOut" class="header__actions--menu--nav--link">{{ t('cerrarSesion') }}</button>
        </nav>
      </div>
    </div>
  </header>
</template>