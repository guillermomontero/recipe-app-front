<script setup lang="ts">
import router from '../../router';
import { useAuthStore } from '../../store/auth';
import { useLayoutStore } from '../../store/layout';

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

</script>

<template>
  <header class="header" v-if="storeAuth.logged">
    <div class="header__logo">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 4.707c-2.938-1.83-7.416-2.567-12-2.707v17.714c3.937.12 7.795.681 10.667 1.995.846.388 1.817.388 2.667 0 2.872-1.314 6.729-1.875 10.666-1.995v-17.714c-4.584.14-9.062.877-12 2.707zm-10 13.104v-13.704c5.157.389 7.527 1.463 9 2.334v13.168c-1.525-.546-4.716-1.505-9-1.798zm20 0c-4.283.293-7.475 1.252-9 1.799v-13.171c1.453-.861 3.83-1.942 9-2.332v13.704z"/></svg>
      <h3>RecipeApp</h3>
    </div>
    <div class="header__actions">
      <div class="header__actions--button mr-1">
        <button class="btn btn__md" @click="goToPage('/new-recipe')">+ New recipe</button>
      </div>
      <div class="header__actions--menu">
        <div class="header__actions--menu--avatar" @click="storeLayout.triggerMenu(!storeLayout.isMenuActive)">
          GM
        </div>
        <nav class="header__actions--menu--nav" v-if="storeLayout.isMenuActive">
          <button @click="goToPage('/')" class="header__actions--menu--nav--link">Home</button>
          <button @click="goToPage('/profile')" class="header__actions--menu--nav--link">My profile</button>
          <button @click="goToPage('/my-recipes')" class="header__actions--menu--nav--link header__actions--menu--nav--link--active">My recipes</button>
          <button @click="goToPage('/configuration')" class="header__actions--menu--nav--link">Configuration</button>
          <button @click="signOut" class="header__actions--menu--nav--link">Sign out</button>
        </nav>
      </div>
    </div>
  </header>
</template>