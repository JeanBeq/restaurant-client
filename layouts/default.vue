<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-blue-500 text-white p-4 flex justify-between items-center">
      <NuxtLink to="/" class="text-xl font-bold">Restaurants</NuxtLink>
      <div v-if="isAuthenticated" class="flex items-center">
        <NuxtLink to="/cart" class="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded mr-2">Panier</NuxtLink>
        <div v-if="userRole === 'ADMIN'">
          <NuxtLink to="/admin" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">Admin Panel</NuxtLink>
        </div>
        <div v-else-if="userRole === 'USER'">
          <button @click="goToUserProfile" class="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">Profile</button>
        </div>
        <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ml-2">Déconnexion</button>
      </div>
    </header>
    <main class="flex-grow">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();
const isAuthenticated = authStore.isAuthenticated;
const userRole = ref(null);
const router = useRouter();

const fetchUserRole = async () => {
  try {
    const response = await $fetch('http://localhost:8081/api/users/@me', {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    userRole.value = response.role;
  } catch (error) {
    console.error('Échec de la récupération du rôle de l\'utilisateur:', error);
  }
};

const logout = () => {
  authStore.logout();
  router.push('/login');
};

const goToUserProfile = () => {
  router.push('/profile');
};

onMounted(() => {
  if (isAuthenticated) {
    fetchUserRole();
  }
});
</script>