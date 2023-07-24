<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '../../store/auth';
import { apiGetUser } from "../../config/api/user";

const store = useAuthStore();

const getUserData = async () => {
  try {
    const response = await apiGetUser(store.user._id);
    console.log(response);
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getUserData();
})
</script>

<template>
  <h1>Profile view</h1>
</template>